---
title: Agent Runtime
description: Understanding the Agent Runtime
---

# Agent Runtime

The software stack that powers AI agents inside each Agent Pod.

---

## What is Agent Runtime?

Agent Runtime is the execution layer that runs inside every Agent Pod. It combines an agent framework, a local model runtime, and tools into a single stack that handles all agent operations.

The runtime is responsible for everything that happens after a request reaches your agent. It manages how the agent thinks, which tools it uses, and how it generates responses. Without the runtime, a pod would just be an empty machine with a GPU. The runtime is what turns it into a functioning AI agent.

Everything runs locally inside the pod. There are no external API calls, no shared compute resources, and no data leaving the pod boundary. The runtime operates as a self-contained system that processes requests end-to-end within the isolated environment of the Agent Pod.

---

## Runtime Components

The runtime is composed of three core technologies that work together to power every agent:

| Component | Technology | Role |
| --- | --- | --- |
| Agent Framework | OpenClaw | Executes agent logic, reasoning, planning, and tool calls |
| Model Runtime | Ollama | Loads and runs LLM models locally on GPU |
| Tools | Custom Functions | Extends agent capabilities with external actions |

OpenClaw is the brain of the runtime. It receives incoming requests, breaks them down into steps, decides whether tools are needed, and coordinates everything until a final response is ready. It handles reasoning, planning, and orchestration across every interaction.

Ollama is the inference engine. It manages the lifecycle of the local LLM: loading model weights into GPU memory, running inference, and streaming tokens back to OpenClaw. It runs entirely on the pod's dedicated GPU with no external dependencies.

Tools are optional extensions that give agents the ability to take actions beyond text generation. These can include API calls, database queries, file operations, or any custom function that the agent needs to complete a task. Tools are registered with OpenClaw and called dynamically during the reasoning process.

---

## How It Works

When a request reaches an agent, the runtime processes it through a structured pipeline. Each step happens locally inside the pod, and the entire flow completes without any external service involvement.

1. **Receive.** Request arrives via secure Cloudflare Tunnel endpoint.
2. **Plan.** OpenClaw analyzes the input and determines what actions are needed.
3. **Reason.** The local LLM generates reasoning based on context and instructions.
4. **Execute.** If tools are needed, OpenClaw calls them and observes results.
5. **Respond.** Final response is generated and streamed back to the user.

For simple questions, the runtime may skip the tool execution step entirely and go straight from reasoning to response. For complex tasks that require multiple steps, the runtime can loop through the plan-reason-execute cycle several times before producing a final answer.

The entire pipeline runs with zero external dependencies. All reasoning happens on the pod's GPU, all tool execution happens within the pod's network boundary, and all responses are delivered through the secure tunnel without touching any third-party infrastructure.

---

## Initialization

When an Agent Pod starts, the runtime goes through a sequential boot process to bring the agent online. Each step must complete before the next one begins, ensuring the agent is fully ready before it starts accepting requests.

1. **Container Boot.** Pod environment is provisioned and the container starts.
2. **Framework Init.** OpenClaw starts and loads the agent's configuration, including registered tools and system prompts.
3. **Model Server Start.** Ollama launches and initializes on the GPU.
4. **Load Model.** LLM weights are loaded from disk into GPU VRAM.
5. **Ready.** Agent begins accepting and processing requests.

The time it takes to complete initialization depends primarily on the size of the model being loaded. Smaller models like Llama 3.1 8B can be ready in under a minute, while larger models like Llama 3.1 405B may take several minutes as the weights are transferred into VRAM.

Once the initialization is complete, the agent remains running and responsive until it is explicitly paused or terminated. Restarting a paused agent goes through the same boot sequence to ensure a clean state.

---

## Privacy Features Integration

The runtime connects with MoltGhost's privacy features, all running within the same isolated pod. These features are not separate services. They are modules that plug directly into the runtime and operate within the same security boundary.

| Feature | How It Connects to Runtime |
| --- | --- |
| Private Skills | Custom tools and functions loaded into OpenClaw, callable during agent reasoning |
| Private Memory | Conversation history and context stored locally inside the pod |
| Private Backup | Runtime state, model config, and agent data backed up to Storj encrypted |
| Private Access | Requests reach the runtime through Cloudflare Tunnel with no exposed ports |
| Private Payment | Agent processes payments via x402 and Solana without exposing transaction data |
| App Manager | Controls runtime lifecycle from the dashboard: deploy, start, stop, configure |

The runtime is the engine that powers the agent. Privacy features are modules that extend its capabilities while maintaining the same level of isolation and security. Because everything runs inside the same pod, there is no data leakage between components and no external service has access to the agent's internal state.

This integration model ensures that privacy is not an afterthought. It is built into the runtime architecture from the ground up. Every feature that touches the agent operates within the pod boundary, and every piece of data stays under the user's control.
