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
      height: "var(--app-height)",          // ✅ 真實可視高度（Android 會準）
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
      paddingTop: "calc(40px + env(safe-area-inset-top))",
      paddingLeft: 24,
      paddingRight: 24,
    },
  
    centerBlock: {
      width: "100%",
      maxWidth: 420,
      textAlign: "center",
  
      paddingTop:"8vh"
          },
  
    title: {
      marginTop: 0,
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
  
    button: {
      position: "absolute",   // ✅ 固定喺畫面底（唔靠 space-between）
      left: 24,
      right: 24,
      bottom: "calc(24px + env(safe-area-inset-bottom))",
  
      maxWidth: 360,
      margin: "0 auto",
  
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
  