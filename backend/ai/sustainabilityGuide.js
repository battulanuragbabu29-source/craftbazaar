import { openai } from "./openai.js";

export async function sustainabilityGuideAgent(context) {
  try {
    const prompt = `Provide eco-friendly suggestions and an estimated plastic reduction if artisan switches to eco packaging for: ${context}. Keep it practical and provide 3 tips.`;
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an eco-advisor for artisan packaging & sourcing." },
        { role: "user", content: prompt }
      ],
      max_tokens: 300
    });

    return { ecoTips: res.choices[0].message.content.trim() };
  } catch (err) {
    console.error("sustainabilityGuideAgent error:", err);
    return { error: err.message };
  }
}
