import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.centerBlock}>
        <div style={styles.title}>SELAH</div>
        <div style={styles.verse}>你們要休息，要知道我是神。</div>
        <div style={styles.ref}>（詩篇 46:10）</div>
      </div>

      <Link href="/time" style={styles.button}>
        細拉
      </Link>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "var(--bg)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    /* ✅ 用 space-between 但加足夠 padding 避免 Android bar 推到好怪 */
    justifyContent: "space-between",

    paddingTop: "max(56px, env(safe-area-inset-top))",
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: "calc(24px + env(safe-area-inset-bottom))",

    overflow: "hidden",
  },

  /* ✅ SELAH 偏上：用 vh 推落去，跨機穩定 */
  centerBlock: {
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
    marginTop: "14vh",
  },

  title: {
    fontSize: 56,
    color: "var(--text)",
    letterSpacing: 1,
  },
  verse: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 1.8,
    color: "var(--text)",
    opacity: 0.92,
  },
  ref: {
    marginTop: 6,
    fontSize: 14,
    color: "var(--text)",
    opacity: 0.72,
  },

  /* ✅ 按鈕永遠在底部，但唔會被 Android navbar 壓住 */
  button: {
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
    marginBottom: 8,
  },
};
