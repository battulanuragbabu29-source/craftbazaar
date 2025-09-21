import { openai } from "./openai.js";

export async function supplyChainOptimizerAgent(context) {
  try {
    const prompt = `Suggest logistics, packaging and fulfillment optimizations for this artisan context: ${context}. Provide packaging recommendations for fragile items and cost/time tradeoffs.`;
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a logistics & packaging assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 350
    });

    return { advice: res.choices[0].message.content.trim() };
  } catch (err) {
    console.error("supplyChainOptimizerAgent error:", err);
    return { error: err.message };
  }
}
