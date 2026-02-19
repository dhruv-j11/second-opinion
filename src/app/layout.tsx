import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Second Opinion — Understand Your Health",
  description:
    "Upload your lab results. Get plain-English explanations, track changes over time, and walk into your next appointment prepared.",
  openGraph: {
    title: "Second Opinion — Understand Your Health",
    description:
      "Upload your lab results. Get plain-English explanations, track changes over time, and walk into your next appointment prepared.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
