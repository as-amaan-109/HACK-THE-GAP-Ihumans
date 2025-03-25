// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";

export default function UiProvider({ children }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
