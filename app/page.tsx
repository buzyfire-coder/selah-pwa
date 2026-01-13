import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.centerBlock}>
        <div style={styles.title}>SELAH</div>

        <div style={styles.verse}>
          你們要休息，要知道我是神。<br />
          <span style={styles.ref}>（詩篇 46:10）</span>
        </div>
      </div>

      <Link href="/time" style={styles.button}>
        細拉
      </Link>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100svh",
    background: "#var(--bg)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "calc(24px 24px calc(24px + env(safe-area-inset-bottom))",
    overflow: "hidden",
  },
  centerBlock: {
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
  },
  title: {
    marginTop: 24,
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
    opacity: 0.9,
  },
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
  },
};