import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const manifestSourcePath = path.join(repoRoot, 'examples', 'manifest.source.json');
const generatedManifestPath = path.join(repoRoot, 'src', 'generated', 'examples-manifest.js');

const requiredFields = [
  'id',
  'title',
  'category',
  'summary',
  'tags',
  'runtime',
  'difficulty',
  'description',
  'scriptPath',
  'issueContext',
  'checks'
];

export async function loadExampleDefinitions(sourcePath = manifestSourcePath) {
  return JSON.parse(await readFile(sourcePath, 'utf8'));
}

export function validateExampleDefinitions(definitions, scriptMap) {
  const seenIds = new Set();

  return definitions.map((definition) => {
    for (const field of requiredFields) {
      if (definition[field] == null || definition[field] === '') {
        throw new Error(`Example "${definition.id ?? '<missing id>'}" is missing "${field}".`);
      }
    }

    if (seenIds.has(definition.id)) {
      throw new Error(`Duplicate example id "${definition.id}".`);
    }

    seenIds.add(definition.id);

    if (!Array.isArray(definition.tags) || definition.tags.length === 0) {
      throw new Error(`Example "${definition.id}" must include at least one tag.`);
    }

    if (!Array.isArray(definition.checks) || definition.checks.length === 0) {
      throw new Error(`Example "${definition.id}" must include at least one check.`);
    }

    const script = scriptMap.get(definition.scriptPath);

    if (!script) {
      throw new Error(`Missing script for "${definition.id}" at "${definition.scriptPath}".`);
    }

    const headerLines = script
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0)
      .slice(0, 5);

    if (
      headerLines.length < 5 ||
      headerLines.some((line) => !line.trim().startsWith('#'))
    ) {
      throw new Error(
        `Example "${definition.id}" must start with a five-line comment header.`
      );
    }

    return {
      ...definition,
      script
    };
  });
}

export async function buildExamplesManifest({
  sourcePath = manifestSourcePath,
  outputPath = generatedManifestPath
} = {}) {
  const definitions = await loadExampleDefinitions(sourcePath);
  const scriptMap = new Map();

  for (const definition of definitions) {
    const absoluteScriptPath = path.join(repoRoot, definition.scriptPath);
    const script = await readFile(absoluteScriptPath, 'utf8');
    scriptMap.set(definition.scriptPath, script);
  }

  const manifest = validateExampleDefinitions(definitions, scriptMap);
  const fileContents = `export const examples = ${JSON.stringify(manifest, null, 2)};\n`;

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, fileContents, 'utf8');
  return manifest;
}

const isMainModule =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  const manifest = await buildExamplesManifest();
  console.log(`Generated ${manifest.length} examples into ${path.relative(repoRoot, generatedManifestPath)}.`);
}
