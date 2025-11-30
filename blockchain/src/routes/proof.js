import express from "express";
import {
  generateProof,
  verifyProof,
  listProofs,
} from "../services/zk-circuits.js";

import Cardano from "../services/cardano.js";

const router = express.Router();

/* -------------------------------------------------
   🔹 WALLET BALANCE — Cardano Preprod
--------------------------------------------------- */
router.get("/wallet/balance", async (req, res) => {
  try {
    const seedPhrase = process.env.WALLET_SEED_PHRASE;

    if (!seedPhrase) {
      return res.status(500).json({
        success: false,
        error: "WALLET_SEED_PHRASE missing in .env",
      });
    }

    const balance = await Cardano.getWalletBalance(seedPhrase);

    return res.json({
      success: true,
      ...balance,
    });
  } catch (err) {
    console.error("💥 Wallet balance error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve wallet balance",
      details: err.message,
    });
  }
});

/* -------------------------------------------------
   🔹 GENERATE PROOF + Cardano UTxO (optional)
--------------------------------------------------- */
router.post("/generate", async (req, res) => {
  try {
    const { claim, inputValue } = req.body;

    // Strong validation
    if (!claim || !inputValue) {
      return res.status(400).json({
        success: false,
        error: "Missing claim or inputValue",
      });
    }

    console.log("🔥 Incoming /generate:", { claim, inputValue });

    // 1. ZK PROOF
    const { proof, publicSignals } = await generateProof(claim, inputValue);

    // 2. UNIQUELY IDENTIFY PROOF
    const proofHash = `zk_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`;

    // 3. CARDANO UTXO (optional)
    let utxo = "mock"; // fallback

    if (process.env.ENABLE_CARDANO === "true") {
      try {
        utxo = await Cardano.createProofUTxO(
          proofHash,
          claim,
          process.env.WALLET_SEED_PHRASE
        );

        console.log("📦 UTxO created:", utxo);
      } catch (err) {
        console.warn("⚠️ UTxO creation failed → fallback to mock:", err.message);
        utxo = "mock_tx_" + proofHash;
      }
    } else {
      console.log("ℹ️ ENABLE_CARDANO=false → using mock tx");
      utxo = "mock_tx_" + proofHash;
    }

    // 4. RESPONSE
    return res.json({
      success: true,
      proofHash,
      claim,
      inputValue,
      publicSignals,
      proof,
      utxo,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error("❌ generateProof failed:", err);
    return res.status(500).json({
      success: false,
      error: "Proof generation error",
      details: err.message,
    });
  }
});

/* -------------------------------------------------
   🔹 VERIFY PROOF (local / ZK validity)
--------------------------------------------------- */
router.post("/verify", async (req, res) => {
  try {
    const { proof, publicSignals } = req.body;

    if (!proof || !publicSignals) {
      return res.status(400).json({
        success: false,
        error: "Missing proof or publicSignals",
      });
    }

    const isValid = await verifyProof(proof, publicSignals);

    return res.json({
      success: true,
      isValid,
    });
  } catch (err) {
    console.error("❌ verifyProof failed:", err.message);
    return res.status(500).json({
      success: false,
      error: "Proof verification error",
      details: err.message,
    });
  }
});

/* -------------------------------------------------
   🔹 LIST ALL STORED PROOFS
--------------------------------------------------- */
router.get("/all", async (req, res) => {
  try {
    const proofs = await listProofs();
    return res.json({
      success: true,
      proofs,
    });
  } catch (err) {
    console.error("❌ listProofs error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch proofs",
      details: err.message,
    });
  }
});

export default router;
