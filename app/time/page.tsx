"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BG = "var(--bg)";
const TEXT = "var(--text)";
const WOOD = "#8B6B4F";
const WOOD_SOFT = "#C8B29A";

export default function TimePage() {
  const router = useRouter();
  const [minutes, setMinutes] = useState<number | null>(null);

  const startLabel = useMemo(() => {
    if (!minutes) return "開始安靜";
    return `開始安靜（${minutes}分鐘）`;
  }, [minutes]);

  const canStart = minutes !== null;

  function start() {
    if (!minutes) return;
    router.push(`/selah?m=${minutes}`);
  }

  return (
    <main style={styles.page}>
      <Link href="/" style={styles.back}>
        ←
      </Link>

      <div style={styles.centerBlock}>
        <div style={styles.prompt}>你想安靜幾耐？</div>

        <div style={styles.options}>
          {[3, 5, 10].map((m) => {
            const selected = minutes === m;
            return (
              <button
                key={m}
                onClick={() => setMinutes(m)}
                style={{
                  ...styles.optionBtn,
                  background: selected ? WOOD : WOOD_SOFT,
                  color: selected ? BG : TEXT,
                }}
              >
                {m} 分鐘
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={start}
        disabled={!canStart}
        style={{
          ...styles.startBtn,
          opacity: canStart ? 1 : 0.55,
          cursor: canStart ? "pointer" : "not-allowed",
        }}
      >
        {startLabel}
      </button>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "var(--app-height, 100dvh)",
    background: BG,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding:
      "calc(18px + env(safe-area-inset-top)) 24px calc(18px + env(safe-area-inset-bottom))",
    overflow: "hidden",
  },

  back: {
    alignSelf: "flex-start",
    textDecoration: "none",
    color: TEXT,
    fontSize: 22,
    opacity: 0.75,
  },

  // ✅ 中間內容用 flex:1，並且「偏上」
  content: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: "clamp(28px, 10vh, 96px)", // 👈 令標題/選項較高，留白更大
  },

  centerBlock: {
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
  },

  prompt: {
    fontSize: 18,
    color: TEXT,
    opacity: 0.9,
    marginBottom: 22,
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    alignItems: "center",
  },

  optionBtn: {
    width: "100%",
    maxWidth: 360,
    padding: "14px 18px",
    borderRadius: 999,
    border: "none",
    fontSize: 18,
  },

  // ✅ 底部按鈕獨立一格，永遠貼底（含 safe-area）
  bottom: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "env(safe-area-inset-bottom)",
  },

  startBtn: {
    width: "100%",
    maxWidth: 360,
    padding: "16px 20px",
    borderRadius: 999,
    background: "var(--wood)",
    color: TEXT,
    border: "none",
    fontSize: 18,
    letterSpacing: 1.5,
    boxShadow: "0 16px 30px var(--shadow)",
  },
};
