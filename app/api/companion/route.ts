// app/api/companion/route.ts
import OpenAI from "openai";

export const runtime = "nodejs"; // ✅ 保證用 Node runtime（Vercel/Next 最穩）

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
        {
          role: "system",
          content:
            "你係一位溫柔、簡潔、用粵語書面回覆嘅屬靈陪伴者。回覆要短句、唔說教、唔引用長篇經文；可以鼓勵人安靜、交託。",
        },
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
