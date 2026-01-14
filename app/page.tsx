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
    height: "calc(var(--vh, 1vh) * 100)",
    background: "var(--bg)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  
    paddingTop: 72,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
  },
  centerBlock: {
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
  
    /* 令內容偏上，但保留留白 */
    marginTop: 12,
  },
  button: {
    width: "100%",
    maxWidth: 360,
    marginTop: "auto",          // ✅ 關鍵：推到底
    textAlign: "center",
    padding: "16px 20px",
    borderRadius: 999,
    background: "var(--wood)",
    color: "var(--text)",
    textDecoration: "none",
    fontSize: 18,
    letterSpacing: 2,
  },
}
