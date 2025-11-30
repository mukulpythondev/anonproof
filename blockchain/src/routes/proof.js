import express from "express";
import * as Cardano from "../services/cardano.js";     // ← FIXED IMPORT
import {
  generateProof,
  verifyProof,
} from "../services/zk-circuits.js";

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
        error: "WALLET_SEED_PHRASE is missing in .env",
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
   🔹 GENERATE PROOF
   ------------------------------------------------- */
router.post("/generate", async (req, res) => {
  try {
    console.log("🔥 Incoming /generate body:", req.body);  // <-- Add this

    const { claim, inputValue } = req.body;

    if (!claim || !inputValue) {
      console.log("❌ Missing claim or inputValue");
      return res.status(400).json({
        success: false,
        error: "Missing claim or inputValue",
      });
    }

    const result = await generateProof(claim, inputValue);

    return res.json({
      success: true,
      ...result,
    });

  } catch (err) {
    console.error("💥 generateProof ERROR:", err);
    return res.status(500).json({
      success: false,
      error: "Proof generation error",
      details: err.message,
    });
  }
});



/* -------------------------------------------------
   🔹 VERIFY PROOF
   ------------------------------------------------- */
router.post("/verify", async (req, res) => {
  try {
    return await verifyProof(req, res);
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
   🔹 LIST ALL PROOFS
   ------------------------------------------------- */
router.get("/all", async (req, res) => {
  try {
    return await listProofs(req, res);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch proofs",
      details: err.message,
    });
  }
});

export default router;
