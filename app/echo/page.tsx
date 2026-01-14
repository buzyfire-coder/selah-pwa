"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Verse = {
  id: number | string;
  verse_zh: string;
  reference: string;
  category: string;
  theme: string;
};

export default function EchoPage() {
  const [isLeaving, setIsLeaving] = useState(false);
  const sp = useSearchParams();
  const router = useRouter();

  const verseId = useMemo(() => {
    const v = sp.get("v");
    return v ? Number(v) : null;
  }, [sp]);

  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState<"idle" | "prayer">("idle");
  const [prayer, setPrayer] = useState("");

  // ✅ 用 useEffect 做 async load（你原本用 useMemo 其實係錯用，但功能一樣）
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/verses.json", { cache: "no-store" });
        const all = (await res.json()) as Verse[];

        if (cancelled) return;

        if (!verseId) {
          setVerse(null);
        } else {
          const found = all.find((x) => Number(x.id) === verseId) ?? null;
          setVerse(found);
        }
      } catch {
        if (!cancelled) setVerse(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [verseId]);

  function leaveHome() {
    setIsLeaving(true);
    window.setTimeout(() => router.replace("/"), 650);
  }

  return (
    <main
      style={{
        ...styles.page,
        opacity: isLeaving ? 0 : 1,
        transition: "opacity 650ms ease",
      }}
    >
      {/* topbar */}
      <div style={styles.topbar}>
        <Link href="/" style={styles.back}>
          ←
        </Link>
      </div>

      {/* content (可滾動，但全頁唔會彈跳) */}
      <div style={styles.content}>
        <div style={styles.title}>SELAH</div>

        <div style={styles.invite}>
          主啊，這段安靜，願你在我裡面成就你的旨意。
        </div>

        <div style={styles.verseBox}>
          {loading ? (
            <div style={{ opacity: 0.5 }}>……</div>
          ) : verse ? (
            <>
              <div style={styles.verse}>{verse.verse_zh}</div>
              <div style={styles.ref}>（{verse.reference}）</div>
            </>
          ) : (
            <div style={{ opacity: 0.55, lineHeight: 1.8 }}>
              你可以在這裡，向主說一句心裡的話。<br />
              （不會保存、也不會記錄。）
            </div>
          )}
        </div>

        {mode === "prayer" && (
          <div style={styles.prayerWrap}>
            <textarea
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
              placeholder="主啊……（可留白）"
              style={styles.textarea}
              rows={4}
            />
            <div style={styles.tinyNote}>不會保存。返回後會清空。</div>
          </div>
        )}

        {/* content 底部留位，避免被 bottom actions 壓住 */}
        <div style={styles.contentSpacer} />
      </div>

      {/* bottom actions：永遠貼底，不重疊 */}
      <div style={styles.actions}>
        {mode === "idle" ? (
          <>
            <button style={styles.primary} onClick={() => setMode("prayer")}>
              一句禱告
            </button>

            <button style={styles.secondary} onClick={leaveHome}>
              只想靜靜
            </button>
          </>
        ) : (
          <>
            <button
              style={styles.primary}
              onClick={() => {
                // 不保存：只做交託動作，然後回首頁
                setPrayer("");
                setMode("idle");
                leaveHome();
              }}
            >
              交託給主
            </button>

            <button
              style={styles.secondary}
              onClick={() => {
                setPrayer("");
                setMode("idle");
                leaveHome();
              }}
            >
              只想靜靜
            </button>
          </>
        )}
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: "var(--app-height)",
    background: "var(--bg)",
    padding: "16px 24px calc(16px + env(safe-area-inset-bottom))",
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: "28px 1fr auto",
    gap: 10,
  },

  topbar: {
    display: "flex",
    alignItems: "center",
  },

  back: {
    textDecoration: "none",
    color: "var(--text)",
    fontSize: 22,
    opacity: 0.55,
    width: 30,
  },

  content: {
    maxWidth: 520,
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
    overflowY: "auto",
    paddingTop: 2, // ✅ 上面留白收細
    paddingBottom: 6,
  },

  title: {
    fontSize: 20,
    letterSpacing: 6,
    color: "var(--text)",
    opacity: 0.45,
    marginTop: 2,
  },

  invite: {
    marginTop: 10, // ✅ 比你原本更貼近，唔會「上面空好多」
    fontSize: 16,
    lineHeight: 1.9,
    color: "var(--text)",
    opacity: 0.82,
  },

  verseBox: {
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    background: "var(--wood)",
    border: "1px solid var(--border)",
  },

  verse: {
    fontSize: 18,
    lineHeight: 1.9,
    color: "var(--text)",
    opacity: 0.9,
  },

  ref: {
    marginTop: 10,
    fontSize: 13,
    color: "var(--text)",
    opacity: 0.7,
  },

  prayerWrap: {
    marginTop: 12,
  },

  textarea: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 14,
    border: "1px solid var(--border)",
    padding: 14,
    fontSize: 16,
    lineHeight: 1.7,
    outline: "none",
    background: "rgba(246, 241, 231, 0.8)",
    color: "var(--text)",
  },

  tinyNote: {
    marginTop: 8,
    fontSize: 12,
    color: "var(--text)",
    opacity: 0.45,
  },

  contentSpacer: {
    height: 10,
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
  },

  primary: {
    width: "100%",
    maxWidth: 360,
    padding: "14px 18px",
    borderRadius: 999,
    background: "var(--wood)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    fontSize: 16,
    letterSpacing: 2,
    boxShadow: "0 10px 26px var(--shadow)",
    backdropFilter: "blur(6px)",
    animation: "selahSoftPulse 3.8s ease-in-out infinite",
  },

  secondary: {
    width: "100%",
    maxWidth: 360,
    padding: "14px 18px",
    borderRadius: 999,
    background: "transparent",
    color: "var(--text)",
    border: "1px solid var(--border)",
    fontSize: 14,
    letterSpacing: 2,
    opacity: 0.55,
  },
};
