"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanionPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    const msg = input.trim();
    if (!msg || loading) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");

      setReply(data.text || "");
    } catch (e: any) {
      setReply("我收唔到回覆住…你可以再試一次，或者我陪你靜一陣都得。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.topbar}>
        <Link href="/" style={styles.back}>
          ←
        </Link>
      </div>

      <div style={styles.center}>
        <div style={styles.title}>SELAH</div>

        <div style={styles.box}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="想講一句就得。"
            rows={4}
            style={styles.textarea}
          />
          <button onClick={ask} disabled={loading || !input.trim()} style={styles.primary}>
            {loading ? "回覆緊…" : "送出"}
          </button>
        </div>

        {reply && <div style={styles.reply}>{reply}</div>}
      </div>

      <div style={styles.bottomStack}>
  <button
    style={styles.primaryBtn}
    onClick={() => router.push("/time")}
  >
    細拉
  </button>

  <button
    style={styles.secondaryBtn}
    onClick={() => router.replace("/")}
  >
    只想靜靜
  </button>
</div>

    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "var(--app-height)", // ✅ 你之前為咗 Android/iPhone 兼容用嘅做法
    background: "var(--bg)",
    padding: "18px 24px calc(18px + env(safe-area-inset-bottom))",
    display: "grid",
    gridTemplateRows: "28px 1fr auto",
    overflow: "hidden",
  },
  topbar: { display: "flex", alignItems: "center" },
  back: { textDecoration: "none", color: "var(--text)", fontSize: 22, opacity: 0.55, width: 30 },

  center: { maxWidth: 520, width: "100%", margin: "0 auto", textAlign: "center", alignSelf: "start" },
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
};
