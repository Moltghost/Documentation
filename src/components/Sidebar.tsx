"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { navigation } from "@/lib/navigation";
import { NavLink } from "@/components/NavLink";
import { SidebarContext } from "@/components/SidebarContext";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <SidebarContext.Provider value={{ close }}>
      {/* Mobile hamburger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-[#19191c] text-white shadow-lg shadow-black/30 ring-1 ring-white/10 active:scale-95 transition-transform md:hidden"
          aria-label="Open navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}

      {/* Mobile overlay backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:pointer-events-none md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col bg-[#19191c] px-6 py-6 transition-transform duration-300 md:relative md:w-60 md:translate-x-0 md:bg-transparent md:px-0 md:py-0 md:pr-6 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile close button */}
        <button
          onClick={close}
          className="mb-2 ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:text-white md:hidden"
          aria-label="Close navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="mb-6 px-4 pt-2 shrink-0">
          <Image
            src="/images/moltghost.png"
            alt="MoltGhost Logo"
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Scrollable Navigation */}
        <div className="no-scrollbar flex-1 overflow-y-auto">
          <nav className="px-4 space-y-6 pb-32">
            {navigation.map((section) => (
              <div key={section.href}>
                <h3
                  className="mb-3 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "var(--font-irish-grover)" }}
                >
                  {section.title}
                </h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/decorative-line.svg"
                  alt=""
                  className="mb-3 h-auto w-32"
                />
                <ul className="space-y-1 pl-2">
                  {section.children?.map((item) => (
                    <li key={item.href}>
                      <NavLink href={item.href} title={item.title}>
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Watermark Logo */}
        <div className="pointer-events-none absolute bottom-0 left-0 select-none opacity-20">
          <Image
            src="/images/moltghost.png"
            alt=""
            width={200}
            height={200}
            className="h-auto w-48 object-contain"
          />
        </div>
      </aside>
    </SidebarContext.Provider>
  );
}
