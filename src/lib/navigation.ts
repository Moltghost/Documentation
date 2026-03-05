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
    ],
  },
  {
    title: "Core Concepts",
    href: "/core-concepts",
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
      {
        title: "Agent Access",
        href: "/agent-access",
      },
    ],
  },
  {
    title: "Features",
    href: "/features",
    children: [
      {
        title: "Payment",
        href: "/payment",
      },
      {
        title: "Private Skills",
        href: "/private-skills",
      },
      {
        title: "Backup & Restore",
        href: "/backup-restore",
      },
    ],
  },
  {
    title: "Guides",
    href: "/guides",
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
        title: "Manage Agent",
        href: "/manage-agent",
      },
    ],
  },
  {
    title: "Agent Lifecycle",
    href: "/agent-lifecycle",
    children: [
      {
        title: "Lifecycle Overview",
        href: "/lifecycle-overview",
      },
      {
        title: "Deploy",
        href: "/lifecycle-deploy",
      },
      {
        title: "Start",
        href: "/lifecycle-start",
      },
      {
        title: "Stop",
        href: "/lifecycle-stop",
      },
      {
        title: "Resume",
        href: "/lifecycle-resume",
      },
      {
        title: "Terminate",
        href: "/lifecycle-terminate",
      },
    ],
  },
];
