---
title: Agent Pod
description: Understanding Agent Pods
---

# Agent Pod

## Overview

An **Agent Pod** is the foundational compute environment where a single AI agent executes. 

Each Agent Pod delivers dedicated resources and runtime isolation, ensuring agents operate independently without sharing infrastructure.

**Core Principle: 1 Agent = 1 Agent Pod**

```
Agent A → Agent Pod A (GPU + Runtime + Model A + Data A)
Agent B → Agent Pod B (GPU + Runtime + Model B + Data B)
Agent C → Agent Pod C (GPU + Runtime + Model C + Data C)
```

---

## Pod Architecture

```
┌─────────────────────────────────────┐
│              Agent Pod              │
├─────────────────────────────────────┤
│  ┌──────────────────────────────┐   │
│  │         Container            │   │
│  │  ┌─────────────────────┐     │   │
│  │  │   Agent Runtime     │     │   │
│  │  │   (OpenClaw)        │     │   │
│  │  ├─────────────────────┤     │   │
│  │  │   Model Runtime     │     │   │
│  │  │   (Ollama)          │     │   │
│  │  ├─────────────────────┤     │   │
│  │  │   Local LLM         │◄────┼───│← Model Weights
│  │  └─────────────────────┘     │   │
│  │  ├─────────────────────┤     │   │
│  │  │   Agent Tools       │     │   │
│  │  └─────────────────────┘     │   │
│  └──────────────────────────────┘   │
├─────────────────────────────────────┤
│  Compute: GPU/CPU                    │
│  Memory: 16-128GB                    │
│  Storage: 50GB+ Persistent           │
│  Networking: Managed Endpoints       │
└─────────────────────────────────────┘
```

---

## Compute Resources

Agent Pods provision tailored compute based on agent requirements:

| Resource | Purpose | Configuration Options |
|----------|---------|----------------------|
| **GPU** | Model inference acceleration | A100, H100, L40S |
| **CPU** | Runtime processing | 4-32 vCPU |
| **Memory** | Model loading + context | 16GB-512GB |
| **Storage** | Model weights + agent data | 50GB-2TB NVMe |
| **Networking** | Secure API endpoints | 1-10Gbps |

Resources scale dynamically based on deployment configuration.

---

## Runtime Environment

The Agent Pod container orchestrates:

1. **Agent Framework** (OpenClaw) - Handles request processing and tool execution
2. **Model Runtime** (Ollama) - Manages local LLM inference
3. **Local LLM** - Loaded model weights for autonomous reasoning
4. **Tools** - Custom functions and integrations

```
Pod Start → Load Framework → Initialize Model → Agent Ready → Process Requests
```

---

## Multi-Level Isolation

Agent Pods enforce comprehensive isolation:

```
┌─────────────────────────────┐
│  COMPUTE ISOLATION          │ ← Dedicated hardware allocation
├─────────────────────────────┤
│  RUNTIME ISOLATION          │ ← Separate container processes
├─────────────────────────────┤
│  DATA ISOLATION             │ ← Private storage + memory
├─────────────────────────────┤
│  NETWORK ISOLATION          │ ← Managed endpoints only
└─────────────────────────────┘
```

**Zero shared state** between agents prevents interference, data leakage, and resource contention.

---

## Pod Lifecycle

```
Deploy Agent → Create Pod → Pod Running → (Start/Stop/Resume) → Terminate Agent → Destroy Pod
```

| State | Description | Resources |
|-------|-------------|-----------|
| **Provisioning** | Pod creation in progress | Billed |
| **Running** | Agent active and processing | Fully billed |
| **Paused** | State preserved, compute suspended | Storage only |
| **Terminated** | Pod + resources destroyed | None |

---

## Summary

**Agent Pods power MoltGhost's isolation model** by providing each agent with:

✅ Dedicated compute (GPU/CPU/Memory/Storage)  
✅ Isolated runtime (OpenClaw + Ollama)  
✅ Local model execution  
✅ Multi-level isolation guarantees  
✅ Full lifecycle control  

Agent Pods enable production-grade AI agents that scale independently without infrastructure conflicts.
