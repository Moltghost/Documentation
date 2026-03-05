---
title: Local LLM
description: Running Local Language Models
---

# Local LLM Execution

## Overview

MoltGhost executes **language models locally** within each Agent Pod, eliminating external API dependencies.

Models run natively using the Pod's allocated compute (GPU/CPU), delivering autonomous inference with full resource control.

```
External APIs:    Prompt → Network → Provider → Latency + Costs → Response
Local LLM:        Prompt → Pod GPU → 50ms Inference → Response
```

---

## Execution Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         Agent Pod                            │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐                                    │
│  │   Agent Runtime     │                                    │
│  │   (OpenClaw)        │◄────────────── User Requests      │
│  └─────────────────────┘                                    │
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │ Ollama Model Server │──│        Local LLM             │   │
│  │                     │  │  -  7B-405B Parameters       │   │
│  └─────────────────────┘  │  -  Quantized (Q4/Q8)         │   │
│                           │  -  GPU Accelerated           │   │
│                           └─────────────────────────────┘   │
│                                                              │
│  Compute Resources:                                          │
│  ├─ NVIDIA GPU (A100/H100/L40S)                              │
│  ├─ 16-512GB System Memory                                   │
│  └─ NVMe Storage (Model Weights)                             │
└──────────────────────────────────────────────────────────────┘
```

---

## Supported Models & Formats

| Family | Models | Quantization | Max Context | Use Case |
|--------|--------|--------------|-------------|----------|
| **Llama** | 3.1 (8B, 70B, 405B) | Q4_K_M, Q8_0 | 128K | General purpose |
| **Qwen** | 2.5 (7B, 32B, 72B) | Q4_K_S, Q6_K | 32K | Multilingual |
| **Mistral** | Nemo (12B), Mixtral 8x22B | Q4_K_M | 128K | Tool calling |
| **Phi-3** | Mini (3.8B), Medium (14B) | Q8_0 | 128K | Fast inference |

**Model Selection at Deploy:**

```bash
moltghost deploy my-agent --model llama3.1-70b-q4 --context 32k
```

---

## Inference Pipeline

```
User Request → Agent Runtime → Plan Reasoning → Model Inference → Response
```

**Performance Metrics (A100 GPU):**

| Model | Tokens/sec | TTFT | Latency (1K tokens) |
|-------|------------|------|---------------------|
| 7B Q4 | 150+ | 200ms | 8s |
| 70B Q4 | 45+ | 800ms | 25s |
| 405B Q4 | 12+ | 2.5s | 90s |

---

## Resource Allocation

**Dynamic scaling** based on model requirements:

| Model Size | GPU | Memory | Storage |
|------------|-----|--------|---------|
| **7B-13B** | 1×L40S | 24GB | 10GB |
| **30B-70B** | 1×A100 | 80GB | 50GB |
| **100B+** | 2×H100 | 160GB+ | 200GB+ |

```
Model Weights → Quantized → GPU Memory → Inference Ready
Llama3.1-70B: 140GB raw → 38GB Q4_K_M → Runs on 80GB Pod
```

---

## Multi-Level Isolation Benefits

```
Agent A (Llama 70B) → Pod A → Independent GPU + Memory
Agent B (Qwen 32B)  → Pod B → Independent GPU + Memory
Agent C (Mistral 12B) → Pod C → Independent GPU + Memory
```

**Guaranteed Isolation:**

- ✅ No inference queue contention
- ✅ Independent scaling
- ✅ Zero cross-agent interference
- ✅ Private model deployments

---

## Model Management Lifecycle

When a Pod starts, models are loaded and prepared for inference:

1. **Select Model** - Choose from supported models
2. **Download Weights** - Fetch pre-trained parameters
3. **Quantization** - Convert to efficient format (Q4/Q8)
4. **GPU Load** - Allocate VRAM and load weights
5. **Inference Ready** - Agent can process requests

**Operations:**

```bash
# Update model without downtime
moltghost agent update my-agent --model qwen2.5-72b-q4

# Scale compute
moltghost agent scale my-agent --gpu h100 --memory 160gb
```

---

## Summary

**Local LLMs unlock production autonomy:**

✅ **Native GPU acceleration** (no API hops)  
✅ **20+ supported models** with quantization  
✅ **Predictable performance** + cost control  
✅ **Complete isolation** per agent  
✅ **Dynamic model updates** and scaling  

**Result:** Agents reason and act independently using dedicated, local intelligence.

**Pro Tip:** Start with 7B-13B models for development, scale to 70B+ for production reasoning.
