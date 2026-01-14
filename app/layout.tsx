"use client";

import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <body>
        <div className="appRoot">{children}</div>
      </body>
    </html>
  );
}

