// src/routes/proof.js
import express from "express";
import {
  generateProof,
  verifyProof,
  listProofs,
} from "../services/zk-circuits.js";

import Cardano from "../services/cardano.js";

const router = express.Router();

/* -------------------------------------------------
   🔹 WALLET BALANCE ENDPOINT
   ------------------------------------------------- */
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
    console.error("💥 Wallet balance error:", err.message);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve wallet balance",
      details: err.message,
    });
  }
});

/* -------------------------------------------------
   🔹 GENERATE PROOF + (optional) CREATE UTXO
   ------------------------------------------------- */
router.post("/generate", async (req, res) => {
  try {
    const { claim, inputValue } = req.body;

    if (!claim || !inputValue) {
      return res.status(400).json({
        success: false,
        error: "Missing claim or inputValue",
      });
    }

    console.log("🔥 Incoming /generate:", req.body);

    // Step 1: Generate Mock ZK Proof
    const { proof, publicSignals } = await generateProof(claim, inputValue);

    // Step 2: Create a proofHash
    const proofHash = `zk_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`;

    // Step 3: (Optional) Create UTxO (only when testnet is working)
    let utxo = null;

    if (process.env.ENABLE_CARDANO === "true") {
      try {
        utxo = await Cardano.createProofUTxO(
          proofHash,
          claim,
          process.env.WALLET_SEED_PHRASE
        );
      } catch (err) {
        console.warn("⚠️ UTxO creation failed:", err.message);
      }
    }

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
   🔹 VERIFY PROOF ENDPOINT
   ------------------------------------------------- */
router.post("/verify", async (req, res) => {
  try {
    const { proof, publicSignals } = req.body;

    const isValid = await verifyProof(proof, publicSignals);

    return res.json({
      success: true,
      isValid,
    });
  } catch (err) {
    console.error("❌ verifyProof failed:", err);
    return res.status(500).json({
      success: false,
      error: "Proof verification error",
      details: err.message,
    });
  }
});

/* -------------------------------------------------
   🔹 GET ALL GENERATED PROOFS
   ------------------------------------------------- */
router.get("/all", async (req, res) => {
  try {
    const result = await listProofs();
    return res.json(result);
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
