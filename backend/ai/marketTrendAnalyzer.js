import { openai } from "./openai.js";

export async function marketTrendAnalyzerAgent(context) {
  try {
    const prompt = `Given this context: ${context}. Provide concise market trends and 3 actionable recommendations for small artisans to increase sales.`;
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a market analyst specialized in artisan goods." },
        { role: "user", content: prompt }
      ],
      max_tokens: 400
    });

    return { trends: res.choices[0].message.content.trim() };
  } catch (err) {
    console.error("marketTrendAnalyzerAgent error:", err);
    return { error: err.message };
  }
}
