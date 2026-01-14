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
    background: "#F6F1E7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "48px 24px 32px",
    overflow: "hidden",
  },
  centerBlock: {
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
  },
  title: {
    fontSize: 56,
    color: "#5A3E2B",
    letterSpacing: 1,
  },
  verse: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 1.8,
    color: "#5A3E2B",
    opacity: 0.92,
  },
  ref: {
    marginTop: 6,
    fontSize: 14,
    color: "#5A3E2B",
    opacity: 0.72,
  },
  button: {
    width: "100%",
    maxWidth: 360,
    textAlign: "center",
    padding: "16px 20px",
    borderRadius: 999,
    background: "#D9CBB8",
    color: "#5A3E2B",
    textDecoration: "none",
    fontSize: 18,
    letterSpacing: 2,
  },
};
