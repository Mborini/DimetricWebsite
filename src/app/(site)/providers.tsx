"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <MantineWrapper>{children}</MantineWrapper>
    </NextThemesProvider>
  );
}

// ملف داخلي لتحويل theme من next-themes إلى Mantine
function MantineWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  
  return (
    <MantineProvider theme={{  }}>
      {children}
    </MantineProvider>
  );
}
