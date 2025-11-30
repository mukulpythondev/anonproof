const BASE_URL = "http://20.20.0.18:4000"; // your backend server

// ---------------------------------------
// GENERATE PROOF (claim + inputValue)
// ---------------------------------------
export async function generateProof(claim, inputValue) {
  const res = await fetch(`${BASE_URL}/api/proof/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ claim, inputValue }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Failed to generate proof");
  }

  return json; // { proofHash, claim, utxo?, ... }
}

// ---------------------------------------
// VERIFY PROOF (uses proofHash ONLY)
// ---------------------------------------
export async function verifyProof(proofHash) {
  const res = await fetch(`${BASE_URL}/api/proof/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ proofHash }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Failed to verify proof");
  }

  return json; // { valid: true/false }
}
