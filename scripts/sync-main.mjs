import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const args = new Map();

for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  const value = process.argv[index + 1];

  if (!key || !key.startsWith('--')) {
    throw new Error(`Unexpected argument: ${key}`);
  }

  args.set(key.slice(2), value);
}

const targetDir = args.get('target');

if (!targetDir) {
  throw new Error('Missing required argument: --target <path>');
}

const repoRoot = process.cwd();
const outputRoot = path.resolve(targetDir);
const ignoreNames = new Set(['.git', 'node_modules', 'coverage']);

await mkdir(outputRoot, { recursive: true });

for (const entry of await readdir(repoRoot, { withFileTypes: true })) {
  if (ignoreNames.has(entry.name)) {
    continue;
  }

  const sourcePath = path.join(repoRoot, entry.name);
  const targetPath = path.join(outputRoot, entry.name);

  await rm(targetPath, { recursive: true, force: true });

  if (entry.isDirectory()) {
    await cp(sourcePath, targetPath, { recursive: true });
    continue;
  }

  await cp(sourcePath, targetPath);
}

const stubPath = path.join(repoRoot, 'src', 'index.stub.js');
const stubContent = await readFile(stubPath, 'utf8');
await mkdir(path.join(outputRoot, 'src'), { recursive: true });
await writeFile(path.join(outputRoot, 'src', 'index.js'), stubContent, 'utf8');
