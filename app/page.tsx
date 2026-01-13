import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.page}>
      {/* 上半部固定位置內容 */}
      <div style={styles.hero}>
        <div style={styles.title}>SELAH</div>

        <div style={styles.verse}>
          你們要休息，要知道我是神。<br />
          <span style={styles.ref}>（詩篇 46:10）</span>
        </div>
      </div>

      {/* 底部按鈕固定 */}
      <div style={styles.footer}>
        <Link href="/time" style={styles.button}>
          細拉
        </Link>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100dvh",
    minHeight: "100svh",
    background: "F6F1E7",
    overflow: "hidden",
    position: "relative",
    padding: "0 24px",
  },

  // ✅ 核心：固定在上方位置，不受其他影響
  hero: {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
  },

  title: {
    fontSize: 56,
    color: "5A3E2B",
    letterSpacing: 1,
  },

  verse: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 1.8,
    color: "var(--text)",
    opacity: 0.92,
  },

  ref: { opacity: 0.9 },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: "max(24px, env(safe-area-inset-bottom))",
  },

  button: {
    width: "100%",
    maxWidth: 360,
    margin: "0 auto",
    display: "block",
    textAlign: "center",
    padding: "16px 20px",
    borderRadius: 999,
    background: "var(--wood)",
    color: "var(--text)",
    textDecoration: "none",
    fontSize: 18,
    letterSpacing: 2,
    boxShadow: "0 16px 30px var(--shadow)",
    WebkitTapHighlightColor: "transparent",
  },
};
