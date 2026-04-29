import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");
const menuPath = path.join(root, "data", "menu-completed.json");

const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const concurrencyArg = process.argv.find((arg) => arg.startsWith("--concurrency="));
const concurrency = concurrencyArg ? Number(concurrencyArg.split("=")[1]) : 4;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function endpoint(prompt, seed) {
  const query = new URLSearchParams({
    width: "640",
    height: "640",
    nologo: "true",
    model: "turbo",
    seed: String(seed),
    enhance: "true",
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${query}`;
}

async function download(url, outPath) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 70_000);
  let response;
  try {
    response = await fetch(url, {
      headers: {
        "User-Agent": "ocean-samurai-menu-image-generator/1.0",
        Accept: "image/*",
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`Expected image response, got ${contentType}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 10_000) {
    throw new Error(`Image response too small: ${bytes.length} bytes`);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, bytes);
}

const items = JSON.parse(fs.readFileSync(menuPath, "utf8"));
let generated = 0;
let skipped = 0;
const failed = [];
const queue = [];

for (const [index, item] of items.entries()) {
  const relativePath = item.image?.main?.replace(/^\//, "");
  if (!relativePath) {
    failed.push({ name: item.name, error: "missing image path" });
    continue;
  }

  const outPath = path.join(root, "public", relativePath);
  if (!force && fs.existsSync(outPath) && fs.statSync(outPath).size > 10_000) {
    skipped++;
    continue;
  }

  if (queue.length >= limit) break;
  queue.push({ item, index, relativePath, outPath });
}

let cursor = 0;

async function worker(workerId) {
  while (cursor < queue.length) {
    const job = queue[cursor++];
    const { item, index, relativePath, outPath } = job;
  const prompt =
    item.image_prompt ||
    `Photorealistic Japanese restaurant menu photo of ${item.name}, clean plating, square crop, no text, no logo, no watermark.`;

  let ok = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const seed = 4100 + index * 17 + attempt;
      await download(endpoint(prompt, seed), outPath);
      console.log(`worker ${workerId} generated ${generated + 1}: ${item.name} -> ${relativePath}`);
      generated++;
      ok = true;
      await sleep(350);
      break;
    } catch (error) {
      console.warn(`retry ${attempt} failed for ${item.name}: ${error.message}`);
      await sleep(1000 * attempt);
    }
  }

  if (!ok) {
    failed.push({ name: item.name, path: relativePath, error: "all retries failed" });
  }
  }
}

await Promise.all(
  Array.from({ length: Math.max(1, concurrency) }, (_, i) => worker(i + 1))
);

const reportPath = path.join(root, "data", "menu-image-generation-report.json");
fs.writeFileSync(
  reportPath,
  `${JSON.stringify({ generated, skipped, failed, generatedAt: new Date().toISOString() }, null, 2)}\n`
);

console.log(`Done. generated=${generated}, skipped=${skipped}, failed=${failed.length}`);
if (failed.length) {
  console.log(`Failure report: ${path.relative(root, reportPath)}`);
  process.exitCode = 1;
}
