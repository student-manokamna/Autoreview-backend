const express = require('express');
const prisma = require('../lib/prismaClient'); // adjust path if needed
const saveRouter = express.Router();

saveRouter.post('/api/save-pr', async (req, res) => {
  try {
    const {
      prId,
      title,
      author,
      additions,
      deletions,
      url,
      headBranch,
      baseBranch,
      summary,
    } = req.body;

    const saved = await prisma.pullRequest.upsert({
      where: { prId },
      update: {
        title,
        author,
        additions,
        deletions,
        url,
        headBranch,
        baseBranch,
        summary,
      },
      create: {
        prId,
        title,
        author,
        additions,
        deletions,
        url,
        headBranch,
        baseBranch,
        summary,
      },
    });

    res.status(200).json({ message: 'PR saved successfully', data: saved });
  } catch (error) {
    console.error('Error saving PR:', error);
    res.status(500).json({ error: 'Failed to save PR' });
  }
});

module.exports = saveRouter;
