# Figma MCP connector (scaffold)

This scaffold provides a webhook receiver and a generator script to pull a Figma file and scaffold Next.js-compatible component stubs.

Setup

1. Copy environment variables from `.env.example` into a `.env` or export them in your shell:

```
export FIGMA_TOKEN=your_personal_access_token
export FIGMA_FILE_KEY=your_file_key
export GENERATE_OUTPUT_PATH=./src/components/figma
export PORT=4000
```

2. Install dependencies and start the server:

```
cd figma-mcp
npm install
npm start
```

3. To manually pull and generate components:

```
npm run pull
```

Webhook

Use a public URL (ngrok, cloud) and register a webhook in Figma to POST to `https://your-host.example/webhook`. When events arrive the connector will run the generator.

What this generates

- For each top-level `FRAME`/`COMPONENT` the script creates a directory under `GENERATE_OUTPUT_PATH` with:
  - `<FrameName>.tsx` — a React component stub
  - `<FrameName>.module.css` — minimal CSS module
  - `assets/` — downloaded PNGs for exportable nodes
  - `meta.json` — raw metadata (texts, images)
- An `index.ts` exporter for all generated components

Next steps I can implement for you

- Map Figma layout to responsive JSX (CSS grid/flex) and Tailwind classes
- Use `next/image` imports and move assets into `public/` instead of requiring them
- Add secure webhook verification and incremental diffs instead of full pulls
