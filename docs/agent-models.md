---
title: Agent Models
description: Local models that power MoltGhost agents
slug: agent-models
---

# Agent Models

Open-source language models that run locally inside each Agent Pod. All inference happens on the pod's GPU — no data is ever sent to external providers.

---

## What are Agent Models?

Agent Models are the LLMs that give each agent the ability to reason, plan, and generate responses. Unlike cloud-based AI services that route your prompts through third-party servers, MoltGhost runs every model locally inside the agent's own pod using Ollama.

This means your prompts, context, and outputs never leave the pod. There are no API calls to OpenAI, Anthropic, or any other external provider. The model runs directly on the GPU allocated to your agent, and the weights are stored on the pod's local disk.

Each agent has its own dedicated model instance. Models are not shared across agents — when you deploy an agent with a specific model, that model is loaded into GPU memory exclusively for that agent. This guarantees consistent performance and complete data isolation between agents.

---

## Supported Models

MoltGhost supports a wide range of open-source models through Ollama. You can choose the model that best fits your agent's workload and the GPU available in your pod.

| Model | Parameters | Min VRAM | Context Length | Best For |
| --- | --- | --- | --- | --- |
| Llama 3.1 | 8B | 8 GB | 128K | Lightweight tasks, fast response |
| Llama 3.1 | 70B | 48 GB | 128K | General purpose, balanced performance |
| Llama 3.1 | 405B | 180 GB | 128K | Maximum reasoning capability |
| Mistral | 7B | 8 GB | 32K | Fast inference, tool calling |
| Mixtral | 8x7B | 48 GB | 32K | Multi-expert reasoning |
| Qwen 2.5 | 7B | 8 GB | 32K | Multilingual, code generation |
| Qwen 2.5 | 72B | 48 GB | 32K | Complex multilingual tasks |
| DeepSeek V2 | 67B | 48 GB | 128K | Code and reasoning |
| Gemma 2 | 27B | 24 GB | 8K | Efficient mid-range tasks |
| Phi-3 | 14B | 16 GB | 128K | Fast inference, long context |

The list of supported models continues to grow as new open-source models are released and validated for use with Ollama.

---

## Model & GPU Mapping

Choosing the right model depends on the GPU provisioned in your Agent Pod. Larger models require more VRAM to load their weights into memory and run inference efficiently. Below is a general guide for matching models to GPU hardware.

| Model Size | Recommended GPU | VRAM | Example Models |
| --- | --- | --- | --- |
| 7B–8B | NVIDIA L4 / RTX 4090 | 24 GB | Llama 3.1 8B, Mistral 7B, Qwen 2.5 7B |
| 14B–27B | NVIDIA L40 / L40S | 48 GB | Phi-3 14B, Gemma 2 27B |
| 67B–72B | NVIDIA A100 / H100 | 80 GB | Llama 3.1 70B, Qwen 2.5 72B, DeepSeek V2 |
| 405B+ | NVIDIA B200 / H200 | 141–180 GB | Llama 3.1 405B |

If your workload requires fast responses with moderate reasoning, a 7B–8B model on a smaller GPU is a good starting point. For complex tasks that need deep reasoning or multi-step planning, a 70B+ model on a high-end GPU will deliver better results.

Quantization also plays a role. Models can be compressed using formats like Q4 or Q8, which reduce VRAM usage while maintaining most of the model's quality. A quantized 70B model, for example, can fit into 48 GB of VRAM instead of requiring 80 GB at full precision.

---

## How Models Run

When an Agent Pod starts, Ollama initializes and loads the selected model into GPU memory. The model weights are stored on the pod's persistent disk and transferred to VRAM during startup. Once loaded, the model is ready to process requests.

Inference happens entirely on the local GPU. When a request comes in through the Agent Runtime, OpenClaw sends the prompt and context to Ollama, which runs the model and streams tokens back. There is no network hop to an external server — the entire round trip from prompt to response stays inside the pod.

Ollama handles model lifecycle management including loading, unloading, and serving multiple requests. It supports streaming token generation for real-time response delivery, and optimizes GPU utilization to maximize throughput on the available hardware.

Models can be updated or swapped without rebuilding the pod. If you need to switch from Llama 3.1 8B to Qwen 2.5 72B, the new model is pulled and loaded while the pod remains provisioned.

---

## Privacy Guarantees

Agent Models are a core part of MoltGhost's privacy architecture. Because every model runs locally inside the pod, there is no point where your data touches an external service.

Your prompts are never sent to a third-party API. The model weights are stored on your pod's local disk and loaded into your pod's GPU memory. Inference results are generated inside the pod and returned directly to you through a secure Cloudflare Tunnel endpoint.

This is fundamentally different from using hosted AI services where your data passes through provider infrastructure. With MoltGhost, the model is yours, the compute is yours, and the data stays yours — from input to output.

**Pro Tip:** Start with 7B-13B models for development, scale to 70B+ for production reasoning.
