---
title: Agent Pod
description: Understanding Agent Pods
---

# Agent Pod

A dedicated compute environment where a single AI agent runs in full isolation.

---

## What is an Agent Pod?

An Agent Pod is an isolated virtual machine provisioned for one AI agent. Each pod has its own GPU, runtime, model, and storage. Nothing is shared between agents.

**1 Agent = 1 Pod.**

Every agent gets a dedicated machine with its own compute, runtime stack, and private data. This guarantees full isolation between agents at every level. There is no multi-tenancy, no shared memory, and no cross-agent resource contention.

This design means that one agent's workload can never affect another. If Agent A is running a complex multi-step task that maxes out the GPU, Agent B continues operating normally on its own separate pod with its own dedicated resources. Each agent operates as if it is the only thing running on the machine, because it is.

---

## What's Inside a Pod

Each Agent Pod contains a complete stack of components needed to run an autonomous AI agent. These components are bundled together inside the pod and operate as a single unit.

- **Compute.** Dedicated GPU and CPU for model inference and processing.
- **Agent Runtime (OpenClaw).** Executes agent logic, tools, and workflows.
- **Model Runtime (Ollama).** Runs LLM models locally inside the pod.
- **Storage.** Persistent disk for model weights, agent data, and backups.
- **Networking (Cloudflare Tunnel).** Secure private access without exposing ports.

The compute layer provides the raw hardware that powers everything else. The GPU handles model inference while the CPU manages the runtime processes, container orchestration, and tool execution. Storage is persistent across restarts, so model weights and agent data are preserved even when the pod is paused.

Networking is handled entirely through Cloudflare Tunnel. The pod does not expose any ports to the public internet. Instead, all traffic is routed through a secure tunnel that connects the agent to the outside world without revealing the pod's actual network address.

---

## Available GPU Types

Agent Pods are powered by RunPod infrastructure. The GPU you choose determines what size models your agent can run and how fast inference will be. Larger models with more parameters require GPUs with more VRAM to load the weights into memory.

| GPU | VRAM |
| --- | --- |
| NVIDIA A30 | 24 GB |
| NVIDIA A40 | 48 GB |
| NVIDIA A100 PCIe | 80 GB |
| NVIDIA A100 SXM | 80 GB |
| NVIDIA L4 | 24 GB |
| NVIDIA L40 | 48 GB |
| NVIDIA L40S | 48 GB |
| NVIDIA H100 PCIe | 80 GB |
| NVIDIA H100 SXM | 80 GB |
| NVIDIA H100 NVL | 94 GB |
| NVIDIA H200 SXM | 141 GB |
| NVIDIA H200 NVL | 143 GB |
| NVIDIA B200 | 180 GB |
| NVIDIA B300 | 288 GB |
| NVIDIA RTX 4090 | 24 GB |
| NVIDIA RTX 5090 | 32 GB |
| NVIDIA RTX 6000 Ada | 48 GB |
| AMD Instinct MI300X | 192 GB |

GPU selection depends on the model size and workload requirements of the agent. For lightweight agents running 7B–8B models, a GPU with 24 GB of VRAM is sufficient. For production agents running 70B+ models, you will need 80 GB or more. See the Agent Models page for detailed model-to-GPU mapping.

---

## Pod Lifecycle

Each Agent Pod transitions through a series of states from creation to termination. Understanding these states helps you manage compute costs and agent availability.

| State | Description |
| --- | --- |
| Provisioning | Pod is being created and resources allocated |
| Running | Agent is active and processing requests |
| Paused | Compute suspended, state and storage preserved |
| Terminated | Pod and all resources destroyed |

When you deploy a new agent, the pod enters the Provisioning state while the virtual machine is created and the GPU is allocated. Once the hardware is ready, the runtime boots and the pod moves to Running. At this point, the agent is online and accepting requests.

If you want to temporarily stop an agent without losing its configuration and data, you can pause the pod. In the Paused state, compute resources are released but storage is preserved. Your model weights, agent data, and configuration remain intact. When you resume the pod, it goes through the initialization process again and returns to Running.

Terminating a pod permanently destroys all associated resources including storage. This action cannot be undone, so any data that has not been backed up will be lost.

---

## Isolation Model

Agent Pods enforce isolation at every layer of the stack. This is not just process-level separation. It is full machine-level isolation where each agent runs on its own dedicated hardware.

- **Compute Isolation.** Dedicated GPU and CPU per agent. No shared processing resources.
- **Runtime Isolation.** Separate container and process space. Each agent runs in its own environment.
- **Data Isolation.** Private storage with no shared filesystem. One agent cannot access another agent's data.
- **Network Isolation.** Managed endpoints via Cloudflare Tunnel. No ports are exposed and no direct network access between pods.

This multi-layer isolation model ensures that agents are completely independent from each other. There is no way for one agent to interfere with, observe, or access the resources of another agent. Each pod is a self-contained unit that operates on its own hardware, runs its own processes, stores its own data, and communicates through its own secure tunnel.
