const express = require('express');
const { OpenAI } = require('openai');
const prisma = require('../lib/prisma');
const memRouter = express.Router();
require("dotenv").config();

const openaiApiKey = process.env.GEMINI_API_KEY || "AIzaSyBHVwiEBgMPt1PU-iHXDDXn1dgQgmhDwmI"; // Recommended: move to .env
const geminiBaseUrl = "https://generativelanguage.googleapis.com/v1beta/openai/";

const openaiClient = new OpenAI({
  apiKey: openaiApiKey,
  baseURL: geminiBaseUrl,
});

const system_prompt = `You are an expert code reviewer. Focus on code quality, security, and best practices. Use simple, clear language.`;

memRouter.post('/api/analyze', async (req, res) => {
  try {
    const { prData } = req.body;
    if (!prData) return res.status(400).json({ error: "Missing 'prData'" });

    const {
      id,
      title,
      user,
      additions,
      deletions,
      body: prBody,
      head,
      base,
      html_url,
      diff_url
    } = prData;

    const prId = BigInt(id); // ✅ Convert to BigInt for Prisma

    let diffText = "";
    if (diff_url) {
      try {
        const resp = await fetch(diff_url, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3.diff'
          }
        });
        diffText = await resp.text();
      } catch (err) {
        console.warn("Could not fetch diff:", err);
      }
    }

    const prompt = `
Pull Request Title: ${title}
Author: ${user.login}
Branch: ${head.ref} → ${base.ref}
Additions: ${additions} | Deletions: ${deletions}
${prBody ? `PR Description:\n${prBody}` : ""}
${diffText ? `\n---\nGit Diff:\n${diffText}\n---\n` : ""}
Please provide a structured code review:
1. Summary of changes
2. Three specific code quality suggestions
3. Any potential security issues
4. Quality score (out of 100)
`;

    const response = await openaiClient.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.3,
    });

    const aiOutput = response.choices[0].message.content;

    await prisma.pullRequest.upsert({
      where: { prId },
      update: {
        title,
        author: user.login,
        additions,
        deletions,
        url: html_url || null,
        headBranch: head.ref || null,
        baseBranch: base.ref || null,
        summary: aiOutput,
      },
      create: {
        prId,
        title,
        author: user.login,
        additions,
        deletions,
        url: html_url || null,
        headBranch: head.ref || null,
        baseBranch: base.ref || null,
        summary: aiOutput,
      },
    });

    res.json({ result: aiOutput });
  } catch (error) {
    console.error("Error in /api/analyze:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = memRouter;
