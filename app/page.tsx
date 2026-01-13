import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.body}>
        <div style={styles.title}>SELAH</div>

        <div style={styles.verse}>
          你們要休息，要知道我是神。<br />
          <span style={styles.ref}>（詩篇 46:10）</span>
        </div>
      </div>

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
    background: "var(--bg)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "24px 24px 0",
  },

  body: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },

  title: {
    fontSize: 56,
    color: "var(--text)",
    letterSpacing: 1,
  },

  verse: {
    fontSize: 16,
    lineHeight: 1.8,
    color: "var(--text)",
    opacity: 0.92,
  },

  ref: { opacity: 0.9 },

  footer: {
    paddingBottom: "max(24px, env(safe-area-inset-bottom))",
  },

  button: {
    width: "100%",
    maxWidth: 360,
    margin: "0 auto",
    display: "block",              // ✅ 關鍵：保證 Link 像按鈕
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
