/**
 * One-shot: download monochrome SVGs into public/icons/tech/
 * Usage: node scripts/fetch-tech-icons.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "icons", "tech");

const slugs = [
  "openjdk",
  "python",
  "typescript",
  "postgresql",
  "html5",
  "r",
  "nextdotjs",
  "nodedotjs",
  "fastapi",
  "flask",
  "streamlit",
  "springboot",
  "git",
  "docker",
  "jenkins",
  "amazonwebservices",
  "apache",
  "linux",
  "pandas",
  "numpy",
  "scikitlearn",
  "pytorch",
  "huggingface",
  "langchain",
  "prisma",
  "tailwindcss",
];

await mkdir(outDir, { recursive: true });

for (const slug of slugs) {
  const urls = [
    `https://cdn.simpleicons.org/${slug}/ffffff`,
    `https://cdn.jsdelivr.net/npm/simple-icons@14/icons/${slug}.svg`,
  ];

  let ok = false;
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      let svg = await res.text();
      // Force white/current fill for mask friendliness when possible
      if (!svg.includes("ffffff") && svg.includes("<svg")) {
        svg = svg.replace(/fill="[^"]*"/g, 'fill="#ffffff"');
        if (!/fill=/.test(svg)) {
          svg = svg.replace("<svg", '<svg fill="#ffffff"');
        }
      }
      await writeFile(join(outDir, `${slug}.svg`), svg, "utf8");
      console.log("ok", slug, url);
      ok = true;
      break;
    } catch (e) {
      console.warn("fail", slug, url, e.message);
    }
  }
  if (!ok) console.error("MISSING", slug);
}

console.log("done →", outDir);
