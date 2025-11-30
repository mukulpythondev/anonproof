

# 🌑 **Midnight Pass — Privacy-Preserving Credential Wallet for Events**

Midnight Pass is a **mobile-first private credential wallet** that enables users to generate **zero-knowledge proofs (ZKPs)** to verify eligibility claims (like age, student status, residency, or KYC verification) **without revealing any personal information**.

Built using **Midnight Compact ZK circuits**, **Cardano's UTxO ledger**, and a smooth, event-friendly mobile UI — Midnight Pass delivers real-world privacy at check-in counters, access gates, and event entries.

---

# 🧩 **Problem**

Events (hackathons, concerts, college fests, meetups) frequently require users to submit personal documents:

* DOB
* Student ID
* KYC details
* Address proofs

This results in:

* Oversharing sensitive information
* Storage risks for organizers
* Manual verification delays
* Poor, repetitive onboarding
* Zero user control over who sees their data

Yet organizers only need to know **YES/NO eligibility**, not personal details.

---

# 🔐 **Our Solution — Midnight Pass**

**Midnight Pass allows users to prove they are eligible for events (18+, student, resident, etc.) without sharing actual documents.**

Using **Midnight’s Compact ZK circuits**, users generate proofs *locally* on their phone.
Event organizers verify these proofs using a **private Plutus smart contract** on Cardano.
A verification receipt (UTxO hash) is anchored on-chain — containing **zero PII**.

# Prototype  
Landing Page

---

## Attendee Application

### User Screens (3-Column Grid)

| Home | Login | Wallet |
|------|-------|--------|
| <img width="260" src="https://github.com/user-attachments/assets/5f317056-0153-48f1-b479-3cc41e7d2e58" /> | <img width="260" src="https://github.com/user-attachments/assets/f970fe50-65e7-4cce-b1b2-8e35f5105a35" /> | <img width="260" src="https://github.com/user-attachments/assets/963c9b15-9d56-4809-9161-98be72abf5a6" /> |

| Choose Credential | DOB Input | Event Entry QR |
|-------------------|-----------|----------------|
| <img width="260" src="https://github.com/user-attachments/assets/774246e6-3368-497b-bba6-d82c5d9e8072" /> | <img width="260" src="https://github.com/user-attachments/assets/4c3f6a8f-92c1-4cf6-a55a-e7322a2fe42c" /> | <img width="260" src="https://github.com/user-attachments/assets/745d4b67-f3d5-4122-a0fd-bbe0ed168298" /> |

---

## Organizer Application

### Organizer Screens (3-Column Grid)

| Login | Dashboard | Scan QR |
|-------|-----------|---------|
| <img width="260" src="https://github.com/user-attachments/assets/226dbf43-82ea-4ac8-b980-d4ffc4936752" /> | <img width="260" src="https://github.com/user-attachments/assets/359dd026-4423-4754-95cf-e1a3ded653eb" /> | <img width="260" src="https://github.com/user-attachments/assets/2707535b-fa8a-4821-9af8-b7652de2fa29" /> |









# ⭐ **Key Features**

### 🔹 **Privacy by Design**

* Local witness creation (DOB/KYC/student ID never leaves device)
* Zero-Knowledge Proof generation using Midnight Compact
* Private on-chain verification using Midnight-enabled Plutus
* Immutable UTxO receipts stored on Cardano
* Ephemeral DIDs for unlinkable attestations

### 🔹 **For Users**

* Mobile Proof Wallet: store multiple verified proofs
* Age ≥ 18 proof
* Student status proof
* Residency proof
* KYC-passed boolean proof
* QR sharing for event entry
* Beautiful animations via Lottie + Midnight Fox

### 🔹 **For Event Organizers**

* Instant verification via web portal
* Scan user QR → fetch proof hash
* Validate UTxO receipt
* Hydra optional for bulk instant verification

### 🔹 **User Experience**

* Dark theme with Midnight green highlights
* Smooth mobile navigation
* 10-sec onboarding explanation
* Voice input (optional)
* Delightful microinteractions

---

# 🧠 **Why This Matters**

Midnight Pass eliminates the need for:

* Manual ID checks
* Document uploads
* Data storage responsibilities
* Long entry queues

Users retain **control and privacy**.
Organizers gain **speed and trust**.
The system becomes **portable, safe, and instant**.

---

# ⚙️ **Architecture Overview**

### ⚫ **Mobile (Frontend – Expo App)**

* User enters sensitive data locally
* Witness created on-device
* Midnight Compact ZK circuit generates proof
* Proof submitted to smart contract
* UTxO receipt returned
* Stored in Proof Wallet
* QR sharing to verifier

### ⚫ **Blockchain Layer**

* Midnight Compact circuits (boolean claim verification)
* Midnight-enabled Plutus smart contract
* Cardano UTxO anchoring (non-PII)
* Optional Hydra Head for speed

### ⚫ **Verifier Web Portal**

* Scan QR
* Extract proof hash
* Check contract validity
* Check UTxO receipt
* Display “Verified”

---

# 🛠 **Tech Stack**

### **Mobile App (User Wallet)**

* React Native (Expo)
* TypeScript
* NativeWind (Tailwind RN)
* Lottie Animations
* Expo SecureStore
* Midnight Client JS (ZK proof generation)

### **Web Verifier Portal**

* React + TypeScript + Vite
* Tailwind CSS
* QR Code Scanner
* Cardano Serialization Lib
* Wallet APIs (Nami / Flint)

### **Blockchain**

* Midnight Compact ZK circuits
* Midnight-enabled Plutus smart contracts
* Cardano Testnet
* Hydra (optional)

### **Backend (Optional)**

* Node.js + Express
* Minimal helper APIs

---

# 🚀 **User Flow**

### **User (Mobile App)**

1. Onboard → learn privacy in 10 seconds
2. Add a credential (e.g., DOB, student ID)
3. Midnight Compact → generate ZK proof
4. Contract verifies proof
5. Cardano stores receipt (UTxO)
6. User sees “Verified Badge”
7. User shares QR with event organizer

### **Event Organizer**

1. Opens Verifier Web App
2. Scans QR
3. Fetches proof hash
4. Verifies contract + UTxO
5. Displays: **Verified ✔**
6. User enters event

---

# 💡 **Demo Scenario**

**User wants to enter an 18+ gaming festival.**

* Enters DOB once → generates ZK age-proof
* App anchors UTxO receipt on Cardano
* At the gate, user shares QR
* Verifier portal instantly shows **Verified**
* Midnight Fox celebrates with confetti

The entire verification takes **under 10 seconds**.
