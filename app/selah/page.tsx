"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Verse = {
  id: string; // 你的 JSON 係 "1" 這種字串
  verse_zh: string;
  reference: string;
  category: string;
  theme: string;
};

type VerseN = Omit<Verse, "id"> & { id: number };

const BG = "var(--bg)";
const TEXT = "var(--text)";

// ---------- helpers ----------
function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

async function loadVerses(): Promise<VerseN[]> {
  const res = await fetch("/verses.json", { cache: "no-store" });
  if (!res.ok) throw new Error("無法讀取 verses.json");

  const raw = (await res.json()) as Verse[];

  // Normalize id to number, drop invalid
  const normalized: VerseN[] = raw
    .map((v) => ({ ...v, id: Number(v.id) }))
    .filter((v) => Number.isFinite(v.id) && v.id > 0);

  // Ensure unique ids
  const seen = new Set<number>();
  const unique = normalized.filter((v) => {
    if (seen.has(v.id)) return false;
    seen.add(v.id);
    return true;
  });

  if (unique.length === 0) throw new Error("verses.json 沒有有效資料（檢查 id 欄位）");
  return unique;
}

/**
 * Non-repeating cycle:
 * - shuffled queue of ids in localStorage
 * - index pointer
 * - when exhausted, reshuffle
 * - avoid consecutive repeat across cycle boundary
 */
async function nextVerse(): Promise<VerseN> {
  const verses = await loadVerses();
  const ids = verses.map((v) => v.id);

  const qKey = "selah.queue";
  const iKey = "selah.index";
  const lastKey = "selah.lastVerseId";

  // read queue
  let queueAny: any = null;
  try {
    queueAny = JSON.parse(localStorage.getItem(qKey) || "null");
  } catch {
    queueAny = null;
  }

  // normalize queue to number[]
  let queue: number[] | null = Array.isArray(queueAny)
    ? queueAny.map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0)
    : null;

  let index = parseInt(localStorage.getItem(iKey) || "0", 10);
  const last = parseInt(localStorage.getItem(lastKey) || "0", 10);

  // init / repair
  if (!Array.isArray(queue) || queue.length !== ids.length) {
    queue = shuffle(ids);
    index = 0;
  }
  if (index < 0 || index >= queue.length) index = 0;

  // pick verse id
  let verseId = queue[index];

  // avoid consecutive duplicates (across cycles)
  if (verseId === last && queue.length > 1) {
    verseId = queue[(index + 1) % queue.length];
  }

  // advance pointer
  index += 1;

  // if finished, reshuffle for next time
  if (index >= queue.length) {
    queue = shuffle(ids);
    index = 0;
  }

  // persist
  localStorage.setItem(qKey, JSON.stringify(queue));
  localStorage.setItem(iKey, String(index));
  localStorage.setItem(lastKey, String(verseId));

  // return verse
  const found = verses.find((v) => v.id === verseId);
  return found ?? verses[0];
}

// ---------- page ----------
export default function SelahPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const [showTimer, setShowTimer] = useState(true);


  const minutes = useMemo(() => {
    const m = parseInt(sp.get("m") || "5", 10);
    return [3, 5, 10].includes(m) ? m : 5;
  }, [sp]);

  const [verse, setVerse] = useState<VerseN | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const timerRef = useRef<number | null>(null);

  // Load verse whenever page loads (or when user re-enters)
  useEffect(() => {
    let cancelled = false;

    nextVerse()
      .then((v) => {
        if (!cancelled) {
          setVerse(v);
          setError(null);
        }
      })
      .catch((e: any) => {
        if (!cancelled) {
          setError(e?.message || "讀取經文失敗");
          setVerse(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Reset timer when minutes changes
  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  // Start countdown
  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  // When done, go to /done
  useEffect(() => {
    if (secondsLeft <= 0) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (navigator.vibrate) navigator.vibrate(200);
      const v = verse ? Number(verse.id) : "";
      router.replace(v ? `/done?v=${v}` : "/done");

    }
  }, [secondsLeft, router, verse]);

  
  useEffect(() => {
    setShowTimer(true);
    const t = window.setTimeout(() => setShowTimer(false), 3000);
    return () => window.clearTimeout(t);
  }, []);
  

  return (
    <main style={styles.page}>
      
      <div aria-hidden="true" style={styles.dustLayer}>
      <span style={styles.dustA} />
      <span style={styles.dustB} />
      </div>

      <Link href="/time" style={styles.back}>
        ←
      </Link>

      <div style={styles.centerBlock}>
        {error ? (
          <div style={styles.error}>
            <div style={{ fontSize: 16, marginBottom: 10 }}>經文載入失敗</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>{error}</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 10 }}>
              請檢查 public/verses.json 是否為有效 JSON（只有一個 [ ... ]）。
            </div>
          </div>
        ) : (
          <div style={styles.verse}>
            {verse ? (
              <>
                {verse.verse_zh}
                <div style={styles.ref}>（{verse.reference}）</div>
              </>
            ) : (
              <div style={{ opacity: 0.6 }}>……</div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          if (timerRef.current) window.clearInterval(timerRef.current);
          const v = verse ? Number(verse.id) : "";
          router.replace(v ? `/done?v=${v}` : "/done");
        }}        
        style={styles.exit}
      >
        結束
      </button>

      <div
  style={styles.bottom}
  onClick={() => {
    setShowTimer(true);
    window.setTimeout(() => setShowTimer(false), 3000);
  }}
>
  {showTimer ? (
    <div style={styles.timer}>{formatMMSS(Math.max(0, secondsLeft))}</div>
  ) : (
    <div style={styles.selahWord}>SELAH</div>
  )}
  <div style={styles.hint}>
    {showTimer ? "點一下隱藏" : "點一下顯示時間"}
  </div>
</div>


    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100svh",
    background: BG,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 24px 56px"
  },
  back: {
    alignSelf: "flex-start",
    textDecoration: "none",
    color: TEXT,
    fontSize: 22,
    opacity: 0.6,
  },
  centerBlock: {
    width: "100%",
    maxWidth: 520,
    textAlign: "center",
    marginTop: 40,
  },
  verse: {
    fontSize: 22,
    lineHeight: 1.8,
    color: TEXT,
    letterSpacing: 0.2,
  },
  ref: {
    marginTop: 14,
    fontSize: 14,
    opacity: 0.8,
  },
  timer: {
    fontSize: 38,
    color: TEXT,
    opacity: 0.78,
    letterSpacing: 2,
  },
  error: {
    padding: 18,
    borderRadius: 16,
    background: "rgba(90, 62, 43, 0.06)",
    color: TEXT,
    lineHeight: 1.6,
  },
  exit: {
    border: "none",
    background: "transparent",
    color: TEXT,
    opacity: 0.35,
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 10,
  },
  bottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  selahWord: {
    fontSize: 22,
    letterSpacing: 6,
    color: TEXT,
    opacity: 0.5,
    animation: "selahPulse 4.2s ease-in-out infinite",
  },
  hint: {
    fontSize: 12,
    color: TEXT,
    opacity: 0.22,
    letterSpacing: 1,
  },  
  
  dustLayer: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  
  dustA: {
    position: "absolute",
    inset: "-40%",
    background:
      "radial-gradient(circle at 20% 30%, rgba(90,62,43,0.10) 0 1px, transparent 2px)," +
      "radial-gradient(circle at 70% 20%, rgba(90,62,43,0.08) 0 1px, transparent 2px)," +
      "radial-gradient(circle at 40% 80%, rgba(90,62,43,0.09) 0 1px, transparent 2px)," +
      "radial-gradient(circle at 85% 75%, rgba(90,62,43,0.07) 0 1px, transparent 2px)," +
      "radial-gradient(circle at 10% 65%, rgba(90,62,43,0.06) 0 1px, transparent 2px)",
    filter: "blur(0.2px)",
    animation: "selahDriftA 10s ease-in-out infinite",
    opacity: 0.18,
  },
  
  dustB: {
    position: "absolute",
    inset: "-50%",
    background:
      "radial-gradient(circle at 30% 20%, rgba(90,62,43,0.08) 0 1px, transparent 2px)," +
      "radial-gradient(circle at 60% 40%, rgba(90,62,43,0.07) 0 1px, transparent 2px)," +
      "radial-gradient(circle at 15% 85%, rgba(90,62,43,0.06) 0 1px, transparent 2px)," +
      "radial-gradient(circle at 90% 55%, rgba(90,62,43,0.06) 0 1px, transparent 2px)",
    filter: "blur(0.3px)",
    animation: "selahDriftB 14s ease-in-out infinite",
    opacity: 0.14,
  },
  
};
