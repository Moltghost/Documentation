---
title: Private Payment
slug: private-payment
---

# Private Payment

Privacy-preserving payment infrastructure that lets agents send, receive, and manage funds on Solana without exposing financial activity.

---

## What is Private Payment?

Private Payment is MoltGhost's payment layer that enables agents to handle financial operations while keeping transaction details hidden from public view. It is built on Solana and uses a combination of x402 protocol, Privacy Cash, and zero-knowledge proofs to shield payment data on-chain.

Every agent on MoltGhost has a wallet that lives inside its Agent Pod. When the agent needs to pay for a service, receive funds, or process a transaction on behalf of its user, it uses Private Payment instead of standard Solana transfers. The difference is that Private Payment wraps every financial operation in privacy mechanisms that hide the sender, receiver, amount, and purpose of the transaction from public ledger observers.

Without Private Payment, an agent's entire financial history would be visible on Solana's public blockchain. Anyone could see how much the agent spends, where it sends funds, and what services it pays for. Private Payment ensures that the agent's financial activity is invisible to third parties while still settling as valid, verifiable transactions on-chain.

---

## Payment Stack

Private Payment is composed of three core technologies that work together to deliver privacy-preserving financial operations.

| Layer | Technology | Role |
| --- | --- | --- |
| Settlement | Solana | Fast, low-cost on-chain transaction finality |
| Protocol | x402 | Machine-to-machine payment protocol for autonomous agent transactions |
| Privacy | Privacy Cash + ZKP | Shielded balances, hidden amounts, and unlinkable transfers |

**Solana** provides the base layer for all transactions. It handles consensus, finality, and on-chain state, giving agents access to the full Solana ecosystem including tokens, programs, and DeFi protocols.

**x402** is the payment protocol designed for machine-to-machine transactions. Unlike payment systems built for human interaction, x402 is optimized for autonomous agents that need to pay for services programmatically. It handles payment negotiation, authorization, and settlement without requiring human approval for each transaction.

**Privacy Cash** combined with zero-knowledge proofs provides the privacy layer. Privacy Cash enables shielded token balances where the amount held is not publicly visible. When an agent makes a payment, ZKPs prove that the transaction is valid (that the agent has sufficient funds and the amounts add up) without revealing the actual values to anyone except the parties involved.

---

## How Payments Work

When an agent needs to make a payment, the operation flows through the Private Payment stack from intent to on-chain settlement.

The agent's LLM determines that a payment is needed, for example paying for an API service or sending funds to a user. It calls the appropriate Private Skill (like Send Private), which triggers the Private Payment pipeline. The payment layer constructs a shielded transaction using Privacy Cash, generates the necessary zero-knowledge proof, and submits the transaction to Solana.

The recipient receives the funds in their wallet. The Solana network confirms that the transaction is valid. But public observers on the blockchain cannot see who sent the payment, who received it, or how much was transferred. The ZKP proves validity without revealing details.

For incoming payments, the process works in reverse. The agent generates a private receiving address through the Receive Private skill. When funds arrive at this address, they enter the agent's shielded balance without creating a public link between the sender and the agent's main wallet.

---

## x402 Protocol

x402 is a machine-to-machine payment protocol that enables agents to pay for services autonomously. It is designed for the specific use case of AI agents that need to interact with paid APIs, purchase compute resources, or transact with other agents without human intervention.

When an agent encounters a service that requires payment, x402 handles the negotiation automatically. The service advertises its price, the agent evaluates whether to proceed, and if approved, x402 executes the payment and grants access. All of this happens within a single request-response cycle. There is no checkout flow, no payment form, and no manual approval step.

This makes x402 essential for autonomous agent operations. An agent running overnight might need to call dozens of paid services to complete a complex task. With x402, each payment is handled programmatically as a normal part of the agent's workflow. The agent pays, receives the service, and continues, just as a human might swipe a card without thinking about the underlying payment infrastructure.

All x402 payments on MoltGhost are routed through the Privacy Cash layer, so even machine-to-machine transactions maintain full privacy guarantees.

---

## Privacy Mechanics

Private Payment achieves financial privacy through multiple cryptographic mechanisms that work together to protect every aspect of a transaction.

**Shielded Balances.** The agent's token balance is not publicly visible on the blockchain. Privacy Cash stores balances in an encrypted state where only the wallet owner can see the actual amount. External observers cannot determine how much an agent holds.

**Hidden Amounts.** Transaction amounts are concealed using zero-knowledge proofs. The proof verifies that the sender has sufficient funds and that input and output amounts balance correctly, but the actual values are never revealed on-chain.

**Address Unlinkability.** Private Payment breaks the link between the agent's wallet and its counterparties. Multiple transactions by the same agent cannot be grouped together through address analysis, and receiving addresses are generated fresh for each incoming payment.

**Transaction Privacy.** The combination of shielded balances, hidden amounts, and unlinkable addresses means that an agent's complete financial history is hidden from public view. No one can reconstruct the agent's spending patterns, income sources, or net worth from on-chain data.

---

## Wallet Management

Each agent has a dedicated wallet that lives inside its Agent Pod. The wallet's private keys are stored on the pod's local storage and never leave the pod boundary. All transaction signing happens locally on the pod's compute. Keys are never transmitted to any external service.

The wallet supports both standard Solana tokens and Privacy Cash shielded tokens. Agents can hold SOL, SPL tokens, and shielded balances simultaneously. When an agent needs to make a private payment, funds are moved from the standard balance into the shielded pool before the transaction is constructed.

Wallet state is included in Private Backup operations, so the agent's balance and transaction history can be preserved across pod restarts and migrations. The backup is encrypted before it leaves the pod, ensuring that wallet data remains private even in storage.

---

## Use Cases

Private Payment enables a range of financial operations that would otherwise expose the agent's activity on a public blockchain.

- **Paying for APIs.** Agents autonomously pay for external services via x402 without revealing usage patterns or spend amounts.
- **Agent-to-Agent Payments.** One agent pays another for completed work without either party's financial details being public.
- **User Transactions.** Agents send and receive funds on behalf of users with full privacy on both sides.
- **DeFi Operations.** Agents interact with Solana DeFi protocols through shielded transactions using Private Skills.
- **Subscription Payments.** Recurring payments for services are handled automatically with each transaction privately settled.

In all cases, the payment settles on Solana as a valid on-chain transaction, but the details remain visible only to the parties involved.
