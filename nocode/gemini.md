Mission: Build 'Nivora Wallet' - A Privacy-First Fintech Aggregator & Secure Vault.

Goal: Create a full-stack web application (Next.js + Supabase + Tailwind) that allows users to manage financial secrets and track balances via a unified dashboard.

Task 1: Architecture & Scaffolding (Agent 1)

Initialize a Next.js project with TypeScript and Shadcn/UI.

Use a Database-First approach: Draft a PostgreSQL schema for users, accounts, encrypted_secrets (AES-256), and transaction_logs.

Set up Supabase for Authentication and Data Persistence.

Task 2: The Unified Dashboard (Agent 2)

Implement a Mock Balance API and an SMS Parsing Service (Logic-only for web demo).

Build a "Consolidated Wealth" card that aggregates balances from multiple simulated bank sources.

Create a "Vault" UI for storing UPI PINs/Passwords with a "click-to-reveal" mask.

Task 3: Security & Verification (Agent 3)

Implement AES-256 encryption for the Vault using a user-defined Master Key (stored only in-memory/local).

Integrate WebAuthn/Biometric API for dashboard access.

Verification: Use the AntiGravity Browser Agent to load the app, perform a login flow, add a mock secret, and verify it is encrypted in the database.

Constraints & Output:

Follow a clean, anime-inspired aesthetic (Glassmorphism, dark mode, subtle neon accents).

Use MCP Servers if any financial data tools are available; otherwise, stick to robust mock implementations.

Do not ask me for confirmation on individual file edits.

Deliverables: Provide a Plan Artifact first, then proceed to code. Once finished, record a Walkthrough Video of the autonomous testing and generate a README.md with the "Nivora" branding.

I will review everything once the browser agent confirms all tests pass.