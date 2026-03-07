---
title: Private Access
slug: private-access
---

# Private Access

Secure, private connectivity between users and their agents — powered by Cloudflare Tunnel with zero exposed ports.

---

## What is Private Access?

Private Access is MoltGhost's networking layer that connects users to their agents without exposing any part of the Agent Pod to the public internet. Every agent is accessible through a secure Cloudflare Tunnel endpoint — there are no open ports, no public IP addresses, and no direct network paths that could be discovered or attacked.

Traditional server deployments require opening ports and binding services to public IPs, which creates an attack surface that must be constantly monitored and defended. Private Access eliminates this entirely. The Agent Pod initiates an outbound connection to Cloudflare's edge network, and all traffic flows through that tunnel. From the outside, the pod is invisible — it has no inbound ports and no publicly routable address.

This means your agent is reachable from anywhere in the world through Cloudflare's global edge network, but its actual location and infrastructure are completely hidden. An attacker cannot scan for your agent's ports because there are none. They cannot find its IP address because it is never exposed. The only way to reach the agent is through the authenticated tunnel endpoint.

---

## How It Works

When an Agent Pod starts, the runtime establishes a Cloudflare Tunnel connection as part of the initialization sequence. The pod reaches out to Cloudflare's edge — not the other way around. This outbound-only connection model is what makes the pod invisible to the public internet.

Once the tunnel is established, Cloudflare assigns a secure endpoint that routes traffic to the agent. Users send requests to this endpoint, Cloudflare forwards them through the tunnel to the pod, and the agent's response travels back through the same path. The entire round trip happens over encrypted connections with no intermediate service able to read the payload.

The tunnel remains active as long as the pod is running. If the connection drops due to a network issue, the pod automatically reconnects without requiring manual intervention. When the pod is paused or terminated, the tunnel closes and the endpoint becomes unreachable.

---

## Zero Exposed Ports

The core principle of Private Access is that Agent Pods never expose ports to the public internet. This is not a firewall rule or a security group configuration — the pod simply does not bind any service to a public IP.

In a typical deployment, a web server listens on port 443 and accepts connections from anyone who can reach its IP. This creates an always-open door that must be protected with TLS certificates, rate limiting, WAFs, and other defensive layers. With Private Access, there is no door to protect. The pod's services are only accessible through the Cloudflare Tunnel, which handles TLS termination, DDoS protection, and traffic management at the edge.

This zero-port architecture eliminates entire categories of attacks. Port scanning returns nothing. IP-based brute force attacks have no target. Service enumeration is impossible because no services are externally visible. The only entry point is the authenticated Cloudflare endpoint, which is protected by Cloudflare's infrastructure.

---

## Edge Network

Private Access leverages Cloudflare's global edge network to deliver low-latency connectivity regardless of where the user or the agent is located. Cloudflare operates data centers in over 300 cities worldwide, and user requests are routed to the nearest edge location before being forwarded through the tunnel to the pod.

This means a user in Tokyo connecting to an agent running on a pod in the US does not need to make a direct cross-Pacific connection. The request hits Cloudflare's Tokyo edge, travels through Cloudflare's optimized backbone to the nearest edge to the pod, and then enters the tunnel. The result is lower latency and more reliable connectivity than a direct connection would provide.

The edge network also provides built-in DDoS protection. Cloudflare absorbs volumetric attacks at the edge before they ever reach the tunnel. The pod is never directly exposed to attack traffic, and the tunnel connection remains stable even during large-scale DDoS events targeting the endpoint.

---

## Authentication & Access Control

Private Access endpoints are not publicly open URLs that anyone can call. Access to an agent is controlled through authentication mechanisms that verify the identity of the requester before forwarding traffic through the tunnel.

Each agent's endpoint requires valid credentials to establish a connection. Unauthorized requests are rejected at the Cloudflare edge before they ever reach the pod. This means the agent's runtime never processes unauthenticated traffic — it only sees requests that have already passed authentication at the edge layer.

Access control is managed per agent. Each agent has its own tunnel, its own endpoint, and its own authentication configuration. One agent's access credentials cannot be used to reach another agent. This aligns with the pod-level isolation model — just as compute and data are separated between agents, network access is also fully independent.

---

## Privacy Guarantees

Private Access ensures that the agent's network identity is never revealed to external parties. The pod's IP address, cloud provider, geographic location, and infrastructure details are all hidden behind the Cloudflare Tunnel.

When users connect to their agent, they interact with a Cloudflare endpoint — not the pod directly. Cloudflare handles the connection and forwards it through the tunnel, but the user never learns the pod's actual network address. Similarly, when the agent's Private Skills make outbound requests — browsing the web, calling APIs, or submitting blockchain transactions — those requests exit through the tunnel so the destination sees Cloudflare's IP, not the pod's.

This bidirectional privacy means the agent is hidden in both directions. Inbound traffic cannot locate the pod. Outbound traffic cannot be traced back to it. The agent operates through the Cloudflare edge as a privacy shield for all network communication, whether the agent is receiving requests or making them.
