---
title: Introduction
description: Get started with MoltGhost documentation
---

# Introduction

MoltGhost is a platform for running AI agents in isolated compute environments.

Each agent runs inside a dedicated environment called an Agent Pod. An Agent Pod provides the compute resources and runtime required for independent operation.

This architecture ensures agents do not share runtime environments, models, or compute resources. By isolating each agent, MoltGhost maintains clear boundaries around execution environments, model inference, and data.

---

## Purpose

MoltGhost delivers the infrastructure to deploy and manage AI agents that require dedicated compute and local model execution.

The platform automates the full agent lifecycle—from creation to termination—enabling users to operate agents without manual infrastructure configuration.

---

## Key Characteristics

MoltGhost is built around these core characteristics:

### Agent Isolation
Each agent runs in its own Agent Pod, fully separating compute resources, runtime processes, and data.

### Dedicated Runtime Environment
Every agent uses a self-contained runtime with the necessary framework, model runtime, and tools.

### Local Model Execution
Language models execute locally in the Agent Pod via a dedicated runtime, eliminating external API dependencies and keeping inference isolated.

### Managed Access
Agents expose secure, managed endpoints through the MoltGhost platform, allowing interactions without exposing underlying compute.

---

## System Overview

Here's a simplified flow of the MoltGhost system:

```
User
  ↓ (deploys via API/endpoints)
MoltGhost Platform
  ↓ (provisions & orchestrates)
Agent Pod
  ↓ (isolated environment)
Agent Runtime
  ↓ (processes input, reasoning, tools)
Local LLM
  ↑ (returns results)
```

Users deploy agents through the MoltGhost platform. The platform provisions an Agent Pod, launches the agent runtime, and loads the specified language model.

Once active, the agent processes inputs, performs reasoning, executes tools, and delivers results—all within its isolated environment.

---

## Documentation Structure

This documentation is organized into key sections:

- **Core Concepts** — Fundamental components of the MoltGhost system.
- **Features** — Platform capabilities for agents and users.
- **Guides** — Step-by-step instructions for deploying and managing agents.
- **Agent Lifecycle** — Processes for creating, starting, stopping, and terminating agents.

These sections provide a comprehensive guide to MoltGhost operations and agent management.
