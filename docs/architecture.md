---
title: Architecture
description: Overview of how MoltGhost runs private AI agents using dedicated compute, isolated runtimes, and local models.
slug: architecture
---

# Architecture

Overview of how MoltGhost runs private AI agents using dedicated compute, isolated runtimes, and local models.

---

## System Overview

MoltGhost is designed to run AI agents in fully isolated environments.
Each agent runs on its own machine with a private runtime, local models, and dedicated resources.

This architecture ensures agents remain independent, secure, and predictable while maintaining full control over compute, models, and data.

---

## Architecture Flow

![Architecture Flow](/images/architecture.png)

Diagram above shows how users interact with MoltGhost and how agents are provisioned, executed, and extended with private features.

---

## Design Principles

MoltGhost architecture is built around three key principles:

- **Isolation** — Each agent runs in its own dedicated environment.
- **Privacy** — Models, data, and execution remain fully private.
- **Control** — Users maintain full control over compute, models, and agent behavior.

---

## Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Compute | NVIDIA GPU | Accelerates AI model inference for agents |
| Infrastructure | Cloud Virtual Machines | Dedicated machine environment for each agent |
| Runtime | Docker | Containerized runtime for agents and services |
| Agent Framework | OpenClaw | Executes agent logic, tools, and workflows |
| Model Runtime | Ollama | Runs local LLM models inside agent pods |
| Networking | Cloudflare Tunnel | Secure private access to agents without exposing ports |
| Edge & Security | Cloudflare | Traffic routing and infrastructure protection |
| Frontend | Vercel | Hosts the MoltGhost dashboard interface |
| Authentication | Privy | Web3 authentication and wallet-based login |
| Storage | Storj | Decentralized encrypted storage for agent files and backups |
| Payments | Solana | Blockchain layer for agent payments |
| Payment Protocol | x402 | HTTP-native payment protocol for services |
| Privacy Payments | Privacy Cash | Enables privacy-preserving payments |
| Cryptography | Zero-Knowledge Proofs | Privacy-preserving verification and transactions |
| Privacy Compute | Arcium | Confidential computing and encrypted data processing |
| Blockchain Infra | Helius | Solana RPC and indexing infrastructure |
