import { openai } from "./openai.js";

export async function storyWeaverAgent(artisanData) {
  try {
    const prompt = `Write a warm, authentic 2-3 paragraph backstory for this artisan and their craft. Use the details: ${JSON.stringify(artisanData)}. Keep it suitable for a product page.`;
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a storyteller for artisan products." },
        { role: "user", content: prompt }
      ],
      max_tokens: 400
    });

    return { story: res.choices[0].message.content.trim() };
  } catch (err) {
    console.error("storyWeaverAgent error:", err);
    return { error: err.message };
  }
}
