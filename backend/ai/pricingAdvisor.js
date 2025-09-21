import { openai } from "./openai.js";

export async function pricingAdvisorAgent(productContext) {
  try {
    const prompt = `Suggest a recommended retail price and reasoning for this product: ${JSON.stringify(productContext)}. Consider artisan margin and comparable marketplace prices. Give a short justification.`;
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a pricing expert for handicrafts." },
        { role: "user", content: prompt }
      ],
      max_tokens: 250
    });

    return { pricing: res.choices[0].message.content.trim() };
  } catch (err) {
    console.error("pricingAdvisorAgent error:", err);
    return { error: err.message };
  }
}
