export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: "Introduction",
    href: "/introduction",
    children: [
      {
        title: "Introduction",
        href: "/introduction",
      },
      {
        title: "What is MoltGhost",
        href: "/what-is-moltghost",
      },
      {
        title: "Architecture",
        href: "/architecture",
      },
    ],
  },
  {
    title: "Core Concepts",
    href: "/agent-pod",
    children: [
      {
        title: "Agent Pod",
        href: "/agent-pod",
      },
      {
        title: "Agent Runtime",
        href: "/agent-runtime",
      },
      {
        title: "Local LLM",
        href: "/local-llm",
      },
    ],
  },
  {
    title: "Operations",
    href: "/deploy-agent",
    children: [
      {
        title: "Deploy an Agent",
        href: "/deploy-agent",
      },
      {
        title: "Connect to Agent",
        href: "/connect-agent",
      },
      {
        title: "Manage Agents",
        href: "/manage-agent",
      },
      {
        title: "Agent Lifecycle",
        href: "/agent-lifecycle",
      },
    ],
  },
  {
    title: "Platform Features",
    href: "/agent-access",
    children: [
      {
        title: "Agent Access",
        href: "/agent-access",
      },
      {
        title: "Private Skills",
        href: "/private-skills",
      },
      {
        title: "Backup & Restore",
        href: "/backup-restore",
      },
      {
        title: "Payment & Billing",
        href: "/payment",
      },
    ],
  },
];
