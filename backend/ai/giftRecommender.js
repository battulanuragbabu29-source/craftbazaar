import { openai } from "./openai.js";
import Artisan from "../models/Artisan.js";

export async function giftRecommenderAgent(query) {
  try {
    // Ask the model to identify gift attributes (recipient, vibe, price)
    const aiRes = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an AI gift recommender for artisan products." },
        { role: "user", content: `From this request, extract recipient, vibe, budgets: "${query}". Respond JSON like: {"recipient":"", "vibe":"", "budget":"", "keywords":""}` }
      ],
      max_tokens: 150
    });

    const parsed = aiRes.choices[0].message.content.trim();
    let obj = {};
    try {
      obj = JSON.parse(parsed);
    } catch {
      obj.keywords = parsed;
    }

    // Prefer splitting by comma for multi-word keywords
    const keywordSource = obj.keywords || obj.vibe || obj.recipient || query;
    const regex = new RegExp(keywordSource.split(",").map(k => k.trim()).join("|"), "i");
    const items = await Artisan.find({
      $or: [
        { "products.name": regex },
        { "products.description": regex },
        { craft: regex }
      ]
    }).limit(20);

    return { items, meta: obj };
  } catch (err) {
    console.error("giftRecommenderAgent error:", err);
    return { error: err.message };
  }
}
