import React from "react";

export function Screen({
  children,
  bottom,
}: {
  children: React.ReactNode;
  bottom?: React.ReactNode;
}) {
  return (
    <main style={styles.page}>
      <div style={styles.safeTop} />
      <div style={styles.content}>{children}</div>
      <div style={styles.bottom}>{bottom}</div>
      <div style={styles.safeBottom} />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "100dvh",
    width: "100vw",
    background: "var(--bg)",
    color: "var(--text)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  safeTop: {
    height: "env(safe-area-inset-top)",
    flex: "0 0 auto",
  },
  safeBottom: {
    height: "env(safe-area-inset-bottom)",
    flex: "0 0 auto",
  },
  content: {
    flex: "1 1 auto",
    display: "flex",
    alignItems: "flex-start", // SELAH 會偏上
    justifyContent: "center",
    padding: "48px 24px 0",
  },
  bottom: {
    flex: "0 0 auto",
    padding: "0 24px 24px",
    display: "flex",
    justifyContent: "center",
  },
};
