import React, { useEffect, useState } from "react";
import ArtisanCard from "./components/ArtisanCard";
import ChatAssistant from "./components/ChatAssistant";

interface Product {
  name: string;
  price?: number;
  description?: string;
  image?: string;
  ecoFriendly?: boolean;
  fragile?: boolean;
}

interface Artisan {
  _id: string;
  name: string;
  craft: string;
  location?: string;
  bio?: string;
  products?: Product[];
}

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function App() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/artisans`)
      .then((r) => r.json())
      .then(setArtisans)
      .catch((e) => console.error("fetch artisans error", e));
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Craft Bazaar</h1>
        <p>Handmade. Honest. Local.</p>
      </header>

      <main>
        <ChatAssistant />
        <section>
          <h2>Featured Artisans</h2>
          <div className="artisan-grid">
            {artisans.length ? (
              artisans.map((a) => <ArtisanCard key={a._id} artisan={a} />)
            ) : (
              <p>No artisans yet. Seed the backend or add via API.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
