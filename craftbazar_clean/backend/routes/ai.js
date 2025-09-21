import express from "express";
import { craftFinderAgent } from "../ai/craftFinder.js";
import { giftRecommenderAgent } from "../ai/giftRecommender.js";
import { culturalInterpreterAgent } from "../ai/culturalInterpreter.js";
import { storyWeaverAgent } from "../ai/storyWeaver.js";
import { marketTrendAnalyzerAgent } from "../ai/marketTrendAnalyzer.js";
import { supplyChainOptimizerAgent } from "../ai/supplyChainOptimizer.js";
import { pricingAdvisorAgent } from "../ai/pricingAdvisor.js";
import { sustainabilityGuideAgent } from "../ai/sustainabilityGuide.js";
import { languageBridgeAgent } from "../ai/languageBridge.js";
import { communityBuilderAgent } from "../ai/communityBuilder.js";

const router = express.Router();

const agents = {
  "craft-finder": craftFinderAgent,
  "gift-recommender": giftRecommenderAgent,
  "cultural-interpreter": culturalInterpreterAgent,
  "story-weaver": storyWeaverAgent,
  "market-trend-analyzer": marketTrendAnalyzerAgent,
  "supply-chain-optimizer": supplyChainOptimizerAgent,
  "pricing-advisor": pricingAdvisorAgent,
  "sustainability-guide": sustainabilityGuideAgent,
  "language-bridge": languageBridgeAgent,
  "community-builder": communityBuilderAgent
};

router.post("/:agent", async (req, res) => {
  const { agent } = req.params;
  const fn = agents[agent];
  if (!fn) return res.status(400).json({ error: "Invalid agent" });

  try {
    // pass body to agent; each agent expects its own shape
    const payload = req.body || {};
    const output = await fn(payload);
    res.json({ response: output });
  } catch (err) {
    console.error("AI route error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
