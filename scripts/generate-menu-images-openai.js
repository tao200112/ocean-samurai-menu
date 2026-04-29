import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");
const menuPath = path.join(root, "data", "menu-completed.json");
const reportPath = path.join(root, "data", "menu-openai-image-generation-report.json");

const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const dryRun = args.has("--dry-run");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const offsetArg = process.argv.find((arg) => arg.startsWith("--offset="));
const offset = offsetArg ? Number(offsetArg.split("=")[1]) : 0;
const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const onlyIds = onlyArg ? new Set(onlyArg.split("=")[1].split(",").map((id) => id.trim()).filter(Boolean)) : null;
const modelArg = process.argv.find((arg) => arg.startsWith("--model="));
const model = modelArg ? modelArg.split("=")[1] : "gpt-image-1";
const baseUrlArg = process.argv.find((arg) => arg.startsWith("--base-url="));
const baseUrl = (baseUrlArg ? baseUrlArg.split("=")[1] : process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const sizeArg = process.argv.find((arg) => arg.startsWith("--size="));
const size = sizeArg ? sizeArg.split("=")[1] : "1024x1024";
const qualityArg = process.argv.find((arg) => arg.startsWith("--quality="));
const quality = qualityArg ? qualityArg.split("=")[1] : "low";
const concurrencyArg = process.argv.find((arg) => arg.startsWith("--concurrency="));
const concurrency = concurrencyArg ? Number(concurrencyArg.split("=")[1]) : 2;

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("OPENAI_API_KEY is not set.");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function projectPrompt(item) {
  const ingredients = item.ingredients_known?.length ? item.ingredients_known.join(", ") : "the listed menu ingredients";
  const sauces = item.sauces?.length ? item.sauces.join(", ") : "";
  const flavors = item.flavor_profile?.length ? item.flavor_profile.join(", ") : "savory";
  const methods = item.cooking_methods?.length ? item.cooking_methods.join(", ") : "prepared";
  const portion = portionGuidance(item);
  const plating = platingGuidance(item);
  const override = itemPromptOverride(item);

  return [
    `Create a realistic restaurant menu photo for "${item.name}".`,
    "Use the provided Ocean Samurai menu board style as visual direction: clear item photo, full portion, simple dark plate or bowl, dark clean background, straightforward menu-card food photography.",
    `Dish facts: category ${item.category}; ingredients must include ${ingredients}.`,
    sauces ? `Sauces or toppings that must be visible when appropriate: ${sauces}.` : "",
    `Flavor cues: ${flavors}. Cooking/prep: ${methods}.`,
    portion,
    plating,
    override,
    "The image should look like the actual menu item, not an exaggerated gourmet advertisement.",
    "Use natural restaurant lighting, crisp focus, realistic colors, generous portion, clean plating, square crop.",
    "Avoid excessive beautification, luxury props, tiny portions, empty negative space, floating ingredients, unrealistic garnish, text, labels, logo, watermark, price, menu board, chopsticks, hands, people.",
  ].join(" ");
}

function portionGuidance(item) {
  if (item.item_type === "roll") {
    return `Portion: show the full roll serving, ${item.pieces || 8} pieces when possible, with clear cut surfaces and enough filling visible.`;
  }
  if (item.category === "Nigiri") return "Portion: show two nigiri pieces on rice, matching a sushi menu portion.";
  if (item.category === "Sashimi") return "Portion: show two to four clean slices or pieces, enough to feel like a real menu serving.";
  if (item.category === "Appetizers") return `Portion: show a full appetizer serving${item.pieces ? ` of about ${item.pieces} pieces` : ""}, not a single sample piece.`;
  if (item.category === "Hibachi") return "Portion: show a generous hibachi entree serving with protein and vegetables, not a small tasting portion.";
  if (item.category === "Noodles" || item.category === "Rice") return "Portion: show a full bowl or plate serving, abundant and clear.";
  if (item.category === "Condiments") return "Portion: show one full small sauce bowl, sauce surface visible.";
  if (item.category === "Add-ons") return "Portion: show a practical add-on amount in a small dish.";
  return "Portion: show a complete menu serving.";
}

function platingGuidance(item) {
  if (item.category === "Condiments" || item.category === "Add-ons") {
    return "Plating: small black dish on a clean neutral surface.";
  }
  if (item.category === "Soup" || item.category === "Salads" || item.category === "Noodles" || item.category === "Rice") {
    return "Plating: black or dark ceramic bowl viewed from a slight overhead angle.";
  }
  return "Plating: dark rectangular or round plate, slight overhead angle, food fills most of the frame.";
}

function itemPromptOverride(item) {
  const overrides = {
    "crab-rangoon": "Specific correction: show six closed fried crab rangoon wontons with a dipping sauce cup. Do not show cut-open filling, do not show internal cross-section, do not include shrimp.",
    "crab-rangoon-roll": "Specific correction: show sushi roll pieces containing crab and cream cheese with tempura crunch. Do not show fried wontons as the main subject.",
    "shrimp-shumai-dumplings": "Specific correction: show six golden fried shrimp shumai dumplings, crisp exterior, with a small dipping sauce. Do not show steamed translucent shumai.",
    "gyoza-dumplings": "Specific correction: show six pan-fried gyoza dumplings with browned bottoms and a small dipping sauce.",
    "spring-roll": "Specific correction: show two golden fried spring rolls with a small red dipping sauce cup.",
    "vegetable-tempura": "Specific correction: show four pieces of vegetable tempura, crisp golden batter, with dipping sauce.",
    "chicken-tempura": "Specific correction: show three chicken tempura strips, crisp golden batter, with dipping sauce.",
    "shrimp-tempura": "Specific correction: show three shrimp tempura pieces, tails visible, crisp golden batter, with dipping sauce.",
    "miso-soup": "Specific correction: show a full bowl of miso soup with tofu cubes, wakame seaweed, and green onion.",
  };
  if (overrides[item.id]) return overrides[item.id];
  if (item.item_type === "roll") {
    return "Roll correction: do not make a tiny two-piece sample; show a complete sushi roll portion with visible rice, seaweed or soy wrap, fillings, toppings, and sauces from the dish facts.";
  }
  return "";
}

async function generateImage(prompt) {
  const response = await fetch(`${baseUrl}/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
      quality,
      n: 1,
    }),
  });

  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    payload = { raw: text };
  }

  if (!response.ok) {
    const message = payload?.error?.message || response.statusText || text;
    throw new Error(`HTTP ${response.status}: ${message}`);
  }

  const image = payload?.data?.[0];
  if (!image?.b64_json && !image?.url) {
    throw new Error("Image response did not include b64_json or url.");
  }

  if (image.b64_json) {
    return Buffer.from(image.b64_json, "base64");
  }

  const imageResponse = await fetch(image.url);
  if (!imageResponse.ok) {
    throw new Error(`Failed to download image URL: HTTP ${imageResponse.status}`);
  }
  return Buffer.from(await imageResponse.arrayBuffer());
}

const items = JSON.parse(fs.readFileSync(menuPath, "utf8"));
const sourceItems = onlyIds ? items.filter((item) => onlyIds.has(item.id)) : items.slice(offset);
const selected = sourceItems.slice(0, limit);
let generated = 0;
let skipped = 0;
const failed = [];
let cursor = 0;

async function processItem(item, workerId) {
  const relativePath = item.image?.main?.replace(/^\//, "");
  if (!relativePath) {
    failed.push({ name: item.name, error: "missing image path" });
    return;
  }

  const outPath = path.join(root, "public", relativePath);
  if (!force && fs.existsSync(outPath) && fs.statSync(outPath).size > 30_000) {
    skipped++;
    return;
  }

  const prompt = projectPrompt(item);
  if (dryRun) {
    console.log(`${item.name}: ${prompt}`);
    skipped++;
    return;
  }

  let success = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const imageBytes = await generateImage(prompt);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, imageBytes);
      item.image_status = "generated_openai";
      generated++;
      success = true;
      console.log(`worker ${workerId} generated ${generated}: ${item.name} -> ${relativePath}`);
      await sleep(500);
      break;
    } catch (error) {
      console.warn(`attempt ${attempt} failed for ${item.name}: ${error.message}`);
      await sleep(1500 * attempt);
    }
  }

  if (!success) {
    failed.push({ name: item.name, path: relativePath, error: "all retries failed" });
  }
}

async function worker(workerId) {
  while (cursor < selected.length) {
    const item = selected[cursor++];
    await processItem(item, workerId);
  }
}

await Promise.all(
  Array.from({ length: Math.max(1, concurrency) }, (_, index) => worker(index + 1))
);

if (!dryRun && generated > 0) {
  const byId = new Map(items.map((item) => [item.id, item]));
  for (const item of selected) {
    if (item.image_status === "generated_openai") {
      byId.get(item.id).image_status = "generated_openai";
    }
  }
  fs.writeFileSync(menuPath, `${JSON.stringify(items, null, 2)}\n`);
}

fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generated,
      skipped,
      failed,
      baseUrl,
      model,
      size,
      quality,
      concurrency,
      offset,
      limit: Number.isFinite(limit) ? limit : null,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  )}\n`
);

console.log(`Done. generated=${generated}, skipped=${skipped}, failed=${failed.length}`);
if (failed.length) {
  console.log(`Failure report: ${path.relative(root, reportPath)}`);
  process.exitCode = 1;
}
