import { openai } from "./openai.js";

export async function culturalInterpreterAgent(query) {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a cultural interpreter for Indian craft motifs and meanings." },
        { role: "user", content: `Explain the cultural meaning and context of: "${query}". Keep answer concise (1-2 short paragraphs).` }
      ],
      max_tokens: 300
    });

    return { explanation: res.choices[0].message.content.trim() };
  } catch (err) {
    console.error("culturalInterpreterAgent error:", err);
    return { error: err.message };
  }
}
