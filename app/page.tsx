import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.centerBlock}>
        <div style={styles.title}>SELAH</div>
        <div style={styles.verse}>你們要休息，要知道我是神。</div>
        <div style={styles.ref}>（詩篇 46:10）</div>
      </div>

      <div style={styles.actions}>
        <Link href="/companion" style={styles.primaryBtn}>
          一鍵對話
        </Link>

        <Link href="/time" style={styles.secondaryBtn}>
          細拉
        </Link>
      </div>
    </main>
  );
}


const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "var(--app-height)",
    background: "var(--bg)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "48px 24px calc(24px + env(safe-area-inset-bottom))",
    overflow: "hidden",
  },

  centerBlock: {
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
    marginTop: 10, // 需要更高/更低就調呢個
  },

  title: { fontSize: 56, color: "var(--text)", letterSpacing: 1 },
  verse: { marginTop: 16, fontSize: 16, lineHeight: 1.8, color: "var(--text)", opacity: 0.92 },
  ref: { marginTop: 6, fontSize: 14, color: "var(--text)", opacity: 0.72 },

  actions: {
    width: "100%",
    maxWidth: 360,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingBottom: 6,
  },

  primaryBtn: {
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

  secondaryBtn: {
    textAlign: "center",
    padding: "16px 20px",
    borderRadius: 999,
    background: "transparent",
    color: "var(--text)",
    textDecoration: "none",
    fontSize: 16,
    letterSpacing: 2,
    border: "1px solid var(--border)",
    opacity: 0.75,
  },
};
