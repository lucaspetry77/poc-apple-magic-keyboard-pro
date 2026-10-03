import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

// Check both source HTML and the generated site without a browser dependency.
const root = path.resolve(process.argv[2] ?? ".");
const html = await readFile(path.join(root, "index.html"), "utf8");
const source = process.argv[2] === undefined;
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "O HTML contém IDs duplicados.");
assert.match(html, /<html\s+lang="pt-BR"/, "O idioma da página deve ser pt-BR.");

const references = new Set(
  [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((match) => match[1]),
);
let assets = 0;
let anchors = 0;

for (const reference of references) {
  if (/^[a-z][a-z\d+.-]*:/i.test(reference) || reference.startsWith("//")) continue;
  if (reference.startsWith("#")) {
    assert(ids.includes(reference.slice(1)), `Âncora ou símbolo ausente: ${reference}`);
    anchors += 1;
    continue;
  }

  const pathname = decodeURIComponent(reference.split(/[?#]/)[0]).replace(/^\/+/, "");
  if (!pathname) continue;
  const assetRoot = source && pathname.startsWith("assets/") ? path.join(root, "public") : root;
  const target = path.resolve(assetRoot, pathname);
  assert(target.startsWith(`${assetRoot}${path.sep}`), `Caminho fora do projeto: ${reference}`);
  const file = await stat(target).catch(() => null);
  assert(file?.isFile() && file.size > 0, `Arquivo ausente ou vazio: ${reference}`);
  assets += 1;
}

if (source) {
  const prompts = JSON.parse(await readFile(path.join(root, "design/prompts.json"), "utf8"));
  assert(
    prompts.hero && prompts.variants?.length === 4,
    "Os cinco renders devem ter seus prompts.",
  );
  for (const name of ["hero-prata", ...prompts.variants.map((variant) => variant.name)]) {
    for (const filename of [`public/assets/${name}.webp`, `design/originals/${name}.png`]) {
      assert((await stat(path.join(root, filename))).size > 0, `Render ausente: ${filename}`);
    }
  }
}

console.log(
  `Site validado: ${assets} arquivos locais e ${anchors} âncoras/símbolos (${source ? "fonte" : "build"}).`,
);
