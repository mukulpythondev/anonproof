import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE_PATH = path.join(__dirname, '../../storage/proofs.json');

function ensureStorage() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify([], null, 2));
  }
}

async function readStore() {
  try {
    ensureStorage();
    const data = fs.readFileSync(STORE_PATH, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading store:', err);
    return [];
  }
}

async function writeStore(data) {
  try {
    ensureStorage();
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing store:', err);
  }
}

async function saveProof(record) {
  const proofs = await readStore();
  proofs.push(record);
  await writeStore(proofs);
  return record;
}

async function loadProof(proofHash) {
  const proofs = await readStore();
  return proofs.find(p => p.proofHash === proofHash);
}

async function getAllProofs() {
  return await readStore();
}

export {
  saveProof,
  loadProof,
  getAllProofs
};