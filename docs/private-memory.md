---
title: Private Memory
slug: private-memory
---

# Private Memory

Local memory storage that keeps all agent context, conversation history, and learned knowledge inside the pod — never shared, never uploaded.

---

## What is Private Memory?

Private Memory is MoltGhost's local storage system for everything an agent knows and remembers. Conversation history, user context, learned preferences, task state, and accumulated knowledge are all stored inside the Agent Pod's local disk. Nothing is sent to external servers, cloud databases, or shared memory pools.

Most AI platforms store conversation history on their own servers. Your prompts, responses, and context windows pass through third-party infrastructure where they can be logged, analyzed, or used for model training. Private Memory eliminates this entirely. The agent's memory lives on the same machine where it runs — inside the pod, on the pod's own storage, accessible only to that agent.

This means your agent's memory is as private as the agent itself. No one else can read what your agent remembers, search through its conversation history, or access the context it has built up over time. The memory belongs to you and your agent — no one else.

---

## Memory Types

Private Memory supports different types of data that agents accumulate during operation. Each type serves a different purpose and has different retention characteristics.

| Type | Description | Persistence |
| --- | --- | --- |
| Conversation History | Complete chat logs between users and the agent | Persistent across sessions |
| Context Window | Active working memory used during a single conversation | Session-scoped |
| Long-Term Knowledge | Facts, preferences, and patterns learned over time | Persistent, grows over time |
| Task State | Progress data for ongoing multi-step tasks | Persistent until task completion |
| User Profiles | Preferences and behavioral patterns per user | Persistent, updated continuously |

Conversation History stores every interaction the agent has had. This allows the agent to reference past conversations, recall decisions it made, and maintain continuity across sessions. Unlike cloud AI services that may truncate or discard old conversations, Private Memory retains the full history on local storage.

Long-Term Knowledge is what makes an agent improve over time. As the agent interacts with users and processes information, it can extract and store facts, preferences, and patterns that inform future responses. This knowledge accumulates inside the pod and is never shared with other agents or uploaded to any central system.

---

## How Memory Works

When a user sends a message to the agent, the runtime processes it through several memory-related steps before and after generating a response.

Before the LLM generates a response, the runtime retrieves relevant context from memory. This includes recent conversation history, any long-term knowledge that relates to the current query, and the user's profile data. This context is assembled and passed to the model alongside the user's message, giving the LLM the information it needs to generate an informed, personalized response.

After the response is generated, the runtime updates memory with the new interaction. The conversation turn is appended to history, any new facts or preferences are extracted and stored in long-term knowledge, and the user's profile is updated if new behavioral patterns are detected.

This cycle — retrieve, reason, store — repeats for every interaction. Over time, the agent builds a rich, detailed understanding of its users and its domain, all stored locally inside the pod.

---

## Memory Storage

All memory data is stored on the Agent Pod's persistent disk. This is the same local storage that holds model weights, runtime configuration, and agent data. Memory is stored in structured formats that allow fast retrieval and efficient search.

The storage layer supports both simple key-value retrieval and semantic search. When the runtime needs to find relevant memories for a query, it can search by exact match, time range, or semantic similarity — finding memories that are conceptually related to the current conversation even if they use different words.

Storage is persistent across pod restarts. If a pod is paused and resumed, all memory data remains intact. The agent picks up exactly where it left off, with full access to its conversation history, learned knowledge, and task state. Memory is only lost if the pod is terminated without a backup.

---

## Memory Isolation

Private Memory follows the same isolation model as every other component in the Agent Pod. Each agent's memory is completely independent and inaccessible to other agents.

There is no shared memory pool, no centralized knowledge base, and no cross-agent memory access. Agent A cannot read Agent B's conversation history, search its knowledge base, or access its user profiles. The memory storage is bound to the pod's local disk, and the pod's disk is not shared with any other pod.

This isolation extends to MoltGhost itself. The platform does not have access to your agent's memory. There is no admin panel that can browse conversation histories, no analytics pipeline that processes agent interactions, and no mechanism for extracting memory data from a running pod. The memory is yours — it exists only inside your pod and is accessible only through your agent.

---

## Memory & Privacy Skills

Private Memory integrates directly with Private Skills to support memory-dependent operations. When an agent uses Browse Private to fetch web content, the retrieved data is stored in memory for future reference. When Code Execute Private processes a dataset, the results are persisted in memory so the agent can reference them later.

For blockchain operations, Private Memory stores transaction receipts and payment history locally. When an agent makes a payment through Send Private, the transaction confirmation is saved in memory — but only inside the pod. There is no external transaction log or payment history database. The agent's financial memory is as private as its financial operations.

This integration means the agent's memory reflects everything it has done — every conversation, every web page browsed, every transaction made — without any of that history leaving the pod.

---

## Backup & Recovery

Private Memory is included in Private Backup operations. When a backup is triggered, the agent's complete memory state — conversation history, long-term knowledge, user profiles, and task state — is encrypted and stored on Storj decentralized storage.

If a pod is terminated or needs to be migrated, the memory can be restored from the backup to a new pod. The agent resumes with its full memory intact, as if it had never been interrupted. The backup and restore process is covered in detail on the Private Backup page.

The backup is encrypted before it leaves the pod, ensuring that memory data remains private even in transit and at rest on external storage. No one — including MoltGhost and Storj — can read the backed-up memory data without the encryption keys, which are held only by the pod owner.
