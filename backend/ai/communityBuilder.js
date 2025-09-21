import { openai } from "./openai.js";

export async function communityBuilderAgent(context) {
  try {
    const prompt = `Given this context: ${context}, suggest 5 community building activities and one example agenda for a local artisan workshop.`;
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a community engagement strategist for artisans." },
        { role: "user", content: prompt }
      ],
      max_tokens: 400
    });

    return { community: res.choices[0].message.content.trim() };
  } catch (err) {
    console.error("communityBuilderAgent error:", err);
    return { error: err.message };
  }
}
