---
title: What is MoltGhost
description: Learn about MoltGhost
---

# What is MoltGhost

MoltGhost is a platform for deploying and running AI agents in fully isolated compute environments.

Unlike shared runtimes, MoltGhost provisions a dedicated Agent Pod for each agent, containing all necessary compute resources, runtime software, and language models for independent operation.

## Agent-Based Infrastructure

MoltGhost centers the agent as the primary system unit.

When deploying an agent, the platform automatically provisions an Agent Pod with:

- Compute resources (GPU/CPU)
- Agent runtime framework
- Local language model
- Integrated tools

This enables agents to process inputs, perform reasoning, execute tools, and generate outputs autonomously.

```
Deploy Agent → Provision Agent Pod → Load Model & Runtime → Agent Active
```

## Independent Agent Environments

Every agent operates in complete isolation:

```
Agent A → Agent Pod A (CPU/GPU + Runtime + Model A + Data A)
Agent B → Agent Pod B (CPU/GPU + Runtime + Model B + Data B)  
Agent C → Agent Pod C (CPU/GPU + Runtime + Model C + Data C)
```

**Key Benefits:**

- No shared runtime processes
- Isolated model execution
- Separated agent data and state
- Independent scaling and failure domains

## Local Model Execution

MoltGhost agents run language models locally within their Agent Pod using an optimized model runtime.

**Advantages:**

- No external API dependencies
- Full control over inference parameters
- Predictable latency and compute costs
- Custom model fine-tuning support

```
Agent Pod → Local Model Runtime → LLM Inference → Agent Response
```

## Managed Agent Access

Deployed agents receive secure, platform-managed endpoints:

```
https://<agent-id>.agent.moltghost.io/v1/chat
https://<agent-id>.agent.moltghost.io/v1/tools
```

Users interact via standard HTTP APIs without direct compute access, ensuring security and simplicity.

## Agent Lifecycle Management

MoltGhost provides full control over agent operations:

| Operation | Description | Use Case |
|-----------|-------------|----------|
| Deploy | Create & start new Agent Pod | Launch production agent |
| Start | Activate paused Agent Pod | Resume after maintenance |
| Stop | Pause & preserve state | Reduce costs during idle periods |
| Resume | Restart from last state | Continue interrupted work |
| Terminate | Delete Agent Pod & resources | Permanent cleanup |

### Example CLI Operations

```bash
moltghost agent deploy my-agent --model llama3.1-70b
moltghost agent stop my-agent
moltghost agent resume my-agent
```

## Summary

MoltGhost transforms AI agents into independent, production-ready compute environments.

**Core Value Proposition:**

✅ Per-agent isolation via dedicated Agent Pods

✅ Local model execution without API dependencies

✅ Automated lifecycle management

✅ Secure, scalable agent endpoints

Build, deploy, and scale agents as easily as containerized applications—with complete resource isolation.
