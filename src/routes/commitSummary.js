
const express = require('express');
const axios = require('axios');
const { OpenAI } = require('openai');
const prisma = require('../lib/prisma');
const commitRouter = express.Router();

const openaiClient = new OpenAI({
  apiKey: "AIzaSyBHVwiEBgMPt1PU-iHXDDXn1dgQgmhDwmI",
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

commitRouter.get('/api/analyze-commits/:prId', async (req, res) => {
  try {
    const prId = BigInt(req.params.prId);
    console.log(prId)
    const pr = await prisma.pullRequest.findUnique({ where: { prId } });
    if (!pr) return res.status(404).json({ error: 'PR not found' });

    const repo = 'calcom/cal.com'; // or fetch from DB
    const response = await axios.get(
      `https://api.github.com/repos/calcom/cal.com/pulls/${prId}/commits`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const commits = response.data.map((c) => `- ${c.commit.message}`).join('\n');

    const prompt = `
You are an expert code reviewer. Summarize the following commit messages from a pull request.

Commits:
${commits}

Summary:
`;

    const aiRes = await openaiClient.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [
        { role: 'system', content: 'You summarize commits clearly and briefly.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.3,
    });

    const commitSummary = aiRes.choices[0].message.content;
    res.json({ commitSummary });
  } catch (err) {
    console.error('Commit summary error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = commitRouter;
