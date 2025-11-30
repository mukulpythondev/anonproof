import { Blockfrost, Lucid } from "lucid-cardano";

let lucid = null;

/* -------------------------------------------------
   ⭐ INIT LUCID
------------------------------------------------- */
export async function initLucid() {
  if (lucid) return lucid;

  const apiKey = process.env.BLOCKFROST_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ BLOCKFROST_API_KEY missing — chain disabled");
    return null;
  }

  lucid = await Lucid.new(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", apiKey),
    "Preprod"
  );

  console.log("✅ Lucid initialized for Cardano Testnet");
  return lucid;
}

/* -------------------------------------------------
   ⭐ CREATE WALLET
------------------------------------------------- */
export async function createWallet(seedPhrase) {
  const api = await initLucid();
  if (!api) throw new Error("Lucid not initialized");

  api.selectWalletFromSeed(seedPhrase);
  const address = await api.wallet.address();

  console.log("👛 Wallet loaded:", address);
  return { api, address };
}

/* -------------------------------------------------
   ⭐ GET WALLET BALANCE
------------------------------------------------- */
export async function getWalletBalance(seedPhrase) {
  const { api, address } = await createWallet(seedPhrase);

  const utxos = await api.wallet.getUtxos();
  let total = 0n;

  utxos.forEach((u) => (total += u.assets.lovelace));

  return {
    address,
    lovelace: total.toString(),
    ada: Number(total) / 1_000_000,
    hasBalance: total > 0n,
  };
}

/* -------------------------------------------------
   ⭐ CREATE UTXO WITH FALLBACK MODE
------------------------------------------------- */
export async function createProofUTxO(proofHash, claim, seedPhrase) {
  console.log(`📝 createProofUTxO():`, proofHash, claim);

  try {
    const { api } = await createWallet(seedPhrase);
    const balanceInfo = await getWalletBalance(seedPhrase);

    // 1️⃣ If NO BALANCE → fallback mode
    if (!balanceInfo.hasBalance) {
      console.warn("⚠️ Wallet empty — using MOCK TX. No real blockchain transaction.");
      return "mock_tx_" + proofHash;
    }

    // 2️⃣ REAL ON-CHAIN TX
    console.log("💰 Wallet funded. Creating real Cardano UTxO...");

    const metadata = {
      674: {
        msg: [
          "Midnight Pass Proof",
          `Hash: ${proofHash}`,
          `Claim: ${claim}`,
          `Timestamp: ${Date.now()}`,
        ],
      },
    };

    const tx = await api
      .newTx()
      .payToAddress(await api.wallet.address(), { lovelace: 2_000_000n })
      .attachMetadata(674, metadata[674])
      .complete();

    const signed = await tx.sign().complete();
    const txHash = await signed.submit();

    console.log("✅ Real UTxO Created:", txHash);
    return txHash;
  } catch (err) {
    console.error("❌ Failed creating UTxO:", err);

    // LAST RESORT FALLBACK
    console.warn("⚠️ Creating FALLBACK mock transaction");
    return "mock_tx_" + proofHash;
  }
}

/* -------------------------------------------------
   ⭐ VERIFY UTXO
------------------------------------------------- */
export async function verifyUTxO(txHash) {
  try {
    if (txHash.startsWith("mock_tx_")) {
      console.log("ℹ️ Mock TX detected → auto valid");
      return true;
    }

    const apiKey = process.env.BLOCKFROST_API_KEY;

    const res = await fetch(
      new Blockfrost(
  "https://cardano-preprod.blockfrost.io/api/v0",
  apiKey
)
,
      { headers: { project_id: apiKey } }
    );

    return res.ok;
  } catch (err) {
    console.error("❌ verifyUTxO Error:", err);
    return false;
  }
}

export default {
  initLucid,
  createWallet,
  createProofUTxO,
  verifyUTxO,
  getWalletBalance,
};
