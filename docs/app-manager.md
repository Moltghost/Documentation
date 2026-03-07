---
title: App Manager
slug: app-manager
---

# App Manager

The dashboard where you deploy, configure, monitor, and control your agents, all from a single interface.

---

## What is App Manager?

App Manager is MoltGhost's web-based control panel for managing your AI agents. It is the interface where you create new agents, select their GPU and model, configure their runtime, monitor their status, and control their lifecycle: deploy, start, pause, terminate.

Instead of managing agents through command-line tools, SSH sessions, or infrastructure scripts, App Manager provides a visual interface that handles the complexity behind the scenes. You select your options, click deploy, and the platform provisions an Agent Pod with the hardware, runtime, model, and networking you specified. Everything from GPU allocation to Cloudflare Tunnel setup happens automatically.

App Manager is the single entry point for all agent operations. Whether you need to check an agent's status, change its model, trigger a backup, or review its resource usage, you do it through the dashboard. It connects to every layer of the MoltGhost stack (Agent Pods, Agent Runtime, Private Skills, Private Payment, Private Memory, Private Access, and Private Backup) and gives you control over all of them from one place.

---

## Agent Deployment

Deploying a new agent through App Manager is a guided process where you configure the agent's hardware, model, and settings before the platform provisions everything automatically.

| Step | Configuration |
| --- | --- |
| 1. Name & Description | Set the agent's identity and purpose |
| 2. GPU Selection | Choose GPU type and VRAM based on model requirements |
| 3. Model Selection | Pick the LLM to run inside the pod (Llama, Mistral, Qwen, etc.) |
| 4. System Prompt | Define the agent's base instructions and personality |
| 5. Skills Configuration | Enable and configure Private Skills for the agent |
| 6. Access Settings | Set up authentication and access control for the agent's endpoint |
| 7. Deploy | Platform provisions the pod, installs runtime, loads model, establishes tunnel |

Once you click deploy, the platform handles everything: provisioning the GPU on RunPod, setting up the container, installing OpenClaw and Ollama, loading the selected model into VRAM, establishing the Cloudflare Tunnel, and bringing the agent online. You can monitor the progress of each step in real-time through the dashboard.

The entire deployment takes minutes, not hours. When the status changes to Running, your agent is live and accepting requests through its private endpoint.

---

## Agent Controls

App Manager provides direct controls for managing the lifecycle and configuration of each agent.

**Lifecycle Controls:**

- **Start.** Boot a paused agent. The pod re-initializes, loads the model, and starts accepting requests.
- **Pause.** Suspend the agent. Compute resources are released but storage and configuration are preserved.
- **Terminate.** Permanently destroy the agent and its pod. All resources are released and data is deleted unless backed up.
- **Restart.** Stop and re-start the agent with a clean runtime state.

**Configuration Controls:**

- **Change Model.** Swap the LLM without reprovisioning the pod. The new model is pulled and loaded while the pod remains active.
- **Update System Prompt.** Modify the agent's base instructions and personality.
- **Manage Skills.** Enable, disable, or reconfigure Private Skills.
- **Update Access.** Change authentication settings and access control for the agent's endpoint.
- **Trigger Backup.** Manually initiate a Private Backup to Storj.

All changes take effect immediately or after a brief restart, depending on the operation. Model changes require a restart since the new weights need to be loaded into GPU memory. Prompt and skill updates can be applied without downtime.

---

## Monitoring

App Manager provides real-time visibility into each agent's operational status, resource usage, and activity.

| Metric | Description |
| --- | --- |
| Status | Current pod state: Provisioning, Running, Paused, Terminated |
| GPU Usage | Real-time GPU utilization and VRAM consumption |
| CPU & RAM | Compute resource usage for runtime processes |
| Storage | Disk usage for model weights, memory data, and agent files |
| Uptime | How long the agent has been running since last start |
| Request Count | Number of requests processed in the current session |
| Tunnel Status | Cloudflare Tunnel connection health |

The monitoring dashboard updates in real-time so you can see how your agent is performing at any moment. If GPU usage is consistently maxed out, you might need a larger GPU. If storage is filling up, you might need to trigger a backup and clean old data. The metrics give you the information to make informed decisions about your agent's infrastructure.

---

## Multi-Agent Management

App Manager supports managing multiple agents from a single dashboard. Each agent appears as a separate card with its name, status, model, and GPU type visible at a glance.

You can deploy as many agents as you need, each with its own independent configuration. One agent might run Llama 3.1 70B on an H100 for complex reasoning tasks, while another runs Mistral 7B on an L4 for fast lightweight operations. Each agent is a separate pod with separate resources. App Manager just provides a unified view across all of them.

The dashboard lets you quickly compare agents, identify which ones are running or paused, and take bulk actions when needed. If you need to pause all agents to reduce costs, or trigger backups across multiple agents before a migration, App Manager handles it from one interface.

---

## Security

App Manager itself is secured with authentication and access control. Only the account owner can access the dashboard and manage agents. There is no shared admin access, no team accounts with varying permission levels that could lead to unauthorized changes. Your dashboard, your agents, your control.

The dashboard communicates with the MoltGhost platform over encrypted connections. When you issue a command, like deploying an agent or triggering a backup, the command is authenticated, encrypted in transit, and executed on the target pod. At no point does the dashboard have direct access to the agent's internal data like conversation history or wallet keys. It can control the agent's lifecycle and configuration, but it cannot read the agent's private data.

This separation ensures that even the management layer respects the privacy guarantees of the platform. App Manager can tell a pod to start, stop, or back up, but it cannot look inside.
