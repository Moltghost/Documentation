import type { Metadata } from "next";
import { Irish_Grover, Fira_Code } from "next/font/google";
import "./globals.css";

const irishGrover = Irish_Grover({
  variable: "--font-irish-grover",
  subsets: ["latin"],
  weight: "400",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoltGhost Docs",
  description: "Documentation for MoltGhost",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${irishGrover.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
