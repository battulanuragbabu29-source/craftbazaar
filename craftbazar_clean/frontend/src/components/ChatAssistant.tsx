import React, { useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

type AgentKey =
  | "craft-finder"
  | "gift-recommender"
  | "cultural-interpreter"
  | "story-weaver"
  | "market-trend-analyzer"
  | "supply-chain-optimizer"
  | "pricing-advisor"
  | "sustainability-guide"
  | "language-bridge"
  | "community-builder";

const suggestedPrompts = [
  "I'm looking for a sustainable Diwali lamp",
  "Gift idea for my mother who likes elegant home decor",
  "What does the lotus motif mean?",
  "Tell me the artisan's story",
  "Recommend packaging for fragile pottery"
];

function ChatAssistant() {
  const [query, setQuery] = useState("");
  const [agent, setAgent] = useState<AgentKey>("craft-finder");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/api/ai/${agent}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          agent === "language-bridge" ? { text: query, targetLang: "Hindi" } : { query }
        )
      });
      const json = await resp.json();
      const out = json.response;
      setHistory((h) => [
        ...h,
        `You: ${query}`,
        `AI (${agent}): ${JSON.stringify(out).slice(0, 1000)}`
      ]);
      setQuery("");
    } catch (e: any) {
      setHistory((h) => [
        ...h,
        `You: ${query}`,
        `Error: ${e.message || "Failed to fetch response"}`
      ]);
    }
    setLoading(false);
  }

  return (
    <div className="chat-assistant">
      <h2>Marketplace Assistant</h2>

      <div className="assistant-controls">
        <select value={agent} onChange={(e) => setAgent(e.target.value as AgentKey)}>
          <option value="craft-finder">Craft Finder</option>
          <option value="gift-recommender">Gift Recommender</option>
          <option value="cultural-interpreter">Cultural Interpreter</option>
          <option value="story-weaver">Story Weaver</option>
          <option value="market-trend-analyzer">Market Trend Analyzer</option>
          <option value="supply-chain-optimizer">Supply Chain Optimizer</option>
          <option value="pricing-advisor">Pricing Advisor</option>
          <option value="sustainability-guide">Sustainability Guide</option>
          <option value="language-bridge">Language Bridge</option>
          <option value="community-builder">Community Builder</option>
        </select>

        <div className="suggested">
          {suggestedPrompts.map((p) => (
            <button key={p} onClick={() => setQuery(p)}>{p}</button>
          ))}
        </div>
      </div>

      <div className="chat-input">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask the assistant..."
          aria-label="Chat input"
        />
        <button onClick={send} disabled={loading}>{loading ? "Thinking…" : "Send"}</button>
      </div>

      <div className="chat-history">









export default ChatAssistant;}  );    </div>      </div>        ))}          <pre key={i + h} className="chat-line">{h}</pre>        {history.slice().reverse().map((h, i) => (        {history.slice().reverse().map((h, i) => (
          <pre key={i + h} className="chat-line">{h}</pre>
        ))}
      </div>
    </div>
  );
}

export default ChatAssistant;
