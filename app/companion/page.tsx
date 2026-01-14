"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanionPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setStaticHeight = () => {
      document.documentElement.style.setProperty(
        "--companion-height",
        `${window.innerHeight}px`
      );
    };
  
    setStaticHeight();
  
    // 只喺旋轉/橫向變化先更新，避免鍵盤 resize 推高 UI
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        setStaticHeight();
      }
    };
  
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", setStaticHeight);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", setStaticHeight);
    };
  }, []);
  

  async function ask() {
    const msg = input.trim();
    if (!msg || loading) return;

    setLoading(true);
    setReply("");

    try {
        const res = await fetch("/api/companion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
          });
          
          const data = await res.json().catch(() => ({}));
          
          if (!res.ok) {
            setReply(data?.error ? `（錯誤）${data.error}` : "（錯誤）請稍後再試。");
            return;
          }
          
          setReply(data.reply ?? "（錯誤）AI 冇回文字。");
          
    } finally {
      setLoading(false);
    }
  }

return (
  <main style={styles.page}>
    <div style={styles.topbar}>
      <Link href="/" style={styles.back}>←</Link>
    </div>

      <div style={styles.headerBlock}>
        <div style={styles.title}>SELAH</div>

        <div style={styles.box}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="分享你當下一個感受或情緒。"
            rows={4}
            style={styles.textarea}
          />
          <button onClick={ask} disabled={loading || !input.trim()} style={styles.primary}>
            {loading ? "回覆緊…" : "送出"}
          </button>
        </div>
        </div>
        
        <div style={styles.replyScroll}>
          {reply && <div style={styles.reply}>{reply}</div>}
        </div>

    <div style={styles.actions}>
    <Link href="/time" style={styles.primaryLink}>
        細拉
      </Link>

      <button style={styles.secondary} onClick={() =>router.replace("/")}>
        只想靜靜
      </button>
    </div>
  </main>
);
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "var(--companion-height, var(--app-height))",
    background: "var(--bg)",
    padding: "18px 24px calc(18px + env(safe-area-inset-bottom))",
    overflow: "hidden",
    position: "relative",
  },
  
  topbar: { display: "flex", alignItems: "center" },
  back: { textDecoration: "none", color: "var(--text)", fontSize: 22, opacity: 0.55, width: 30 },

  headerBlock: {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  textAlign: "center",
},
  title: { fontSize: 20, letterSpacing: 6, color: "var(--text)", opacity: 0.45, marginTop: 6 },

  box: { marginTop: 14, display: "grid", gap: 12 },
  textarea: {
    width: "100%",
    borderRadius: 14,
    border: "1px solid var(--border)",
    padding: 14,
    fontSize: 16,
    lineHeight: 1.7,
    outline: "none",
    background: "rgba(246, 241, 231, 0.8)",
    color: "var(--text)",
  },
  replyScroll: {
    minHeight: 0,                 // ✅ 超重要：grid 入面要滾一定要有
    overflowY: "auto",            // ✅ 只滾回覆
    WebkitOverflowScrolling: "touch",
    paddingRight: 2,
    paddingBottom: 160,
  },
  bottomStack: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
  },
  
  primaryBtn: {
    width: "100%",
    maxWidth: 360,
    padding: "14px 18px",
    borderRadius: 999,
    background: "var(--wood)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    fontSize: 16,
    letterSpacing: 2,
    boxShadow: "0 10px 26px var(--shadow)",
  },
  
  secondaryBtn: {
    width: "100%",
    maxWidth: 360,
    padding: "14px 18px",
    borderRadius: 999,
    background: "transparent",
    color: "var(--text)",
    border: "1px solid var(--border)",
    fontSize: 14,
    letterSpacing: 2,
    opacity: 0.65,
  },
  
  reply: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    background: "rgba(90, 62, 43, 0.06)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    lineHeight: 1.9,
    textAlign: "left",
  },

  bottom: { display: "flex", justifyContent: "center" },
  secondary: {
    width: "100%",
    maxWidth: 360,
    padding: "14px 18px",
    borderRadius: 999,
    background: "transparent",
    color: "var(--text)",
    border: "1px solid var(--border)",
    fontSize: 14,
    letterSpacing: 2,
    opacity: 0.65,
  },
  actions: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: "calc(18px + env(safe-area-inset-bottom))",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
  },  
  primaryLink: {
    width: "100%",
    maxWidth: 360,
    textAlign: "center",
    padding: "16px 20px",
    borderRadius: 999,
    background: "var(--wood)",
    color: "var(--text)",
    textDecoration: "none",
    fontSize: 18,
    letterSpacing: 2,
    boxShadow: "0 16px 30px var(--shadow)",
  },  
};
