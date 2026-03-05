"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  title: string;
}

export function NavLink({ href, children, title }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block rounded-md px-2 py-1.5 font-mono text-xs transition-colors ${
        isActive
          ? "bg-white/20 text-[#F4AAD8] font-semibold"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
      title={title}
    >
      {children}
    </Link>
  );
}
