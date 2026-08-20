const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const OUT = process.env.GENERATE_OUTPUT_PATH || path.join(__dirname, '..', 'src', 'components', 'figma');

if (!TOKEN) {
  console.error('FIGMA_TOKEN is required');
  process.exit(1);
}
if (!FILE_KEY) {
  console.error('FIGMA_FILE_KEY is required');
  process.exit(1);
}

// helper to call Figma REST API
async function figmaGet(path) {
  const url = `https://api.figma.com/v1/${path}`;
  const res = await fetch(url, { headers: { 'X-FIGMA-TOKEN': TOKEN } });
  if (!res.ok) throw new Error(`Figma API ${path} failed: ${res.status} ${res.statusText}`);
  return res.json();
}

function traverse(node, cb) {
  cb(node);
  if (!node.children) return;
  for (const c of node.children) traverse(c, cb);
}

async function downloadImage(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to download ' + url);
  const buf = await res.buffer();
  fs.writeFileSync(outPath, buf);
}

function safeName(n) {
  return (n || 'frame').replace(/[^a-zA-Z0-9_]/g, '_');
}

async function run() {
  console.log('Pulling Figma file', FILE_KEY);
  const fileRes = await figmaGet(`files/${FILE_KEY}`);
  const document = fileRes.document;

  fs.mkdirSync(OUT, { recursive: true });

  const pages = document.children || [];
  const exports = [];

  for (const page of pages) {
    if (!page.children) continue;
    for (const node of page.children) {
      if (node.type !== 'FRAME' && node.type !== 'COMPONENT' && node.type !== 'GROUP') continue;

      const name = safeName(node.name || node.id);
      const dir = path.join(OUT, name);
      fs.mkdirSync(dir, { recursive: true });

      // collect text nodes and image-like nodes
      const texts = [];
      const imageNodeIds = [];
      traverse(node, (n) => {
        if (n.type === 'TEXT') texts.push({ id: n.id, name: n.name, chars: n.characters });
        if (n.fills && Array.isArray(n.fills)) {
          for (const f of n.fills) {
            if (f.type === 'IMAGE') imageNodeIds.push(n.id);
          }
        }
        if (n.type === 'VECTOR' || n.type === 'RECTANGLE' || n.type === 'ELLIPSE' || n.type === 'FRAME') {
          imageNodeIds.push(n.id);
        }
      });

      // dedupe ids and limit to 50 for safety
      const uniqueIds = Array.from(new Set(imageNodeIds)).slice(0, 50);
      let imagesMap = {};
      if (uniqueIds.length) {
        try {
          const idsParam = uniqueIds.join(',');
          const imgsRes = await figmaGet(`images/${FILE_KEY}?ids=${encodeURIComponent(idsParam)}&format=png&scale=2`);
          imagesMap = imgsRes.images || {};
        } catch (e) {
          console.warn('fileImages failed for', uniqueIds.length, 'ids', e.message);
        }
      }

      // download images
      const assetsDir = path.join(dir, 'assets');
      fs.mkdirSync(assetsDir, { recursive: true });
      const downloaded = [];
      for (const [id, url] of Object.entries(imagesMap)) {
        try {
          const outPath = path.join(assetsDir, `${id}.png`);
          await downloadImage(url, outPath);
          downloaded.push({ id, file: `./${name}/assets/${id}.png` });
        } catch (e) {
          console.warn('Failed download', id, e.message);
        }
      }

      // write metadata
      const meta = { id: node.id, name: node.name, texts, images: downloaded };
      fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2));

      // write CSS module
      const css = `:root { --figma-component-name: ${name}; }\n.container { padding: 16px; }\n.title { font-size: 24px; margin: 0 0 8px 0; }\n.sectionText { margin: 0 0 8px 0; }\nimg { max-width: 100%; height: auto; display:block; }\n`;
      fs.writeFileSync(path.join(dir, `${name}.module.css`), css);

      // write component (TSX)
      const importLines = downloaded.map((d, i) => `const img${i} = require('${d.file}');`).join('\n');
      const textLines = texts.map((t, i) => `      <p key="text-${i}" className={styles.sectionText}>${escape(t.chars || t.name || '')}</p>`).join('\n');
      const imageLines = downloaded.map((d, i) => `      <img key="img-${i}" src={img${i}.default || img${i}} alt="${d.id}" />`).join('\n');

      const component = `import React from 'react';\nimport styles from './${name}.module.css';\n\n${importLines}\n\nexport default function ${name}(){\n  return (\n    <section className={styles.container}>\n      <h2 className={styles.title}>${escape(node.name || name)}</h2>\n${textLines}\n${imageLines}\n    </section>\n  );\n}\n`;

      fs.writeFileSync(path.join(dir, `${name}.tsx`), component, 'utf8');

      exports.push({ name, path: `./${name}/${name}.tsx` });
      console.log('Generated', name, 'texts:', texts.length, 'images:', downloaded.length);
    }
  }

  // write index file exporting found components
  const exportLines = exports.map(e => `export { default as ${e.name} } from '${e.path}';`).join('\n');
  fs.writeFileSync(path.join(OUT, 'index.ts'), exportLines, 'utf8');

  console.log('Done — components generated into', OUT);
}

function escape(s){
  return (s||'').replace(/`/g,'\\`').replace(/\\$/g,'\\$').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

run().catch(e=>{ console.error(e); process.exit(1); });
