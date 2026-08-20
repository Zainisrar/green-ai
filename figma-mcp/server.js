const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const PORT = process.env.PORT || 4000;

if (!TOKEN) console.warn('FIGMA_TOKEN not set — add it to environment');

const client = null; // we use direct fetch calls to the Figma REST API

// Health
app.get('/', (req, res) => res.send('Figma MCP connector running'));

// Manual pull endpoint
app.get('/pull', async (req, res) => {
  try {
    const fileKey = req.query.file || FILE_KEY;
    if (!TOKEN || !fileKey) return res.status(400).send('Missing token or file key');
    const r = await fetch(`https://api.figma.com/v1/files/${fileKey}`, { headers: { 'X-FIGMA-TOKEN': TOKEN } });
    if (!r.ok) {
      const txt = await r.text();
      return res.status(500).json({ error: 'Figma API error', details: txt });
    }
    const file = await r.json();
    // trigger generator script to create components
    exec('node generate.js', { cwd: __dirname }, (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
      console.error(stderr);
    });
    res.json({ ok: true, name: file.name });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Webhook receiver (Figma can post events here)
app.post('/webhook', async (req, res) => {
  try {
    // Basic handling: log and trigger a pull/generate
    console.log('Webhook received', req.body);
    exec('node generate.js', { cwd: __dirname }, (err, stdout, stderr) => {
      if (err) console.error(err);
      console.log(stdout);
      console.error(stderr);
    });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).send('fail');
  }
});

app.listen(PORT, () => console.log(`Figma MCP connector listening on ${PORT}`));
