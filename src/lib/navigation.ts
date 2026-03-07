export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: "Getting Started",
    href: "/",
    children: [
      {
        title: "Welcome",
        href: "/",
      },
      {
        title: "Architecture",
        href: "/architecture",
      },
      {
        title: "Roadmap",
        href: "/roadmap",
      },
    ],
  },
  {
    title: "MoltGhost Modules",
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
        title: "Agent Models",
        href: "/agent-models",
      },
    ],
  },
  {
    title: "Platform Features",
    href: "/private-skills",
    children: [
      {
        title: "Private Skills",
        href: "/private-skills",
      },
      {
        title: "Private Access",
        href: "/private-access",
      },
      {
        title: "Private Payment",
        href: "/private-payment",
      },
      {
        title: "Private Memory",
        href: "/private-memory",
      },
      {
        title: "Private Backup",
        href: "/private-backup",
      },
      {
        title: "App Manager",
        href: "/app-manager",
      },
    ],
  },
  {
    title: "Token",
    href: "/token-info",
    children: [
      {
        title: "Token Info",
        href: "/token-info",
      },
    ],
  },
  {
    title: "Resources",
    href: "/faq",
    children: [
      {
        title: "FAQ",
        href: "/faq",
      },
      {
        title: "Terms of Service",
        href: "/terms-of-service",
      },
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        title: "Disclaimer",
        href: "/disclaimer",
      },
      {
        title: "Socials & Links",
        href: "/socials-links",
      },
    ],
  },
];

/** Flatten navigation into an ordered list of leaf pages */
export function getFlatNav(): NavItem[] {
  const flat: NavItem[] = [];
  for (const section of navigation) {
    if (section.children) {
      for (const child of section.children) {
        flat.push(child);
      }
    } else {
      flat.push(section);
    }
  }
  return flat;
}

export function getPrevNext(currentHref: string) {
  const flat = getFlatNav();
  const index = flat.findIndex((item) => item.href === currentHref);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}
