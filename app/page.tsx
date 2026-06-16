"use client";

import { useState } from "react";
import Image from "next/image";
import { STS_CARDS, StsCard } from "./data/cards";
import { STS_RELICS, StsRelic } from "./data/relics";

const CHARACTERS = ["All", "Ironclad", "Silent", "Defect", "Watcher", "Colorless"] as const;

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<"main" | "database" | "deckbuilder">("main");
  const [viewMode, setViewMode] = useState<"cards" | "relics">("cards");
  const [selectedChar, setSelectedChar] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [showUpgraded, setShowUpgraded] = useState<boolean>(false);
  const [isDeckbuildingEnabled, setIsDeckbuildingEnabled] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<string>("All");

  const [customDeck, setCustomDeck] = useState<(StsCard & { deckInstanceId: string; isUpgradedInDeck: boolean })[]>([]);
  const [deckName, setDeckName] = useState<string>("My Deck");

  const addCardToDeck = (card: StsCard) => {
    const lockedCharacterCard = customDeck.find((c) => c.character !== "Colorless");
    const lockedClass = lockedCharacterCard ? lockedCharacterCard.character : null;

    if (lockedClass && card.character !== "Colorless" && card.character !== lockedClass) {
      alert(`You cannot add cards from ${card.character} because your deck is locked to ${lockedClass}.`);
      return;
    }
    const newCardInstance = {
      ...card,
      deckInstanceId: crypto.randomUUID(),
      isUpgradedInDeck: showUpgraded,
    };
    setCustomDeck((prevDeck) => [...prevDeck, newCardInstance]);
  };

  const removeCardFromDeck = (deckInstanceId: string) => {
    setCustomDeck((prevDeck) => prevDeck.filter((card) => card.deckInstanceId !== deckInstanceId));
  };

  const toggleCardUpgradeInDeck = (deckInstanceId: string) => {
    setCustomDeck((prevDeck) =>
      prevDeck.map((card) =>
        card.deckInstanceId === deckInstanceId
          ? { ...card, isUpgradedInDeck: !card.isUpgradedInDeck }
          : card
      )
    );
  };

  const clearDeck = () => {
    if (confirm("Are you sure you want to clear the deck? This action cannot be undone.")) {
      setCustomDeck([]);
    }
  };

  const attackCounter = customDeck.filter((card) => card.type === "Attack").length;
  const skillCounter = customDeck.filter((card) => card.type === "Skill").length;
  const powerCounter = customDeck.filter((card) => card.type === "Power").length;

  const costDistribution = customDeck.reduce((acc, card) => {
    const costInt = parseInt(card.cost);
    const costKey = isNaN(costInt) ? (card.cost === "X" ? "X" : "0") : card.cost;
    acc[costKey] = (acc[costKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
    const basePath = process.env.NODE_ENV === 'production' ? '/sts-decks' : '';
    return `${basePath}/resources/sts1/cards/card_images/${prefix}${baseName}${suffix}.png`;
  };

  const getRelicImagePath = (relic: StsRelic) => {
    const baseName = relic.name.replace(/[\s\-_']/g, "");
    const basePath = process.env.NODE_ENV === 'production' ? '/sts-decks' : '';
    return `${basePath}/resources/sts1/relics/relic_images/${baseName}.png`;
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
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans antialiased">
      
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between shrink-0 h-full z-30">
        <div>
          <div className="p-6 border-b border-zinc-800/60">
            <h1 
              onClick={() => setActiveMenu("main")}
              className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400 uppercase">
                STS Database
            </h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest mt-0.5">V1.0</p>
          </div>

          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveMenu("database")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide uppercase transition duration-150 ${
                activeMenu === "database"
                  ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
              }`}
            >
              <span></span> Database
            </button>
            
            <button
              onClick={() => setActiveMenu("deckbuilder")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide uppercase transition duration-150 ${
                activeMenu === "deckbuilder"
                  ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span></span> Deckbuilder
              </div>
              {customDeck.length > 0 && (
                <span className="bg-amber-500/20 text-amber-400 font-mono text-[10px] px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                  {customDeck.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800/60 bg-zinc-950/40 m-3 rounded-xl">
          <div className="text-[10px] text-zinc-500 font-mono">ACTIVE DECK PROFILE</div>
          <div className="text-xs font-bold text-zinc-300 mt-1 truncate">{deckName}</div>
          <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-zinc-400">
            <span>{attackCounter}⚔️</span>
            <span>{skillCounter}🛡️</span>
            <span>{powerCounter}⚡</span>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col h-full">
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {activeMenu === "main" && (
          <div 
            style = {{ backgroundImage: `url('${process.env.NODE_ENV === "production" ? "/sts-decks" : ""}/resources/sts1/background.webp')` }}
            className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
            <h2 className="text-2xl font-bold text-zinc-100 tracking-wide">Welcome to the STS Database & Deckbuilder</h2>
            <p className="text-sm text-zinc-400 max-w-md">
              Explore the complete database of cards and relics from Slay the Spire, and build your own custom decks.
            </p>
            <button
              onClick={() => setActiveMenu("database")}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-bold text-sm px-6 py-3 rounded-lg shadow-md transition"
            >
              Go to Database
            </button>
          </div>
        )}
        {activeMenu === "database" && (
          <>
            <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 py-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <h2 className="text-base font-bold text-zinc-200 uppercase tracking-wide">Card/Relic Database</h2>
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
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                >
                  clear
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                    {char === "Colorless" && viewMode === "relics" ? "Shared" : char}
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

                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-400 hover:text-zinc-200">
                        <input
                          type="checkbox"
                          checked={showUpgraded}
                          onChange={(e) => setShowUpgraded(e.target.checked)}
                          className="accent-amber-500 h-4 w-4 rounded bg-zinc-900 border-zinc-800"
                        />
                        <span className={`font-semibold transition ${showUpgraded ? "text-amber-400" : ""}`}>
                          Show Upgraded (+)
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-400 hover:text-zinc-200">
                        <input
                          type="checkbox"
                          checked={isDeckbuildingEnabled}
                          onChange={(e) => setIsDeckbuildingEnabled(e.target.checked)}
                          className="accent-purple-500 h-4 w-4 rounded bg-zinc-900 border-zinc-800"
                        />
                        <span className={`font-semibold transition ${isDeckbuildingEnabled ? "text-purple-400" : ""}`}>
                          Enable Deckbuilding
                        </span>
                      </label>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="font-medium text-zinc-500">Tier:</span>
                    {["All", "Starter", "Common", "Uncommon", "Rare", "Boss", "Shop", "Blight"].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedTier(tier)}
                        className={`px-2.5 py-1 rounded transition ${selectedTier === tier ? "text-zinc-100 bg-zinc-800 font-medium" : "hover:text-zinc-200"}`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {viewMode === "cards" ? (
                filteredCards.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-4">
                    {filteredCards.map((card) => (
                      <div key={card.id} className={`flex flex-col overflow-hidden bg-zinc-900/20 border rounded-xl shadow-lg hover:shadow-xl transition duration-200 group relative ${getBorderColor(card.character)}`}>
                        
                        <div className="relative w-full aspect-[5/6] bg-zinc-950/50 flex items-center justify-center border-b border-zinc-900/40">
                          <Image
                            key={`${card.id}-${showUpgraded ? 'upgraded' : 'normal'}`}
                            src={getCardImagePath(card, showUpgraded)}
                            alt={card.name}
                            fill
                            sizes="(max-w-640px) 50vw, 20vw"
                            className="object-contain p-2 group-hover:scale-102 transition duration-300"
                          />
                          {isDeckbuildingEnabled && (
                          <div className="absolute inset-0 bg-zinc-950/70 opacity-0 group-hover:opacity-100 transition duration-150 flex flex-col items-center justify-center p-4 text-center space-y-2">
                            {(() => {
                              const lockedCharacterCard = customDeck.find((c) => c.character !== "Colorless");
                              const lockedClass = lockedCharacterCard ? lockedCharacterCard.character : null;
                              const isForbidden = lockedClass && card.character !== "Colorless" && card.character !== lockedClass;

                              if (isForbidden) {
                                return (
                                  <div className="text-red-400 text-[10px] font-bold uppercase tracking-wide">
                                    Cannot add {card.character} cards to a {lockedClass} deck.
                                  </div>
                                );
                              }
                              return (
                                <button
                              onClick={() => addCardToDeck(card)}
                              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs px-4 py-2 rounded-lg shadow-md transition transform active:scale-95"
                            >
                              Add to Custom Deck
                            </button>
                              )
                            })()}
                          </div>
                          )}
                        </div>

                        <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <h3 className={`font-bold text-sm tracking-wide ${showUpgraded ? "text-amber-400" : "text-zinc-200"}`}>
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
                  <div className="text-center py-20 border border-dashed border-zinc-900 rounded-2xl text-zinc-500 text-sm">No cards matched your filter.</div>
                )
              ) : (
                filteredRelics.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredRelics.map((relic) => (
                      <div key={relic.id} className="flex flex-col bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 rounded-xl p-4 shadow-md transition duration-200 items-center text-center justify-between space-y-3 group">
                        <div className="relative w-16 h-16 bg-zinc-950 rounded-lg border border-zinc-800/60 flex items-center justify-center p-2">
                          <Image src={getRelicImagePath(relic)} alt={relic.name} fill sizes="64px" className="object-contain p-1.5" />
                        </div>
                        <div className="space-y-1 w-full">
                          <h3 className="font-bold text-xs text-zinc-200 tracking-wide line-clamp-1">{relic.name}</h3>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 font-semibold border border-zinc-800/40 text-zinc-400">{relic.tier}</span>
                          <p className="text-[11px] text-zinc-400 leading-normal pt-2 line-clamp-3 group-hover:line-clamp-none">{relic.description}</p>
                        </div>
                        <div className="text-[8px] tracking-widest uppercase font-bold text-zinc-600 pt-1 w-full text-right">{relic.character}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border border-dashed border-zinc-900 rounded-2xl text-zinc-500 text-sm">No relics matched your filter.</div>
                )
              )}
            </div>
          </>
        )}
        { activeMenu === "deckbuilder" && (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="border-b border-zinc-900 bg-zinc-950/80 p-6 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <input
                  type="text"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  className="bg-transparent text-lg font-bold text-zinc-100 border border-transparent hover:border-zinc-800 focus:border-zinc-600 focus:outline-none transition pb-0.5"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={clearDeck}
                  disabled={customDeck.length === 0}
                  className="border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-300 font-semibold text-xs px-4 py-2 rounded-lg transition"
                >
                  Clear Deck
                </button>
                <button
                  onClick={() => { alert("Deck saved locally inside compilation engine state!"); }}
                  disabled={customDeck.length === 0}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 text-zinc-950 font-bold text-xs px-5 py-2 rounded-lg shadow-md transition"
                >
                  Export Deck
                </button>
                <button
                  onClick={() => { alert("Deck imported from local compilation engine state!"); }}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-zinc-950 font-bold text-xs px-5 py-2 rounded-lg shadow-md transition"
                >
                  Import Custom Deck
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-baseline gap-2 mt-2">
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center font-mono text-xs">
                    <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-900">
                      <div className="text-red-400 font-bold">{attackCounter}</div>
                      <div className="text-[9px] text-zinc-500 uppercase mt-0.5">Attacks</div>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-900">
                      <div className="text-emerald-400 font-bold">{skillCounter}</div>
                      <div className="text-[9px] text-zinc-500 uppercase mt-0.5">Skills</div>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-900">
                      <div className="text-blue-400 font-bold">{powerCounter}</div>
                      <div className="text-[9px] text-zinc-500 uppercase mt-0.5">Powers</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-widest mb-4">Deck</h3>
                
                {customDeck.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-4">
                    {customDeck.map((card) => (
                      <div key={card.deckInstanceId} className={`flex flex-col overflow-hidden bg-zinc-900/40 border rounded-xl shadow transition group relative ${getBorderColor(card.character)}`}>
                        
                        <div className="relative w-full aspect-[5/6] bg-zinc-950/50 flex items-center justify-center border-b border-zinc-900/40">
                          <Image
                            key={`${card.deckInstanceId}-${card.isUpgradedInDeck ? 'upgraded' : 'normal'}`}
                            src={getCardImagePath(card, card.isUpgradedInDeck)}
                            alt={card.name}
                            fill
                            sizes="(max-w-640px) 50vw, 20vw"
                            className="object-contain p-2"
                          />
                          
                          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition duration-150">
                            <button
                              onClick={() => toggleCardUpgradeInDeck(card.deckInstanceId)}
                              className={`text-[10px] font-mono px-1.5 py-1 rounded border shadow font-bold tracking-wide transition ${
                                card.isUpgradedInDeck 
                                  ? "bg-amber-500 text-zinc-950 border-amber-400"
                                  : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                              }`}
                              title="Toggle Upgrade Version status"
                            >
                              {card.isUpgradedInDeck ? "UPGRADED" : "UPGRADE"}
                            </button>
                            <button
                              onClick={() => removeCardFromDeck(card.deckInstanceId)}
                              className="bg-red-950/80 hover:bg-red-900 text-red-400 text-[10px] font-mono px-1.5 py-1 rounded border border-red-900/50 font-bold transition shadow"
                              title="Remove card instance from deck build"
                            >
                              DELETE
                            </button>
                            <button
                              onClick={() => addCardToDeck(card)}
                              className="bg-zinc-950/80 hover:bg-zinc-900 text-zinc-400 text-[10px] font-mono px-1.5 py-1 rounded border border-zinc-800/50 font-bold transition shadow"
                              title="View card details"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-zinc-950/60 flex items-center justify-between text-xs border-t border-zinc-900/50">
                          <span className={`font-bold truncate max-w-[70%] ${card.isUpgradedInDeck ? "text-amber-400" : "text-zinc-200"}`}>
                            {card.name}{card.isUpgradedInDeck && "+"}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono uppercase font-semibold">{card.type}</span>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 border border-dashed border-zinc-900 rounded-2xl">
                    <p className="text-zinc-500 text-sm">Your deck is completely empty.</p>
                    <button
                      onClick={() => setActiveMenu("database")}
                      className="mt-3 text-xs font-bold text-amber-400 hover:text-amber-300 transition underline underline-offset-4"
                    >
                      Head back to the Database to add cards
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
        
      </main>
      <footer className="w-full border-t border-zinc-900 bg-zinc-950/60 backdrop-blur-md py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-zinc-500">
        
        {/* Left Side: Versioning & Copyright */}
        <div className="flex items-center gap-2">
          <span>© STS Database. All rights reserved.</span>
        </div>

        {/* Center: Legal Attributions Disclaimer */}
        <div className="text-center sm:text-right text-zinc-600 max-w-md leading-normal">
          Disclaimer: All game assets, images, and trademarks are property of their respective owners. This site is not affiliated with or endorsed by Mega Crit.
        </div>
        
      </div>
    </footer>
    </div>
    </div>
  );
}