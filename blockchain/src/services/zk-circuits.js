// src/services/zk-circuits.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../storage/proofs.json");

function loadDB() {
  if (!fs.existsSync(DB_PATH)) return [];
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function generateProof(claim, inputValue) {
  console.log(`🔐 Generating ZK proof for claim: ${claim}`);

  // Simulate Groth16 delay
  await new Promise((res) => setTimeout(res, 400));

  const proof = {
    protocol: "groth16",
    curve: "bn128",
    pi_a: ["a1", "a2"],
    pi_b: [["b1", "b2"]],
    pi_c: ["c1", "c2"],
  };

  const publicSignals = {
    claim,
    inputHash: `hash_${Math.random().toString(36).slice(2)}`,
    valid: true,
    timestamp: Date.now(),
  };

  return { proof, publicSignals };
}

export async function verifyProof(proof, publicSignals) {
  console.log("🔍 Verifying ZK proof...");

  await new Promise((res) => setTimeout(res, 250));

  return (
    proof &&
    proof.protocol === "groth16" &&
    publicSignals &&
    publicSignals.valid === true
  );
}

export async function listProofs() {
  const items = loadDB();
  return { count: items.length, proofs: items };
}

export function saveProofRecord(record) {
  const db = loadDB();
  db.push(record);
  saveDB(db);
}
