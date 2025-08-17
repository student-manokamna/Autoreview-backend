const express = require("express");
const pullRouter = express.Router();
require("dotenv").config();

console.log(process.env.GITHUB_TOKEN ? "GITHUB_TOKEN Loaded" : "GITHUB_TOKEN Missing");

pullRouter.get("/api/pull-requests", async (req, res) => {
  try {
    const owner = req.query.owner;
    const repo = req.query.repo;

    if (!owner || !repo) {
      return res.status(400).json({ error: "Missing owner or repo in query params" });
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "User-Agent": "my-app",
        Accept: "application/vnd.github.v3+json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = pullRouter;
