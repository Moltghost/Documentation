import type { Metadata } from "next";
import { Irish_Grover } from "next/font/google";
import localFont from "next/font/local";
import { Sidebar } from "@/components/Sidebar";
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
        <div
          className="relative flex h-screen w-full flex-col overflow-hidden"
          style={{
            backgroundImage: "url('/images/main-bg-black.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 flex flex-1 overflow-hidden px-4 py-4 md:px-6 md:py-6">
            <Sidebar />
            <main className="flex min-w-0 flex-1 overflow-hidden">
              <div className="flex flex-1 flex-col overflow-y-auto rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
