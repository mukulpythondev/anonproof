const BASE_URL = "http://10.85.177.229:4000"; // change to your server IP for production

export async function generateProof(claim, inputValue) {
  const res = await fetch(`${BASE_URL}/api/proof/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ claim, inputValue }),
  });

  if (!res.ok) throw new Error("Failed to generate proof");
  return await res.json();
}

export async function verifyProof(proofHash) {
  const res = await fetch(`${BASE_URL}/api/proof/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ proofHash }),
  });

  return await res.json();
}
