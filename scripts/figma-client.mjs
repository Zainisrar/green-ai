#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Load token from .env.local or environment
function getFigmaToken() {
  if (process.env.FIGMA_ACCESS_TOKEN) return process.env.FIGMA_ACCESS_TOKEN;
  if (process.env.FIGMA_TOKEN) return process.env.FIGMA_TOKEN;

  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/FIGMA_(?:ACCESS_)?TOKEN=(.+)/);
    if (match) return match[1].trim();
  }
  return null;
}

const token = getFigmaToken();
if (!token) {
  console.error("Error: FIGMA_ACCESS_TOKEN is not set.");
  process.exit(1);
}

const headers = {
  'X-Figma-Token': token,
  'Content-Type': 'application/json'
};

const [cmd, arg1, arg2, arg3] = process.argv.slice(2);

async function main() {
  try {
    if (!cmd || cmd === 'me') {
      const res = await fetch('https://api.figma.com/v1/me', { headers });
      const data = await res.json();
      console.log(JSON.stringify(data, null, 2));
    } else if (cmd === 'file') {
      const fileKey = arg1;
      if (!fileKey) throw new Error("Usage: figma-client file <fileKey> [nodeId]");
      const url = arg2 
        ? `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(arg2)}`
        : `https://api.figma.com/v1/files/${fileKey}?depth=2`;
      const res = await fetch(url, { headers });
      const data = await res.json();
      console.log(JSON.stringify(data, null, 2));
    } else if (cmd === 'image') {
      const fileKey = arg1;
      const nodeId = arg2;
      const format = arg3 || 'svg'; // svg, png, jpg, pdf
      if (!fileKey || !nodeId) throw new Error("Usage: figma-client image <fileKey> <nodeId> [format]");
      const url = `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=${format}`;
      const res = await fetch(url, { headers });
      const data = await res.json();
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log("Commands:\n  me\n  file <fileKey> [nodeId]\n  image <fileKey> <nodeId> [format]");
    }
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
