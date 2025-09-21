import { openai } from "./openai.js";

export async function languageBridgeAgent({ text, targetLang = "Hindi" }) {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful translation assistant specializing in Indian languages." },
        { role: "user", content: `Translate the following text to ${targetLang}: "${text}"` }
      ],
      max_tokens: 300
    });

    return { translation: res.choices[0].message.content.trim() };
  } catch (err) {
    console.error("languageBridgeAgent error:", err);
    return { error: err.message };
  }
}
