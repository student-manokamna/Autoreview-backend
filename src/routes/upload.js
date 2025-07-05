const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const prisma = require('../lib/prisma');
const upload = multer({ dest: 'uploads/' });

const uploadRouter = express.Router();

uploadRouter.post('/api/upload-summary/:prId', upload.single('summaryFile'), async (req, res) => {
  try {
    const prId = BigInt(req.params.prId);
    const filePath = req.file.path;

    // Read the content of the uploaded .txt file
    const summaryText = await fs.readFile(filePath, 'utf8');

    // Update the PR summary in DB
    await prisma.pullRequest.update({
      where: { prId },
      data: { summary: summaryText },
    });

    res.json({ message: 'Summary uploaded and saved successfully.' });
  } catch (error) {
    console.error('Error uploading summary:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = uploadRouter;
