import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: "./fonts/cormorant-garamond-latin.woff2",
  weight: "400 600",
});

const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: "./fonts/manrope-latin.woff2",
  weight: "200 800",
});

const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    {
      path: "./fonts/ibm-plex-mono-latin-400.woff2",
      weight: "400",
    },
    {
      path: "./fonts/ibm-plex-mono-latin-500.woff2",
      weight: "500",
    },
  ],
});

export const metadata: Metadata = {
  title: "Zakaria Khan | Software Engineer",
  description:
    "Portfolio of Zakaria Khan, a software engineer building intelligent systems, resilient services, and real time products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
