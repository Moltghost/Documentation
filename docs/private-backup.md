---
title: Private Backup
slug: private-backup
---

# Private Backup

Encrypted backups stored on Storj decentralized storage — your agent's data stays yours, even at rest.

---

## What is Private Backup?

Private Backup is MoltGhost's backup system that preserves an agent's complete state — memory, configuration, wallet, and runtime data — in encrypted form on Storj decentralized storage. If a pod is terminated, migrated, or needs to be recovered, Private Backup allows you to restore the agent to its exact previous state on a new pod.

Traditional backup solutions store your data on centralized cloud providers where the provider has the ability to access, scan, or hand over your data. Private Backup eliminates this risk by encrypting everything inside the pod before it leaves. The encrypted data is then distributed across Storj's decentralized network of storage nodes. No single node holds a complete copy, and no one — including Storj and MoltGhost — can decrypt the data without your keys.

This means your agent's backup is private in the strongest sense. Even if someone gains access to the storage nodes, they get encrypted fragments that are meaningless without the decryption keys held exclusively inside your pod.

---

## What Gets Backed Up

Private Backup captures the complete state needed to fully restore an agent to its exact previous condition.

| Data | Description |
| --- | --- |
| Conversation History | Full chat logs and interaction records |
| Long-Term Knowledge | Learned facts, preferences, and accumulated context |
| User Profiles | Per-user preferences and behavioral patterns |
| Task State | Progress data for ongoing multi-step tasks |
| Wallet State | Token balances, shielded balances, and transaction history |
| Agent Configuration | System prompts, skill settings, and runtime parameters |
| Model Configuration | Selected model, quantization settings, and inference parameters |

The backup is a complete snapshot of the agent. When restored, the agent resumes with its full memory, its wallet balance, its configuration, and its in-progress tasks — as if the pod had never been stopped.

---

## How Backups Work

When a backup is triggered, the process runs entirely inside the Agent Pod before any data leaves the pod boundary.

1. **Snapshot** — The runtime collects all data that needs to be preserved: memory, wallet state, configuration, and task data.
2. **Encryption** — The snapshot is encrypted using keys stored inside the pod. The encryption happens locally — unencrypted data never touches the network.
3. **Fragmentation** — The encrypted snapshot is split into fragments for distribution across Storj's network.
4. **Upload** — Fragments are uploaded to Storj storage nodes through the pod's Cloudflare Tunnel.
5. **Verification** — The backup system confirms that all fragments are stored correctly and the backup is recoverable.

The entire process is designed so that unencrypted agent data exists only inside the pod. By the time data reaches the network, it is already encrypted and fragmented. Even if the network connection were intercepted, an attacker would capture only encrypted fragments that cannot be reassembled without the decryption keys.

---

## Storj Decentralized Storage

MoltGhost uses Storj as the backup storage layer because of its decentralized architecture. Unlike centralized cloud storage where your data sits on servers controlled by a single company, Storj distributes encrypted fragments across a global network of independent storage nodes.

This architecture provides several privacy and security advantages over centralized alternatives:

- **No Single Point of Access** — Your data is fragmented across many nodes. No single node holds enough data to reconstruct any part of your backup.
- **No Provider Access** — Storj cannot read your data. The fragments are encrypted before they leave the pod, and Storj never has the decryption keys.
- **Redundancy** — Fragments are replicated across multiple nodes. If some nodes go offline, the backup remains fully recoverable from the remaining copies.
- **Geographic Distribution** — Fragments are spread across nodes worldwide, eliminating single-region failure risks and jurisdictional data access concerns.

The combination of client-side encryption and decentralized storage means there is no entity — no company, no government, no admin — that can access your agent's backed-up data without your encryption keys.

---

## Encryption

Private Backup uses client-side encryption, meaning all data is encrypted inside the Agent Pod before it is transmitted or stored anywhere. The encryption keys are generated and stored locally on the pod's disk and are never sent to MoltGhost, Storj, or any other external service.

The encryption covers the entire backup payload. Memory data, wallet state, configuration files, and all other backed-up data are encrypted as a single unit. There is no partial encryption — everything that leaves the pod is fully encrypted.

If the encryption keys are lost — for example, if a pod is terminated without a backup of the keys — the backed-up data becomes permanently unrecoverable. This is by design. The system prioritizes privacy over convenience: it is better for data to be unrecoverable than for it to be accessible to unauthorized parties.

---

## Restore Process

Restoring from a backup is the reverse of the backup process. A new Agent Pod is provisioned, the encrypted fragments are downloaded from Storj, reassembled, decrypted, and the agent's state is loaded into the new pod.

1. **Provision** — A new Agent Pod is created with the appropriate GPU and runtime configuration.
2. **Download** — Encrypted fragments are retrieved from Storj storage nodes through the pod's Cloudflare Tunnel.
3. **Reassembly** — Fragments are combined into the complete encrypted backup.
4. **Decryption** — The backup is decrypted using the original encryption keys.
5. **Restore** — Memory, wallet state, configuration, and task data are loaded into the new pod's runtime.
6. **Ready** — The agent boots with its full previous state and begins accepting requests.

After restoration, the agent is functionally identical to its state at the time of backup. Conversation history is intact, long-term knowledge is preserved, wallet balances are correct, and in-progress tasks can be resumed. From the user's perspective, the agent picks up exactly where it left off.

---

## Backup Isolation

Private Backup follows the same isolation model as every other MoltGhost component. Each agent's backup is independent, separately encrypted, and stored under separate storage credentials. One agent's backup cannot be accessed, read, or restored by another agent.

MoltGhost does not have a master key or backdoor that can decrypt agent backups. The platform facilitates the backup process — triggering snapshots, managing Storj connections, and coordinating restores — but it never handles unencrypted data. The encryption and decryption happen exclusively inside the pod, and the keys remain exclusively in the pod owner's control.

This isolation means that even in the event of a platform-level security incident, backed-up agent data remains protected. An attacker who compromises MoltGhost's infrastructure would find only encrypted fragments on Storj with no way to decrypt them.
