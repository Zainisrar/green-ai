import { mkdir, writeFile } from "node:fs/promises";

const sheetId = "1h7KsHIbYuWx4D4vmXUfhfr-H2GLOHxq8ODx7TanOzkA";
const gid = "436421358";
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
const response = await fetch(url);
if (!response.ok) throw new Error(`Bug sheet returned HTTP ${response.status}`);

const csv = await response.text();
await mkdir("test-results", { recursive: true });
await writeFile("test-results/bug-sheet.csv", csv, "utf8");
console.log(`Synchronized ${csv.split(/\r?\n/).length - 1} bug-sheet rows.`);
