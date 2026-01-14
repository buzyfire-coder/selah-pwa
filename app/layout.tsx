import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Selah",
  description: "一個幫助人親近神的屬靈空間",
  // ✅ 建議：唔好用 localhost 做 metadataBase（見文末）
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <body>
        <Script id="app-height" strategy="beforeInteractive">{`
          (function () {
            function setAppHeight() {
              var h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
              document.documentElement.style.setProperty('--app-height', h + 'px');
            }
            setAppHeight();
            window.addEventListener('resize', setAppHeight);
            if (window.visualViewport) window.visualViewport.addEventListener('resize', setAppHeight);
          })();
        `}</Script>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
