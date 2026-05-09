import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletContextProvider";
import AppLayout from "@/components/AppLayout";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import WalletPopup from "@/components/WalletPopup";
import ScamOverlay from "@/components/ScamOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solana Dashboard",
  description: "Wallet connection, transaction history, and spending tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <ThemeProvider>
            <WalletContextProvider>
              <AppLayout>
                {children}
                <WalletPopup />
                <ScamOverlay />
              </AppLayout>
            </WalletContextProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
