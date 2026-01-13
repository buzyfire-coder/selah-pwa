import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Selah",
  description: "一個幫助人親近神的屬靈空間",
  // 解除你終端機顯示嘅 metadataBase 警告（本地先用 localhost）
  metadataBase: new URL("http://selah-pwa.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F6F1E7" />

        {/* iOS Add to Home Screen */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Selah" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
