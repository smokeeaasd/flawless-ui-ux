import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hash } from './shared.js';

export const recordName = '.flawless-install.json';
export const bundledSkill = fileURLToPath(new URL('../skills/flawless-ui-ux/', import.meta.url));

// Do not follow links, read devices, or trust paths from an installation record.
export async function treeHashes(root) {
  const files = Object.create(null);
  let count = 0, total = 0;
  async function visit(directory, depth = 0) {
    if (depth > 16) throw new Error('Installation tree is too deep.');
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      if (++count > 2000) throw new Error('Installation contains too many entries.');
      const file = path.join(directory, entry.name);
      const relative = path.relative(root, file).replaceAll('\\', '/');
      const stat = await fs.lstat(file);
      if (stat.isSymbolicLink()) throw new Error(`Installation contains a link: ${relative}`);
      if (stat.isDirectory()) await visit(file, depth + 1);
      else if (!stat.isFile()) throw new Error(`Unsupported installation entry: ${relative}`);
      else if (relative !== recordName) {
        total += stat.size;
        if (stat.size > 4 * 1024 * 1024 || total > 16 * 1024 * 1024) throw new Error('Installation exceeds inspection size limits.');
        files[relative] = hash(await fs.readFile(file));
      }
    }
  }
  const stat = await fs.lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error('Installation must be a directory, not a link.');
  await visit(root);
  return Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b, 'en')));
}

export async function installationRecord(root, version) {
  return { schemaVersion: 1, toolVersion: version, files: await treeHashes(root) };
}

export async function writeInstallationRecord(root, record) {
  await fs.writeFile(path.join(root, recordName), `${JSON.stringify(record, null, 2)}\n`, { flag: 'wx' });
}

export function differences(before, after) {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])].sort().flatMap(file =>
    before[file] === after[file] ? [] : [{ path: file, change: !Object.hasOwn(before, file) ? 'added' : !Object.hasOwn(after, file) ? 'removed' : 'changed' }]);
}

export async function readInstallation(root, current, legacy) {
  const files = await treeHashes(root);
  let record;
  try {
    const location = path.join(root, recordName);
    const stat = await fs.lstat(location);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 256 * 1024) throw new Error('Invalid installation record.');
    record = JSON.parse(await fs.readFile(location, 'utf8'));
    if (record.schemaVersion !== 1 || !/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(record.toolVersion) ||
        !record.files || Array.isArray(record.files) || typeof record.files !== 'object' ||
        !Object.entries(record.files).length || Object.entries(record.files).some(([file, value]) =>
          !file || file === recordName || file.split('/').some(part => !part || part === '.' || part === '..') ||
          file.includes('\\') || path.isAbsolute(file) || !/^[a-f0-9]{64}$/.test(value))) throw new Error('Invalid installation record.');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    // Older installers did not record a version. Recognize exact published trees only.
    record = legacy.find(candidate => !differences(candidate.files, files).length);
    if (!record && !differences(current.files, files).length) record = current;
    if (!record) return { version: null, files, modified: [], managed: false };
  }
  return { version: record.toolVersion, files, modified: differences(record.files, files), managed: true };
}
