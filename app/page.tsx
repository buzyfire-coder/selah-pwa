import Link from "next/link";
import { Screen } from "./_components/Screen";

export default function Home() {
  return (
    <Screen
      bottom={
        <Link href="/time" style={styles.button}>
          細拉
        </Link>
      }
    >
      <div style={styles.centerBlock}>
        <div style={styles.title}>SELAH</div>
        <div style={styles.verse}>你們要休息，要知道我是神。</div>
        <div style={styles.ref}>（詩篇 46:10）</div>
      </div>
    </Screen>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100%",
    width: "100%",
    background: "var(--bg)",
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
    letterSpacing: 1,
    color: "var(--text)",
  },
  verse: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 1.8,
    opacity: 0.92,
  },
  ref: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.72,
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
  },
};
