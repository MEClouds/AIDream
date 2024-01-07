import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import ModalProvider from "@/components/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIDream",
  description: "AI services platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(" bg-slate-200", inter.className)}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
