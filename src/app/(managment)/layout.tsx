// app/layout.tsx or src/app/layout.tsx
"use client";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css"; // required!
import { Inter } from "next/font/google";
import '../../styles/index.css'; 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
