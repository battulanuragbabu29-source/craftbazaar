import { openai } from "./openai.js";
import Artisan from "../models/Artisan.js";

export async function craftFinderAgent(query) {
  try {
    // Ask LLM to extract short search keywords
    const aiRes = await openai.chat.completions.create({
      model: "gpt-4o", // fixed model name
      messages: [
        { role: "system", content: "You are a short keyword extractor for artisan product searches." },
        { role: "user", content: `Extract 2-4 keywords from this user query: "${query}"` }
      ],
      max_tokens: 60
    });

    const keywords = aiRes.choices[0].message.content.replace(/\n/g, " ").trim();
    // Split by comma for better multi-word keyword handling
    const regex = new RegExp(keywords.split(",").map(k => k.trim()).join("|"), "i");
    const artisans = await Artisan.find({
      $or: [
        { craft: regex },
        { "products.name": regex },
        { bio: regex },
        { "products.description": regex },
        { name: regex }
      ]
    }).limit(20);

    if (!artisans.length) {
      return { items: [], message: "No exact match found. Try broader terms." };
    }
    return { items: artisans };
  } catch (err) {
    console.error("craftFinderAgent error:", err);
    return { error: err.message };
  }
}
