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
       <Link href="/time" style={styles.button}>細拉</Link>
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 14,
  },
  
  footer: {
    paddingBottom: "max(24px, env(safe-area-inset-bottom))",
  },
  
}