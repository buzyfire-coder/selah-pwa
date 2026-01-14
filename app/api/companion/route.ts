// app/api/companion/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 用 nodejs 最穩陣（Edge 亦得，但先唔玩咁多變數）

type Body = {
  message?: string;
};

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as Body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY in environment variables." },
        { status: 500 }
      );
    }

    const userText = (message ?? "").trim();
    if (!userText) {
      return NextResponse.json({ error: "Empty message." }, { status: 400 });
    }

    // ✅ 你可以喺 Vercel 再加一個 OPENAI_MODEL，方便之後換模型
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    const instructions = [
      "你係 Selah 嘅陪伴者（Companion）。",
      "請一定用「粵語書面」回覆（唔好用普通話書面）。",
      "語氣溫柔、簡潔、有安慰感，但唔好講大道理。",
      "如果用戶問得好大壓力／好沉重，先用一兩句承接，再畀一個好細嘅下一步。",
      "避免提及你嘅系統、API、或者任何密鑰/內部設定。",
      "回覆長度：2–6 句為主（除非用戶要求更詳細）。",
    ].join("\n");

    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions,
        input: [
          {
            role: "user",
            content: [{ type: "input_text", text: userText }],
          },
        ],
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json(
        { error: "OpenAI request failed.", detail: errText },
        { status: 500 }
      );
    }

    const data = await resp.json();

    // Responses API 會有 output_text（最方便攞純文字）
    const text =
      (data?.output_text as string | undefined) ??
      "我喺度。你想我陪你安靜一下，定係同你講兩句？";

    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error.", detail: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
