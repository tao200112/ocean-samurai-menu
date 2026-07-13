import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const apiKey = process.env.NEWAPI_KEY;
const baseUrl = process.env.NEWAPI_BASE_URL || "https://newapi.aisonnet.org/v1";

if (!apiKey) {
  throw new Error("Missing NEWAPI_KEY environment variable.");
}

const outputDir = path.resolve("public/home");

const sharedStyle = [
  "high-end real restaurant photography",
  "Ocean Samurai Japanese hibachi and sushi bar brand mood",
  "fresh generous portions, polished but realistic",
  "ocean blue ceramic plates, pale aqua background accents, clean natural restaurant light",
  "no text, no logo, no hands, no people, no watermark, no plastic look",
  "not over-stylized, believable menu photography, sharp focus",
].join(", ");

const assets = [
  {
    file: "hero-ocean-samurai.png",
    size: "1536x1024",
    prompt:
      `A premium hero image for a Japanese hibachi and sushi restaurant website: an abundant sushi and hibachi spread on a long table, including colorful sushi rolls, nigiri, sashimi, shrimp tempura, hibachi steak cubes, hibachi chicken, fried rice, and sauces. Use refined ocean blue tableware and subtle wave-inspired background elements. ${sharedStyle}. Wide composition with open negative space on the left for website headline.`,
  },
  {
    file: "category-sushi-rolls.png",
    size: "1024x1024",
    prompt:
      `A generous assortment of sushi rolls for a restaurant menu category card: California roll, spicy tuna roll, salmon avocado roll, rainbow roll, crunchy roll, arranged on an ocean blue ceramic plate with soy sauce and ginger on the side. ${sharedStyle}. Square composition, food fills most of the frame.`,
  },
  {
    file: "category-nigiri-sashimi.png",
    size: "1024x1024",
    prompt:
      `Elegant nigiri and sashimi assortment for a restaurant menu category card: salmon, tuna, yellowtail, shrimp, white fish, octopus, tamago, arranged with wasabi and ginger on a blue ceramic platter. ${sharedStyle}. Square composition, realistic portions, not luxury fine dining tiny portions.`,
  },
  {
    file: "category-hibachi-teriyaki.png",
    size: "1024x1024",
    prompt:
      `Japanese hibachi and teriyaki entree category image: hibachi steak cubes, hibachi chicken, shrimp, zucchini, onion, broccoli, fried rice, and glossy teriyaki sauce on a hot plate style setting. ${sharedStyle}. Square composition, generous casual restaurant portion.`,
  },
  {
    file: "category-appetizers.png",
    size: "1024x1024",
    prompt:
      `Japanese restaurant appetizer sampler: fried shrimp shumai dumplings, gyoza, crab rangoon without showing inside filling, spring rolls, takoyaki, vegetable tempura, with dipping sauces on the side. ${sharedStyle}. Square composition, generous portions, realistic menu photo.`,
  },
  {
    file: "category-noodles-rice-dessert.png",
    size: "1024x1024",
    prompt:
      `Comforting Japanese restaurant sides and dessert category image: yakisoba noodles with vegetables, fried rice, white rice bowl, and colorful mochi ice cream on ocean blue plates. ${sharedStyle}. Square composition, balanced grouping, realistic restaurant menu photography.`,
  },
  {
    file: "ayce-premium-supreme.png",
    size: "1536x1024",
    prompt:
      `All you can eat Japanese sushi and hibachi restaurant spread: many plates arranged like a lively table feast, sushi rolls, nigiri, appetizers, hibachi steak, hibachi chicken, shrimp tempura, fried rice, noodles, and mochi ice cream. Ocean blue accents, bright welcoming mood. ${sharedStyle}. Wide website section image.`,
  },
  {
    file: "location-order-table.png",
    size: "1536x1024",
    prompt:
      `A welcoming Japanese restaurant pickup and dine-in website image: ocean blue table setting with sushi rolls, hibachi plate, chopsticks, soy sauce, and a small clean table number stand, bright casual restaurant atmosphere, no storefront, no logo, no readable text. ${sharedStyle}. Wide website section image with calm negative space.`,
  },
  {
    file: "hiring-team-table.png",
    size: "1536x1024",
    prompt:
      `A warm hiring page image for a Japanese sushi and hibachi restaurant: neatly set ocean blue dining table with sushi plates, order pad, apron folded beside chopsticks, welcoming service atmosphere, no people, no hands, no readable text, no logo. ${sharedStyle}. Wide website section image, polished but realistic.`,
  },
];

async function generate(asset) {
  const outputPath = path.join(outputDir, asset.file);
  try {
    await access(outputPath);
    console.log(`skipped ${asset.file}`);
    return;
  } catch {
    // Generate missing assets.
  }

  const body = {
    model: "gpt-image-2",
    prompt: asset.prompt,
    size: asset.size,
  };

  const response = await fetch(`${baseUrl}/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(`${asset.file}: ${response.status} ${JSON.stringify(json)}`);
  }

  const first = json?.data?.[0];
  let buffer;
  if (first?.b64_json) {
    buffer = Buffer.from(first.b64_json, "base64");
  } else if (first?.url) {
    const imageResponse = await fetch(first.url);
    if (!imageResponse.ok) {
      throw new Error(`${asset.file}: could not download image URL ${imageResponse.status}`);
    }
    buffer = Buffer.from(await imageResponse.arrayBuffer());
  } else {
    throw new Error(`${asset.file}: image response did not include b64_json or url`);
  }

  await writeFile(outputPath, buffer);
  console.log(`saved ${asset.file}`);
}

await mkdir(outputDir, { recursive: true });

for (const asset of assets) {
  try {
    await generate(asset);
  } catch (error) {
    if (asset.size !== "1024x1024") {
      console.warn(`retrying ${asset.file} at 1024x1024`);
      await generate({ ...asset, size: "1024x1024" });
    } else {
      throw error;
    }
  }
}
