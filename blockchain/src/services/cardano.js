import { Blockfrost, Lucid } from "lucid-cardano";

// ES6 singleton instance
let lucid = null;

/**
 * Initialize Lucid with Blockfrost
 */
export async function initLucid() {
  if (lucid) return lucid;

  const apiKey = process.env.BLOCKFROST_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ Missing Blockfrost API key");
    return null;
  }

  lucid = await Lucid.new(
    new Blockfrost(
      "https://cardano-testnet.blockfrost.io/api/v0",
      apiKey
    ),
    "Testnet"
  );

  console.log("✅ Lucid initialized");
  return lucid;
}

/**
 * Create Wallet from seed phrase (ES6)
 */
export async function createWallet(seedPhrase) {
  const api = await initLucid();
  if (!api) throw new Error("Lucid not initialized");

  api.selectWalletFromSeed(seedPhrase);
  const address = await api.wallet.address();

  console.log("Wallet:", address);
  return { api, address };
}

/**
 * Create UTxO containing metadata
 */
export async function createProofUTxO(proofHash, claim, seedPhrase) {
  try {
    console.log(`Creating UTxO for ${proofHash}...`);

    const { api } = await createWallet(seedPhrase);

    const metadata = {
      674: {
        msg: [
          "Midnight Pass Proof",
          `Hash: ${proofHash}`,
          `Claim: ${claim}`,
          `Time: ${new Date().toISOString()}`,
        ],
      },
    };

    const tx = await api
      .newTx()
      .payToAddress(await api.wallet.address(), { lovelace: 2000000n })
      .attachMetadata(674, metadata[674])
      .complete();

    const signed = await tx.sign().complete();
    const txHash = await signed.submit();

    console.log("Tx Hash:", txHash);
    return txHash;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * Verify a transaction exists on Blockfrost
 */
export async function verifyUTxO(txHash) {
  try {
    const apiKey = process.env.BLOCKFROST_API_KEY;

    const res = await fetch(
      `https://cardano-testnet.blockfrost.io/api/v0/txs/${txHash}`,
      { headers: { project_id: apiKey } }
    );

    return res.ok;
  } catch (e) {
    return false;
  }
}

/**
 * Get wallet balance
 */
export async function getWalletBalance(seedPhrase) {
  const { api, address } = await createWallet(seedPhrase);

  const utxos = await api.wallet.getUtxos();
  let total = 0n;

  utxos.forEach((u) => (total += u.assets.lovelace));

  return {
    address,
    lovelace: total.toString(),
    ada: Number(total) / 1_000_000,
  };
}
