const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";

async function assertOk(url) {
  const response = await fetch(url, { redirect: "manual" });
  if (response.status < 200 || response.status >= 400) {
    throw new Error(`${response.status} ${url}`);
  }
  return response;
}

const sitemapResponse = await assertOk(`${baseUrl}/sitemap.xml`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replace(/^https?:\/\/[^/]+/, baseUrl));
const fixedAssets = ["/images/hero-gym.png", "/images/equipment-rack.png", "/icon.svg", "/icon-maskable.svg", "/manifest.webmanifest", "/robots.txt"];

const failures = [];
for (const url of [...urls, ...fixedAssets.map((path) => `${baseUrl}${path}`)]) {
  try {
    await assertOk(url);
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }
}

if (failures.length) {
  console.error(`Smoke test failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Smoke test passed: ${urls.length} pages and ${fixedAssets.length} public assets.`);

