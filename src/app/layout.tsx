import type { Metadata } from "next";
import { Irish_Grover } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const circularStd = localFont({
  src: [
    {
      path: "../../public/fonts/CircularStd-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CircularStd-BookItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/CircularStd-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CircularStd-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/CircularStd-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CircularStd-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/CircularStd-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/CircularStd-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-circular-std",
});

const irishGrover = Irish_Grover({
  variable: "--font-irish-grover",
  subsets: ["latin"],
  weight: "400",
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
        className={`${circularStd.variable} ${irishGrover.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
