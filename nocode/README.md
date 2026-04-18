# 🌌 Nivora Wallet

**A Privacy-First Fintech Aggregator & Secure Vault**

Nivora Wallet is a beautiful, dark-themed platform designed to give you a unified overview of your consolidated wealth while securely storing your most sensitive financial secrets (like UPI PINs and passwords) using military-grade encryption in a zero-knowledge local environment.

## 🚀 Features

- **Consolidated Wealth Dashboard**: Automatically aggregates mocked bank accounts and financial data into one aesthetically pleasing widget. 
- **Secure Vault**: Client-side AES-256 encryption using Crypto.js. Store your UPI PINs and passwords with peace of mind.
- **Biometric Ready**: Gated by a WebAuthn portal (simulated) that refuses entry without proper verification.
- **Anime Aesthetic**: Deep black themes, glassmorphism, and neon (blue/purple) accents. 

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Encryption**: Crypto-js (AES)
- **Database**: Mock (Ready to be easily plugged into Supabase PostgreSQL).

## 💻 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   
   *Note: If you are on Windows and experience Turbopack issues with Next 16, run the webpack version:*
   ```bash
   npm run dev -- --webpack
   ```

3. **Open [http://localhost:3000](http://localhost:3000) with your browser.**

---

### Project Architecture Note
This version leverages heavily optimized mock layers for database persistence and authentication to facilitate simple deployment and demonstration without an active Supabase cluster. WebAuthn and Supabase layers can be plugged into `src/lib/store.ts` when remote services are available.
