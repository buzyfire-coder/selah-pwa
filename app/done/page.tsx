"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
const BG = "var(--bg)";
const TEXT = "var(--text)";
const WOOD = "#8B6B4F";


export default function DonePage() {
  const [leaving, setLeaving] = useState(false);
  const sp = useSearchParams();
  const router = useRouter();
  const v = sp.get("v");
  return (
      <main style={{ ...styles.page, opacity: leaving ? 0 : 1, transition: "opacity 650ms ease" }}>
      <div style={styles.centerBlock}>
        <div style={styles.title}>細拉。</div>
        <div style={styles.msg}>安靜完成，願主的平安與你同在。</div>
        </div>
        <button
  style={styles.primary}
  onClick={() => {
    setLeaving(true);
    window.setTimeout(() => {
      router.replace(v ? `/echo?v=${v}` : "/echo");
    }, 450);
  }}
>
  回應
</button>

<button
  style={styles.secondary}
  onClick={() => {
    setLeaving(true);
    window.setTimeout(() => {
      router.replace("/");
    }, 450);
  }}
>
  只想靜靜
</button>

    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100svh",
    background: BG,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 24px 56px",
    textAlign: "center",
  },
  centerBlock: {
    maxWidth: 520,
  },
  title: {
    fontSize: 28,
    color: TEXT,
    opacity: 0.9,
    letterSpacing: 2,
    marginTop: 24,
  },
  msg: {
    marginTop: 18,
    fontSize: 16,
    lineHeight: 1.8,
    color: TEXT,
    opacity: 0.85,
  },
  primary: {
    width: "100%",
    maxWidth: 360,
    padding: "14px 18px",
    borderRadius: 999,
    background: "rgba(139, 107, 79, 0.28)",
    color: TEXT,
    border: "1px solid rgba(90, 62, 43, 0.16)",
    fontSize: 16,
    letterSpacing: 2,
    boxShadow: "0 10px 26px rgba(90, 62, 43, 0.08)",
    backdropFilter: "blur(6px)",
  },  
  secondary: {
    width: "100%",
    maxWidth: 360,
    padding: "14px 18px",
    borderRadius: 999,
    background: "transparent",
    color: TEXT,
    border: "1px solid var(--border)",
    fontSize: 14,
    letterSpacing: 2,
    opacity: 0.55,
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
  },  
};
