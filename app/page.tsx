"use client";

import { useState } from "react";
import Image from "next/image";
import { STS_CARDS, StsCard } from "./data/cards";
import { STS_RELICS, StsRelic } from "./data/relics";

const CHARACTERS = ["All", "Ironclad", "Silent", "Defect", "Watcher", "Colorless"] as const;

export default function Home() {
  const [viewMode, setViewMode] = useState<"cards" | "relics">("cards");
  const [selectedChar, setSelectedChar] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [showUpgraded, setShowUpgraded] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<string>("All");

  const getFilePrefix = (character: string) => {
    switch (character) {
      case "Ironclad": return "Red-";
      case "Silent": return "Green-";
      case "Defect": return "Blue-";
      case "Watcher": return "Purple-";
      default: return "Colorless-";
    }
  };

  const getCardImagePath = (card: StsCard, upgraded: boolean) => {
    const prefix = getFilePrefix(card.character);
    const baseName = card.name.replace(/[\s\_]/g, "");
    const suffix = upgraded ? "Plus" : "";
    return `/resources/sts1/cards/card_images/${prefix}${baseName}${suffix}.png`;
  };

  const getRelicImagePath = (relic: StsRelic) => {
    const baseName = relic.name.replace(/[\s\-_']/g, "");
    return `/resources/sts1/relics/relic_images/${baseName}.png`;
  }

  const filteredCards = STS_CARDS.filter((card) => {
    const matchesChar = selectedChar === "All" || card.character === selectedChar;
    const matchesType = selectedType === "All" || card.type === selectedType;
    const descToSearch = showUpgraded ? card.upgradedDescription : card.description;
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          descToSearch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChar && matchesType && matchesSearch;
  });

  const filteredRelics = STS_RELICS.filter((relic) => {
    const relicCharMapping = selectedChar === "Colorless" ? "Shared" : selectedChar;
    const matchesChar = selectedChar === "All" || relic.character === relicCharMapping || relic.character === "Shared";
    const matchesTier = selectedTier === "All" || relic.tier === selectedTier;
    const matchesSearch = relic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          relic.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChar && matchesTier && matchesSearch;
  });

  const getBorderColor = (character: string) => {
    switch (character) {
      case "Ironclad": return "border-red-900/60 hover:border-red-500 shadow-red-950/10";
      case "Silent": return "border-emerald-900/60 hover:border-emerald-500 shadow-emerald-950/10";
      case "Defect": return "border-blue-900/60 hover:border-blue-500 shadow-blue-950/10";
      case "Watcher": return "border-purple-900/60 hover:border-purple-500 shadow-purple-950/10";
      default: return "border-zinc-800 hover:border-zinc-500 shadow-zinc-950/10";
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800">
      
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-800 uppercase">
                Slay The Spire Database
              </h1>
            </div>
            
            <nav className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs font-semibold">
              <button
                onClick={() => { setViewMode("cards"); setSearchQuery(""); }}
                className={`px-4 py-1.5 rounded-md transition ${viewMode === "cards" ? "bg-zinc-800 text-zinc-100 shadow" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                Cards ({STS_CARDS.length})
              </button>
              <button
                onClick={() => { setViewMode("relics"); setSearchQuery(""); }}
                className={`px-4 py-1.5 rounded-md transition ${viewMode === "relics" ? "bg-zinc-800 text-zinc-100 shadow" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                Relics ({STS_RELICS.length})
              </button>
            </nav>
          </div>
          
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder={`Search ${viewMode}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600 transition text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        
        <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-4">
          {CHARACTERS.map((char) => (
            <button
              key={char}
              onClick={() => setSelectedChar(char)}
              className={`px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition uppercase ${
                selectedChar === char
                  ? "bg-zinc-100 text-zinc-950 shadow-md"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              }`}
            >
              {char === "Colorless" && viewMode === "relics" ? "Shared / Neutral" : char}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/30 p-3 rounded-lg border border-zinc-900/60 text-xs">
          
          {viewMode === "cards" ? (
            <>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="font-medium text-zinc-500">Type:</span>
                {["All", "Attack", "Skill", "Power"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-2.5 py-1 rounded transition ${selectedType === type ? "text-zinc-100 bg-zinc-800 font-medium" : "hover:text-zinc-200"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Upgrade Toggle Switch */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-400 hover:text-zinc-200">
                <input
                  type="checkbox"
                  checked={showUpgraded}
                  onChange={(e) => setShowUpgraded(e.target.checked)}
                  className="accent-amber-500 h-4 w-4 rounded bg-zinc-900 border-zinc-800 cursor-pointer"
                />
                <span className={`font-semibold transition ${showUpgraded ? "text-amber-400" : ""}`}>
                  Show Upgraded (+) Versions
                </span>
              </label>
            </>
          ) : (
            <>
              {/* Relic Tier Filters */}
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="font-medium text-zinc-500">Tier:</span>
                {["All", "Starter", "Common", "Uncommon", "Rare", "Boss", "Shop", "Event", "Blight", "Special"].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-2.5 py-1 rounded transition ${selectedTier === tier ? "text-zinc-100 bg-zinc-800 font-medium" : "hover:text-zinc-200"}`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-zinc-500 font-mono">Displaying filtered relic assets</div>
            </>
          )}
        </div>

        {viewMode === "cards" && (
          filteredCards.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredCards.map((card) => (
                <div key={card.id} className={`flex flex-col overflow-hidden bg-zinc-900/20 border rounded-xl shadow-lg hover:shadow-xl transition duration-200 group ${getBorderColor(card.character)}`}>
                  <div className="relative w-full aspect-[5/6] bg-zinc-950/50 flex items-center justify-center border-b border-zinc-900/40">
                    <Image
                      src={getCardImagePath(card, showUpgraded)}
                      alt={card.name}
                      fill
                      sizes="(max-w-640px) 50vw, 20vw"
                      className="object-contain p-2 group-hover:scale-102 transition duration-300"
                    />
                  </div>
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-bold text-sm tracking-wide transition ${showUpgraded ? "text-amber-400" : "text-zinc-200"}`}>
                          {card.name}{showUpgraded && "+"}
                        </h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-amber-400 font-mono font-bold">
                          {card.cost} E
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed mt-2 min-h-[40px]">
                        {showUpgraded ? card.upgradedDescription : card.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-900/50 text-[9px] uppercase tracking-wider font-bold">
                      <span className="text-zinc-500">{card.type}</span>
                      <span className={card.rarity === "Rare" ? "text-amber-500" : card.rarity === "Uncommon" ? "text-blue-400" : "text-zinc-400"}>
                        {card.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-zinc-900 rounded-2xl">
              <p className="text-zinc-500 text-sm">No cards matched your filter criteria.</p>
            </div>
          )
        )}

        {viewMode === "relics" && (
          filteredRelics.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredRelics.map((relic) => (
                <div key={relic.id} className="flex flex-col bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 rounded-xl p-4 shadow-md transition duration-200 items-center text-center justify-between space-y-3 group">
                  <div className="relative w-16 h-16 bg-zinc-950 rounded-lg border border-zinc-800/60 flex items-center justify-center p-2 group-hover:bg-zinc-900 transition">
                    <Image
                      src={getRelicImagePath(relic)}
                      alt={relic.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1.5 group-hover:scale-105 transition duration-200"
                    />
                  </div>

                  <div className="space-y-1 w-full">
                    <h3 className="font-bold text-xs text-zinc-200 tracking-wide line-clamp-1">{relic.name}</h3>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 font-semibold border border-zinc-800/40 ${
                      relic.tier === "Rare" || relic.tier === "Boss" ? "text-amber-400" : relic.tier === "Uncommon" ? "text-blue-400" : "text-zinc-400"
                    }`}>
                      {relic.tier}
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-normal pt-2 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {relic.description}
                    </p>
                  </div>

                  <div className="text-[8px] tracking-widest uppercase font-bold text-zinc-600 pt-1 w-full text-right">
                    {relic.character}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-zinc-900 rounded-2xl">
              <p className="text-zinc-500 text-sm">No relics found matching your criteria.</p>
            </div>
          )
        )}
      </main>
    </div>
  );
}