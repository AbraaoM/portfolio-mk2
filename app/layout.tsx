import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abraão Moreira | Desenvolvedor Full-Stack",
  description: "Desenvolvedor full-stack: aplicações web em React, Next.js, Node.js e TypeScript, automação de processos e ferramentas MQL5 para MetaTrader 5.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/Logo.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
