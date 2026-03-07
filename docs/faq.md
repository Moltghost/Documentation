---
title: "FAQ"
slug: faq
---

# FAQ

Answers to the most common questions about MoltGhost.

---

## General

### What is MoltGhost?

MoltGhost is a private AI agent infrastructure platform. It lets you deploy autonomous AI agents that run on dedicated hardware with full privacy. Your data, models, and operations stay inside your own isolated environment and are never shared with anyone.

### How is MoltGhost different from other AI platforms?

Most AI platforms run your prompts through shared servers where the provider can see your data. MoltGhost gives each agent its own dedicated GPU, its own runtime, and its own storage inside an isolated Agent Pod. Nothing is shared between agents, and MoltGhost itself cannot access your agent's data.

### Do I need technical knowledge to use MoltGhost?

No. App Manager provides a visual dashboard where you can deploy, configure, and manage agents without touching any code or command-line tools. You select your GPU, model, and settings, and the platform handles the rest.

---

## Agent Pods

### What is an Agent Pod?

An Agent Pod is an isolated virtual machine with a dedicated GPU where your AI agent runs. Each pod contains the full stack: compute, runtime, model, storage, and networking. One agent per pod, no sharing.

### What GPUs are available?

MoltGhost supports a wide range of NVIDIA and AMD GPUs through RunPod, from the RTX 4090 (24 GB VRAM) up to the B300 (288 GB VRAM). See the Agent Pod page for the full list.

### Can I change the GPU after deployment?

Yes. You can change the GPU through App Manager, but it requires reprovisioning the pod. Your data is preserved if you have a backup.

### What happens when I pause a pod?

Compute resources (GPU, CPU) are released to stop billing, but your storage and configuration are preserved. When you resume, the pod re-initializes and your agent comes back online with its data intact.

---

## Models

### What models can I run?

MoltGhost supports open-source models through Ollama, including Llama 3.1 (8B/70B/405B), Mistral 7B, Mixtral 8x7B, Qwen 2.5 (7B/72B), DeepSeek V2, Gemma 2, and Phi-3. See the Agent Models page for the full list.

### Can I use GPT-4 or Claude?

No. MoltGhost runs models locally inside the pod to guarantee privacy. Using external API-based models would send your data to third-party servers, which defeats the purpose of the platform.

### Can I switch models without losing data?

Yes. You can change the model through App Manager. The new model is pulled and loaded while the pod remains provisioned. Your memory, configuration, and wallet state are unaffected.

---

## Privacy & Security

### Can MoltGhost see my data?

No. All data (conversations, memory, wallet keys, files) stays inside your Agent Pod. MoltGhost does not have access to the contents of your pod. The platform can control the pod's lifecycle (start, stop, backup) but cannot read its internal data.

### How does networking work without exposing ports?

Each pod connects to the internet through a Cloudflare Tunnel. The pod initiates an outbound connection to Cloudflare's edge. No ports are opened, no public IP is exposed. All traffic flows through the encrypted tunnel.

### Are my blockchain transactions private?

Yes. Private Skills wrap every Solana operation in privacy-preserving mechanisms that hide addresses, amounts, and transaction links. The transactions settle on-chain but the details are hidden from public observers.

---

## Payments

### How do payments work?

MoltGhost uses Solana for payments, with the x402 protocol for machine-to-machine transactions and Privacy Cash with zero-knowledge proofs for shielded transfers. All payment operations go through Private Skills to maintain privacy.

### What tokens are supported?

SOL and SPL tokens on Solana. Agents can hold both standard and shielded (Privacy Cash) balances.

---

## Backups

### Where are backups stored?

Backups are stored on Storj decentralized storage. Data is encrypted inside the pod before upload, then fragmented and distributed across Storj's network of independent storage nodes.

### Can MoltGhost or Storj read my backups?

No. Backups are encrypted with keys that only exist inside your pod. Neither MoltGhost nor Storj has the decryption keys. Without them, the backed-up data is unreadable.

### What happens if I lose my encryption keys?

The backup becomes permanently unrecoverable. This is by design, as the system prioritizes privacy over convenience. Always ensure your keys are preserved before terminating a pod.

---

## Getting Started

### How do I deploy my first agent?

Go to App Manager, click deploy, choose your GPU and model, set your system prompt, and click deploy. The platform provisions everything automatically. Your agent will be online in minutes.

### Is there a free tier?

Check the Token Info page for the latest information on pricing and token utility.

### Where can I get help?

Visit the Socials & Links page for community channels and support resources.
