---
title: Private Skills
slug: private-skills
---

# Private Skills

Built-in tools that give OpenClaw the ability to act, from blockchain transactions to web browsing, with privacy as the default.

---

## What are Private Skills?

Private Skills are the built-in tools that ship with every MoltGhost agent. They give OpenClaw the ability to take real actions in the world, from sending tokens and browsing the web to executing code and calling APIs, while keeping all activity private by default.

Without skills, an agent can only think and generate text. Private Skills are what turn it into an autonomous agent that can actually do things. Every skill runs locally inside the Agent Pod, and any outbound traffic is routed through Cloudflare Tunnel so the agent's identity and origin are never exposed.

These are not third-party plugins or user-created extensions. Private Skills are core components of the MoltGhost platform, built directly into OpenClaw and maintained as part of the runtime stack. They are designed from the ground up to ensure that every action an agent takes, whether on-chain or off-chain, preserves the user's privacy.

---

## Blockchain Skills

Blockchain Skills allow agents to interact with the Solana network while keeping transaction details hidden from public observers. Every on-chain operation is routed through a privacy layer that shields addresses, amounts, and transaction links.

| Skill | Description |
| --- | --- |
| Send Private | Transfer tokens to a recipient without exposing amount or addresses on-chain |
| Receive Private | Generate a private receiving endpoint that shields incoming transactions |
| Swap Private | Exchange tokens through privacy-routed swaps that hide trade details |
| Stake Private | Delegate tokens to validators without revealing staking positions |
| Bridge Private | Move assets cross-chain with shielded source and destination |
| Contract Call Private | Interact with Solana programs without exposing call parameters |

Without these skills, every transaction an agent makes would be fully visible on Solana's public ledger. Anyone could trace the agent's wallet, see every transfer, and analyze its financial behavior. Blockchain Skills solve this by constructing shielded transactions that settle on-chain but keep the specifics hidden from third parties.

The agent does not need to understand privacy protocols or cryptographic primitives. From the LLM's perspective, it simply calls Send Private with a recipient and amount, and receives a confirmation. The privacy mechanics are handled entirely by the skill's internal logic.

---

## General Skills

General Skills handle everyday operations that agents need to interact with the outside world and process data. All execution happens inside the pod, and any external communication is routed through Cloudflare Tunnel to hide the agent's origin.

| Skill | Description |
| --- | --- |
| Browse Private | Fetch and parse web pages without revealing the agent's identity to target sites |
| Search Private | Perform web searches with anonymized queries that cannot be traced back to the agent |
| Code Execute Private | Run scripts and commands in a sandboxed environment inside the pod |
| File Manager Private | Read, write, and process files on pod storage with no external exposure |
| Database Private | Query and manage local data stores entirely within the pod boundary |
| API Call Private | Call external REST and GraphQL APIs through Cloudflare Tunnel with hidden origin |

General Skills are private in two ways. First, the data they process never leaves the pod. Files, database records, and code execution results stay on local storage. Second, when a skill does reach out to an external service, the request is routed through Cloudflare Tunnel so the target cannot identify the agent or trace the request back to the pod's actual network address.

This means an agent can browse websites, call APIs, and search the web without leaving a trail that connects the activity back to its owner.

---

## How Private Skills Work

When a user sends a request that requires action, the LLM decides which skill to call based on the task at hand. It generates a structured tool call with the skill name and parameters, and OpenClaw handles the rest: validating inputs, executing the skill, and returning the result.

For blockchain operations, the skill constructs a shielded transaction through the privacy layer before submitting it to the Solana network. The transaction settles on-chain as a real operation, but the sender, receiver, and amount are hidden from public view. The LLM receives a confirmation and continues reasoning.

For general operations, the skill executes locally inside the pod. If the operation requires outbound communication, like fetching a web page or calling an API, the request routes through Cloudflare Tunnel. The skill returns the result to the LLM, which can then process the data, call another skill, or generate a response.

Skills can be chained naturally through the agent's reasoning. An agent might browse a website to gather data, process it with Code Execute Private, store results with File Manager Private, and then send a payment with Send Private, all in a single conversation. The LLM orchestrates the chain autonomously, passing each skill's output into the next reasoning step.

---

## Privacy Mechanics

Private Skills enforce privacy through different mechanisms depending on the type of operation.

**Blockchain Privacy:**

- **Address Shielding.** Sender and receiver addresses are not directly linked on-chain. The skill breaks the public connection between the agent's wallet and the counterparty.
- **Amount Hiding.** Transaction values are concealed from ledger observers. The chain confirms the transaction is valid, but the amount is not publicly visible.
- **Transaction Unlinkability.** Operations by the same agent cannot be easily correlated through on-chain analysis. Each skill call produces an independent transaction footprint.

**General Privacy:**

- **Origin Hiding.** All outbound requests route through Cloudflare Tunnel. External services see the tunnel endpoint, not the pod's actual address.
- **Query Anonymization.** Search and browse operations strip identifying metadata before reaching external services.
- **Local Execution.** Code, file, and database operations run entirely inside the pod with zero external exposure.

Privacy is not an optional mode. It is the default behavior for every skill invocation. There is no "public mode" toggle. Every action an agent takes through Private Skills is automatically wrapped in the appropriate privacy layer for that operation type.

---

## Skill Execution Flow

Every Private Skill follows the same execution flow regardless of whether it is a blockchain or general operation.

1. **Intent.** The LLM determines an action is needed based on the user's request.
2. **Tool Call.** The model outputs a structured call to the appropriate skill with required parameters.
3. **Validation.** OpenClaw validates parameters and checks prerequisites (wallet balance, file existence, etc.).
4. **Privacy Wrapping.** The skill applies the appropriate privacy mechanism for the operation type.
5. **Execution.** The operation runs: transaction submitted to Solana, web page fetched, code executed, etc.
6. **Result.** The skill returns the outcome to the LLM as context for the next reasoning step.
7. **Response.** The agent continues reasoning or delivers a final response to the user.

The entire flow executes inside the Agent Pod. Private keys, wallet state, execution results, and intermediate data never leave the pod boundary. If an operation fails, the error is returned to the LLM, which can decide to retry, adjust, or inform the user.

---

## Isolation & Security

Private Skills operate within the same isolation model as everything else in the Agent Pod. Wallet keys are stored on the pod's local storage and never transmitted externally. Skill execution happens in the pod's runtime process, and all signing and computation occurs on the pod's dedicated hardware.

Each agent has its own independent set of Private Skills. One agent cannot access another agent's wallet, invoke another agent's skills, or observe another agent's activity. The multi-layer isolation of Agent Pods extends fully to skill execution. Compute, data, and network are all separated at the machine level.

Because Private Skills are built into OpenClaw rather than loaded as external plugins, they are audited and maintained as part of MoltGhost's core stack. There is no risk of third-party skill code accessing wallet keys or leaking data. The skills are native components of the runtime that follow the same security standards as the rest of the platform.
