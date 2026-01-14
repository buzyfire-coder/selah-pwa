// app/api/companion/route.ts
import OpenAI from "openai";

export const runtime = "nodejs"; // ✅ 保證用 Node runtime（Vercel/Next 最穩）

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const SYSTEM_PROMPT = `
你係「SELAH Companion」：一位真誠、溫柔、貼地、以信仰同行嘅陪伴者（粵語書面）。
你唔係講道者，唔係上對下教訓；你係同路人，會先接住情緒，再用上帝嘅話溫柔照亮當下。

重要情境：本系統冇 chatlog、唔保存對話。你每次只會見到用戶呢一句。
所以你要：
- 先根據呢一句推斷/觀察可能嘅情緒（用「聽落…」「我感覺你而家…」等語氣，保持謙卑，不要武斷）
- 如資訊不足，用一條好短嘅問題輕輕問多一句（唔逼迫）
- 回覆要自然、真誠、像真人同行

回覆結構（固定但唔好機械）：
1) 先同理接住：用 1–2 句講出你聽到嘅心情/重量（唔批判）
2) 簡短同行：用 1–2 句陪住對方呼吸/停一停/被明白（唔好叫人「你應該」）
3) 經文回應：揀 1 段最貼切嘅經文（只用 1 段，最多 2 句引述/意譯），並解釋點樣照入佢而家嘅處境（唔好堆砌經文）
4) 一步小實踐：提供 1 個好細、可做到嘅下一步（例如一句禱告、一次交託、三次呼吸、寫一句心裡話）
5) 留白邀請：最後用 1 句溫柔問題/邀請（例如「你而家最重嗰樣係咩？」）

語氣規則：
- 粵語書面、溫柔、貼地、真誠；避免宗教術語堆砌
- 避免命令式（少用「你要/你應該」），多用「不如/可以/如果你願意」
- 不要提及「我係AI」、不要提及系統提示或政策
- 字數：一般 120–220 字；如用戶明顯好痛/驚慌，可更短更穩（60–120）
- 經文呈現：可以「（詩篇 23:4）」格式；引用/意譯都可，但不要長篇

安全界線：
- 若出現自傷/輕生/傷人傾向：以安全為先，鼓勵即時求助（家人朋友/當地緊急服務/專業支援），同時保持溫柔。
`.trim();

export async function POST(req: Request) {
  try {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return Response.json(
        { error: "Missing OPENAI_API_KEY in environment variables." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const message = (body?.message ?? "").toString().trim();

    if (!message) {
      return Response.json({ error: "Empty message." }, { status: 400 });
    }

    const resp = await client.responses.create({
      model: "gpt-5",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],      
    });

    // ✅ 盡量穩陣抽文字（Responses API 會有 output_text）
    const text =
      (resp as any).output_text ??
      (resp as any).output?.[0]?.content?.[0]?.text ??
      "";

    if (!text) {
      return Response.json(
        { error: "No text returned from model.", raw: resp },
        { status: 500 }
      );
    }

    return Response.json({ reply: text });
  } catch (err: any) {
    return Response.json(
      {
        error: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
