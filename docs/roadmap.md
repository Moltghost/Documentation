---
title: "Roadmap"
description: Development roadmap for MoltGhost, from core infrastructure to a full privacy-first AI agent ecosystem.
slug: roadmap
---

# Roadmap

Development roadmap for MoltGhost, from core infrastructure to a full privacy-first AI agent ecosystem.

---

## Phase 1. Genesis ✅

The foundation phase. Core infrastructure is live with a working demo of private AI agent deployment.

- **Agent Pod Infrastructure.** Isolated compute environment for running private AI agents, each deployed on dedicated hardware with full resource ownership.
- **GPU Provisioning.** Docker-based provisioning on selectable GPUs. Agents are deployed and ready in approximately 7 minutes.
- **Local LLM Support.** Initial support for running local models, starting with Qwen3:8B. All inference runs entirely inside the Agent Pod with no external API calls.
- **Deployment Demo.** Live demonstration of the full deployment flow, from agent creation to running a local LLM on provisioned GPU hardware.
- **Documentation Site.** Complete platform documentation covering architecture, modules, and all planned features.

---

## Phase 2. Launch & Dashboard

Token launch and the introduction of App Manager, a unified dashboard for managing every aspect of your agents.

- **Token Launch.** Official token launch to support the MoltGhost ecosystem and platform economy.
- **App Manager.** All-in-one dashboard UI for full agent lifecycle management. Deploy, monitor, configure, and control all agents from a single interface.
- **Enhanced Provisioning Speed.** Significant improvements to provisioning time, reducing deployment from minutes to faster turnaround through optimized infrastructure.
- **Pre-Built Base Images.** Ready-to-deploy Docker images with bundled features and dependencies. No manual setup required, agents ship with everything included out of the box.

---

## Phase 3. Privacy & Multi-Model

Full privacy layer activation and expanded model support with flexible GPU selection.

- **Multi-Model Support.** Swap between multiple local LLMs within a single Agent Pod. Choose the right model for the right task without redeploying.
- **Multi-GPU Selection.** Selectable GPU tiers during provisioning, matched to your model size and performance requirements.
- **Private Skills Integration.** On-chain operations executed inside the Agent Pod with transaction details shielded from public observers via Light Protocol on Solana.
- **Private Skills for Solana Operations.** Extended skill support for Solana-native operations including token transfers, DeFi interactions, and on-chain execution, all privacy-preserving by default.
- **Private Access Integration.** End-to-end encrypted tunnels for secure remote access to agents. No exposed ports, no public endpoints, no third-party routing visibility.
- **Private Backup & Restore Integration.** Encrypted backups to Storj decentralized storage. Agents can be backed up and restored without exposing any data to the platform or storage provider.
- **Private Memory Integration.** Persistent, encrypted memory stored locally inside the Agent Pod. Agents remember context across sessions without leaking data externally.

---

## Phase 4. Payment System

Full integration of the Private Payment layer with a balance-based model for platform usage.

- **Balance System.** Users maintain a credit balance that powers all platform services. Top up your balance and use it across GPU compute, storage, and bandwidth.
- **Pay-Per-Use Consumption.** Usage-based billing for GPU runtime, storage allocation, and network bandwidth. You only pay for what you use.
- **Auto-Stop on Zero Balance.** When your balance runs out, active services are automatically paused. No surprise charges, no debt accumulation. Top up to resume.
- **Crypto Top-Up.** Fund your balance using SOL or supported tokens directly from your wallet. No fiat intermediaries, no KYC friction.
- **Balance Dashboard & Usage Tracking.** Real-time visibility into your balance, spending breakdown, and resource consumption history through the App Manager.

---

## Phase 5. Ecosystem

Expanding MoltGhost beyond the platform into a broader ecosystem through developer tools, partnerships, and community growth.

- **SDK & Developer API.** Public SDK and API for third-party developers to build on top of MoltGhost. Create custom integrations, extend agent capabilities, and connect external services to private agents.
- **Marketing & Brand Expansion.** Broader visibility campaigns to grow the MoltGhost community and establish the platform as the standard for private AI agent infrastructure.
- **Collaboration.** Joint development efforts with other projects in the AI, privacy, and blockchain space to push the boundaries of what private agents can do.
- **Strategic Partnerships.** Partnerships with infrastructure providers, blockchain networks, and AI tooling companies to strengthen the platform and expand its reach.
