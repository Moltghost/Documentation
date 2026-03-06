"use client";

import { createContext, useContext } from "react";

export const SidebarContext = createContext<{
  close: () => void;
}>({ close: () => {} });

export function useSidebar() {
  return useContext(SidebarContext);
}
