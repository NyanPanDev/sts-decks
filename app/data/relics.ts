export interface StsRelic {
  id: string;
  name: string;
  tier: "Starter" | "Common" | "Uncommon" | "Rare" | "Boss" | "Shop" | "Event" | "Blight";
  character: "Shared" | "Ironclad" | "Silent" | "Defect" | "Watcher";
  description: string;
}

export const STS_RELICS: StsRelic[] = [
  // ==========================================
  // STARTER RELICS
  // ==========================================
  { id: "burning-blood", name: "Burning Blood", tier: "Starter", character: "Ironclad", description: "At the end of combat, heal 6 HP." },
  { id: "ring-of-the-snake", name: "Ring of the Snake", tier: "Starter", character: "Silent", description: "At the start of each combat, draw 2 additional cards." },
  { id: "cracked-core", name: "Cracked Core", tier: "Starter", character: "Defect", description: "At the start of each combat, Channel 1 Lightning Orb." },
  { id: "pure-water", name: "Pure Water", tier: "Starter", character: "Watcher", description: "At the start of each combat, add a Miracle into your hand." },

  // ==========================================
  // COMMON RELICS
  // ==========================================
  { id: "akabeko", name: "Akabeko", tier: "Common", character: "Shared", description: "Your first Attack each combat deals 8 additional damage." },
  { id: "anchor", name: "Anchor", tier: "Common", character: "Shared", description: "Start each combat with 10 Block." },
  { id: "ancient-tea-set", name: "Ancient Tea Set", tier: "Common", character: "Shared", description: "Whenever you enter a Rest Site, start the next combat with 2 Energy." },
  { id: "art-of-war", name: "Art of War", tier: "Common", character: "Shared", description: "If you do not play any Attacks during your turn, gain an extra Energy next turn." },
  { id: "bag-of-marbles", name: "Bag of Marbles", tier: "Common", character: "Shared", description: "At the start of each combat, apply 1 Vulnerable to ALL enemies." },
  { id: "bag-of-preparation", name: "Bag of Preparation", tier: "Common", character: "Shared", description: "At the start of each combat, draw 2 additional cards." },
  { id: "blood-vial", name: "Blood Vial", tier: "Common", character: "Shared", description: "At the start of each combat, heal 2 HP." },
  { id: "bronze-scales", name: "Bronze Scales", tier: "Common", character: "Shared", description: "Start each combat with 3 Thorns." },
  { id: "centennial-puzzle", name: "Centennial Puzzle", tier: "Common", character: "Shared", description: "The first time you lose HP each combat, draw 3 cards." },
  { id: "ceramic-fish", name: "Ceramic Fish", tier: "Common", character: "Shared", description: "Whenever you add a card to your deck, gain 9 Gold." },
  { id: "damaru", name: "Damaru", tier: "Common", character: "Watcher", description: "At the start of your turn, gain 1 Mantra." },
  { id: "data-disk", name: "Data Disk", tier: "Common", character: "Defect", description: "Start each combat with 1 Focus." },
  { id: "dream-catcher", name: "Dream Catcher", tier: "Common", character: "Shared", description: "Whenever you rest, you may add a card to your deck." },
  { id: "happy-flower", name: "Happy Flower", tier: "Common", character: "Shared", description: "Every 3 turns, gain 1 Energy." },
  { id: "juzu-bracelet", name: "Juzu Bracelet", tier: "Common", character: "Shared", description: "Regular enemy combats are no longer encountered in ? rooms." },
  { id: "lantern", name: "Lantern", tier: "Common", character: "Shared", description: "Gain 1 Energy on the first turn of each combat." },
  { id: "maw-bank", name: "Maw Bank", tier: "Common", character: "Shared", description: "Whenever you climb a floor, gain 12 Gold. No longer works when you spend Gold at a shop." },
  { id: "meal-ticket", name: "Meal Ticket", tier: "Common", character: "Shared", description: "Whenever you enter a shop room, heal 15 HP." },
  { id: "nunchaku", name: "Nunchaku", tier: "Common", character: "Shared", description: "Every time you play 10 Attacks, gain 1 Energy." },
  { id: "oddly-smooth-stone", name: "Oddly Smooth Stone", tier: "Common", character: "Shared", description: "At the start of each combat, gain 1 Dexterity." },
  { id: "omamori", name: "Omamori", tier: "Common", character: "Shared", description: "Negate the next 2 Curses you obtain." },
  { id: "orichalcum", name: "Orichalcum", tier: "Common", character: "Shared", description: "If you end your turn without Block, gain 6 Block." },
  { id: "pen-nib", name: "Pen Nib", tier: "Common", character: "Shared", description: "Every 10th Attack you play deals double damage." },
  { id: "potion-belt", name: "Potion Belt", tier: "Common", character: "Shared", description: "Upon pickup, gain 2 Potion slots." },
  { id: "preserved-insect", name: "Preserved Insect", tier: "Common", character: "Shared", description: "Enemies in Elite rooms have 25% less HP." },
  { id: "red-skull", name: "Red Skull", tier: "Common", character: "Ironclad", description: "While your HP is at or below 50%, you have 3 additional Strength." },
  { id: "regal-pillow", name: "Regal Pillow", tier: "Common", character: "Shared", description: "Heal an additional 15 HP when you Rest." },
  { id: "smiling-mask", name: "Smiling Mask", tier: "Common", character: "Shared", description: "The merchant's card removal service now always costs 50 Gold." },
  { id: "snecko-skull", name: "Snecko Skull", tier: "Common", character: "Silent", description: "Whenever you apply Poison, apply an additional 1 Poison." },
  { id: "strawberry", name: "Strawberry", tier: "Common", character: "Shared", description: "Upon pickup, raise your Max HP by 7." },
  { id: "the-boot", name: "The Boot", tier: "Common", character: "Shared", description: "Whenever you would deal 4 or less unblocked Attack damage, increase it to 5." },
  { id: "tiny-chest", name: "Tiny Chest", tier: "Common", character: "Shared", description: "Every 4th ? room is a Treasure room." },
  { id: "toy-ornithopter", name: "Toy Ornithopter", tier: "Common", character: "Shared", description: "Whenever you use a potion, heal 5 HP." },
  { id: "vajra", name: "Vajra", tier: "Common", character: "Shared", description: "At the start of each combat, gain 1 Strength." },
  { id: "war-paint", name: "War Paint", tier: "Common", character: "Shared", description: "Upon pickup, Upgrade 2 random Skills in your deck." },
  { id: "whetstone", name: "Whetstone", tier: "Common", character: "Shared", description: "Upon pickup, Upgrade 2 random Attacks in your deck." },

  // ==========================================
  // UNCOMMON RELICS
  // ==========================================
  { id: "blue-candle", name: "Blue Candle", tier: "Uncommon", character: "Shared", description: "Unplayable Curse cards can now be played. Playing a Curse loses 1 HP and Exhausts it." },
  { id: "bottled-flame", name: "Bottled Flame", tier: "Uncommon", character: "Shared", description: "Upon pickup, choose an Attack card. At the start of each combat, this card will be in your hand." },
  { id: "bottled-lightning", name: "Bottled Lightning", tier: "Uncommon", character: "Shared", description: "Upon pickup, choose a Skill card. At the start of each combat, this card will be in your hand." },
  { id: "bottled-tornado", name: "Bottled Tornado", tier: "Uncommon", character: "Shared", description: "Upon pickup, choose a Power card. At the start of each combat, this card will be in your hand." },
  { id: "darkstone-periapt", name: "Darkstone Periapt", tier: "Uncommon", character: "Shared", description: "Whenever you obtain a Curse, increase your Max HP by 6." },
  { id: "eternal-feather", name: "Eternal Feather", tier: "Uncommon", character: "Shared", description: "For every 5 cards in your deck, heal 3 HP whenever you enter a Rest Site." },
  { id: "frozen-egg", name: "Frozen Egg", tier: "Uncommon", character: "Shared", description: "Whenever you add a Power card to your deck, it is Upgraded." },
  { id: "gold-plated-cables", name: "Gold-Plated Cables", tier: "Uncommon", character: "Defect", description: "Your rightmost Orb triggers its passive ability an additional time." },
  { id: "gremlin-horn", name: "Gremlin Horn", tier: "Uncommon", character: "Shared", description: "Whenever an enemy dies, gain 1 Energy and draw 1 card." },
  { id: "horn-cleat", name: "Horn Cleat", tier: "Uncommon", character: "Shared", description: "At the start of your 2nd turn, gain 14 Block." },
  { id: "ink-bottle", name: "Ink Bottle", tier: "Uncommon", character: "Shared", description: "Every time you play 10 cards, draw 1 card." },
  { id: "kunai", name: "Kunai", tier: "Uncommon", character: "Shared", description: "Every time you play 3 Attacks in a single turn, gain 1 Dexterity." },
  { id: "letter-opener", name: "Letter Opener", tier: "Uncommon", character: "Shared", description: "Every time you play 3 Skills in a single turn, deal 5 damage to ALL enemies." },
  { id: "matryoshka", name: "Matryoshka", tier: "Uncommon", character: "Shared", description: "The next 2 non-boss Chests you open contain 2 Relics." },
  { id: "meat-on-the-bone", name: "Meat on the Bone", tier: "Uncommon", character: "Shared", description: "If your HP is at or below 50% at the end of combat, heal 12 HP." },
  { id: "mercury-hourglass", name: "Mercury Hourglass", tier: "Uncommon", character: "Shared", description: "At the start of your turn, deal 3 damage to ALL enemies." },
  { id: "molten-egg", name: "Molten Egg", tier: "Uncommon", character: "Shared", description: "Whenever you add an Attack card to your deck, it is Upgraded." },
  { id: "mummified-hand", name: "Mummified Hand", tier: "Uncommon", character: "Shared", description: "Whenever you play a Power card, a random card in your hand costs 0 this turn." },
  { id: "ninja-scroll", name: "Ninja Scroll", tier: "Uncommon", character: "Silent", description: "Start each combat with 3 Shivs in your hand." },
  { id: "ornamental-fan", name: "Ornamental Fan", tier: "Uncommon", character: "Shared", description: "Every time you play 3 Attacks in a single turn, gain 4 Block." },
  { id: "pantograph", name: "Pantograph", tier: "Uncommon", character: "Shared", description: "At the start of boss combats, heal 25 HP." },
  { id: "paper-krane", name: "Paper Krane", tier: "Uncommon", character: "Silent", description: "Enemies with Weak deal 40% less damage rather than 25%." },
  { id: "paper-phrog", name: "Paper Phrog", tier: "Uncommon", character: "Ironclad", description: "Enemies with Vulnerable take 75% more damage rather than 50%." },
  { id: "pear", name: "Pear", tier: "Uncommon", character: "Shared", description: "Upon pickup, raise your Max HP by 10." },
  { id: "question-card", name: "Question Card", tier: "Uncommon", character: "Shared", description: "On Card Reward screens, choose from 4 cards instead of 3." },
  { id: "shuriken", name: "Shuriken", tier: "Uncommon", character: "Shared", description: "Every time you play 3 Attacks in a single turn, gain 1 Strength." },
  { id: "singing-bowl", name: "Singing Bowl", tier: "Uncommon", character: "Shared", description: "When adding cards to your deck, you may gain +2 Max HP instead." },
  { id: "strike-dummy", name: "Strike Dummy", tier: "Uncommon", character: "Shared", description: "Cards containing \"Strike\" deal 3 additional damage." },
  { id: "sundial", name: "Sundial", tier: "Uncommon", character: "Shared", description: "Every 3 times you shuffle your draw pile, gain 2 Energy." },
  { id: "the-toxic-egg", name: "Toxic Egg", tier: "Uncommon", character: "Shared", description: "Whenever you add a Skill card to your deck, it is Upgraded." },
  { id: "white-beast-statue", name: "White Beast Statue", tier: "Uncommon", character: "Shared", description: "Potions always drop after combat." },
  // ==========================================
  // RARE RELICS
  // ==========================================
  { id: "bird-faced-urn", name: "Bird-Faced Urn", tier: "Rare", character: "Shared", description: "Whenever you play a Power card, heal 2 HP." },
  { id: "calipers", name: "Calipers", tier: "Rare", character: "Shared", description: "At the start of your turn, lose 15 Block rather than all of it." },
  { id: "captain-wheel", name: "Captain's Wheel", tier: "Rare", character: "Shared", description: "At the start of your 3rd turn, gain 18 Block." },
  { id: "charons-ashes", name: "Charon's Ashes", tier: "Rare", character: "Ironclad", description: "Whenever you Exhaust a card, deal 3 damage to ALL enemies." },
  { id: "chironic-cube", name: "Chironic Cube", tier: "Rare", character: "Ironclad", description: "Whenever you lose HP during your turn, draw 1 card." },
  { id: "cloak-clasp", name: "Cloak Clasp", tier: "Rare", character: "Watcher", description: "At the end of your turn, gain 1 Block for each card in your hand." },
  { id: "dead-branch", name: "Dead Branch", tier: "Rare", character: "Shared", description: "Whenever you Exhaust a card, add a random card to your hand." },
  { id: "du-vu-doll", name: "Du-Vu Doll", tier: "Rare", character: "Shared", description: "For each Curse in your deck, start each combat with 1 additional Strength." },
  { id: "emotion-chip", name: "Emotion Chip", tier: "Rare", character: "Defect", description: "At the start of your turn, if you lost HP last turn, trigger the passive abilities of all your Orbs." },
  { id: "fossilized-helix", name: "Fossilized Helix", tier: "Rare", character: "Shared", description: "Prevent the first time you would lose HP each combat." },
  { id: "gambling-chip", name: "Gambling Chip", tier: "Rare", character: "Shared", description: "At the start of each combat, discard any number of cards then draw that many." },
  { id: "ginger", name: "Ginger", tier: "Rare", character: "Shared", description: "You can no longer become Weakened." },
  { id: "girya", name: "Girya", tier: "Rare", character: "Shared", description: "You can now gain Strength at Rest Sites (up to 3 times total)." },
  { id: "golden-eye", name: "Golden Eye", tier: "Rare", character: "Watcher", description: "Whenever you Scry, Scry 2 additional cards." },
  { id: "ice-cream", name: "Ice Cream", tier: "Rare", character: "Shared", description: "Energy is no longer conserved or cleared between turns." },
  { id: "incense-burner", name: "Incense Burner", tier: "Rare", character: "Shared", description: "Every 6 turns, gain 1 Intangible." },
  { id: "lizard-tail", name: "Lizard Tail", tier: "Rare", character: "Shared", description: "When you would die, heal to 50% of your Max HP instead (triggers once)." },
  { id: "mango", name: "Mango", tier: "Rare", character: "Shared", description: "Upon pickup, raise your Max HP by 14." },
  { id: "old-coin", name: "Old Coin", tier: "Rare", character: "Shared", description: "Upon pickup, gain 300 Gold." },
  { id: "peace-pipe", name: "Peace Pipe", tier: "Rare", character: "Shared", description: "You can now remove cards from your deck at Rest Sites." },
  { id: "pocketwatch", name: "Pocketwatch", tier: "Rare", character: "Shared", description: "If you play 3 or fewer cards in a turn, draw 3 additional cards next turn." },
  { id: "prayer-wheel", name: "Prayer Wheel", tier: "Rare", character: "Shared", description: "Normal enemies drop 2 Card Reward screens instead of 1." },
  { id: "shovel", name: "Shovel", tier: "Rare", character: "Shared", description: "You can now dig for Relics at Rest Sites." },
  { id: "stone-calendar", name: "Stone Calendar", tier: "Rare", character: "Shared", description: "At the end of turn 7, deal 52 damage to ALL enemies." },
  { id: "the-specimen", name: "The Specimen", tier: "Rare", character: "Silent", description: "Whenever an enemy dies, transfer its Poison to a random enemy." },
  { id: "thread-and-needle", name: "Thread and Needle", tier: "Rare", character: "Shared", description: "At the start of combat, gain 4 Plated Armor." },
  { id: "tingsha", name: "Tingsha", tier: "Rare", character: "Silent", description: "Whenever you discard a card during your turn, deal 3 damage to a random enemy." },
  { id: "torii", name: "Torii", tier: "Rare", character: "Shared", description: "Whenever you would receive 5 or less unblocked Attack damage, reduce it to 1." },
  { id: "tough-bandages", name: "Tough Bandages", tier: "Rare", character: "Silent", description: "Whenever you discard a card during your turn, gain 3 Block." },
  { id: "turnip", name: "Turnip", tier: "Rare", character: "Shared", description: "You can no longer become Vulnerable." },
  { id: "unceasing-top", name: "Unceasing Top", tier: "Rare", character: "Shared", description: "Whenever you have no cards in your hand during your turn, draw a card." },
  { id: "wing-boots", name: "Wing Boots", tier: "Rare", character: "Shared", description: "You can ignore path connections when choosing rooms on the map up to 3 times." },

  // ==========================================
  // BOSS RELICS
  // ==========================================
  { id: "astrolabe", name: "Astrolabe", tier: "Boss", character: "Shared", description: "Upon pickup, choose and Transform 3 cards, upgrading them automatically." },
  { id: "black-blood", name: "Black Blood", tier: "Boss", character: "Ironclad", description: "Replaces Burning Blood. At the end of combat, heal 12 HP." },
  { id: "black-star", name: "Black Star", tier: "Boss", character: "Shared", description: "Elites drop an additional Relic." },
  { id: "busted-crown", name: "Busted Crown", tier: "Boss", character: "Shared", description: "Gain 1 Energy at the start of your turn. Card Reward screens offer 2 fewer cards." },
  { id: "calling-bell", name: "Calling Bell", tier: "Boss", character: "Shared", description: "Upon pickup, obtain a unique Curse and 3 random Relics." },
  { id: "coffee-dripper", name: "Coffee Dripper", tier: "Boss", character: "Shared", description: "Gain 1 Energy at the start of your turn. You can no longer Rest at Rest Sites." },
  { id: "cursed-key", name: "Cursed Key", tier: "Boss", character: "Shared", description: "Gain 1 Energy at the start of your turn. Whenever you open a non-boss Chest, obtain a Curse." },
  { id: "ectoplasm", name: "Ectoplasm", tier: "Boss", character: "Shared", description: "Gain 1 Energy at the start of your turn. You can no longer gain Gold." },
  { id: "empty-cage", name: "Empty Cage", tier: "Boss", character: "Shared", description: "Upon pickup, remove 2 cards from your deck permanently." },
  { id: "fusion-hammer", name: "Fusion Hammer", tier: "Boss", character: "Shared", description: "Gain 1 Energy at the start of your turn. You can no longer Smith at Rest Sites." },
  { id: "hovering-kite", name: "Hovering Kite", tier: "Boss", character: "Silent", description: "The first time you discard a card each turn, gain 1 Energy." },
  { id: "inversion-gland", name: "Inserter", tier: "Boss", character: "Defect", description: "Every 2 turns, gain 1 Orb slot." },
  { id: "mark-of-pain", name: "Mark of Pain", tier: "Boss", character: "Ironclad", description: "Gain 1 Energy at the start of your turn. Start combat with 2 Wounds in your draw pile." },
  { id: "nuclear-battery", name: "Nuclear Battery", tier: "Boss", character: "Defect", description: "At the start of combat, Channel 1 Plasma Orb." },
  { id: "pandoras-box", name: "Pandora's Box", tier: "Boss", character: "Shared", description: "Upon pickup, Transform all Strikes and Defends." },
  { id: "philosophers-stone", name: "Philosopher's Stone", tier: "Boss", character: "Shared", description: "Gain 1 Energy at the start of your turn. ALL enemies start combat with 1 Strength." },
  { id: "pyramid", name: "Runic Pyramid", tier: "Boss", character: "Shared", description: "You no longer discard your hand at the end of your turn." },
  { id: "sacred-bark", name: "Sacred Bark", tier: "Boss", character: "Shared", description: "Double the effectiveness of all Potions." },
  { id: "slaves-collar", name: "Slaver's Collar", tier: "Boss", character: "Shared", description: "During Elite and Boss combats, gain 1 Energy at the start of your turn." },
  { id: "snecko-eye", name: "Snecko Eye", tier: "Boss", character: "Shared", description: "Draw 2 additional cards each turn. Start combat Confused." },
  { id: "sozu", name: "Sozu", tier: "Boss", character: "Shared", description: "Gain 1 Energy at the start of your turn. You can no longer use or obtain Potions." },
  { id: "velvet-choker", name: "Velvet Choker", tier: "Boss", character: "Shared", description: "Gain 1 Energy at the start of your turn. You cannot play more than 6 cards per turn." },
  { id: "violet-lotus", name: "Violet Lotus", tier: "Boss", character: "Watcher", description: "Whenever you exit Calm, gain 1 additional Energy." },
  { id: "wrist-blade", name: "Wrist Blade", tier: "Boss", character: "Silent", description: "Attacks that cost 0 deal 4 additional damage." },

  // ==========================================
  // SHOP RELICS
  // ==========================================
  { id: "cauldron", name: "Cauldron", tier: "Shop", character: "Shared", description: "Upon pickup, brews 5 random potions into your slots." },
  { id: "chemical-x", name: "Chemical X", tier: "Shop", character: "Shared", description: "The effects of your cards with X costs are increased by 2." },
  { id: "clockwork-souvenir", name: "Clockwork Souvenir", tier: "Shop", character: "Shared", description: "At the start of combat, gain 1 Artifact." },
  { id: "dollys-mirror", name: "Dolly's Mirror", tier: "Shop", character: "Shared", description: "Upon pickup, choose a card from your deck and duplicate it." },
  { id: "frozen-eye", name: "Frozen Eye", tier: "Shop", character: "Shared", description: "You can now look through your draw pile in its exact order." },
  { id: "hand-drill", name: "Hand Drill", tier: "Shop", character: "Shared", description: "Whenever you break an enemy's Block, apply 2 Vulnerable." },
  { id: "lee-waffle", name: "Lee's Waffle", tier: "Shop", character: "Shared", description: "Upon pickup, raise your Max HP by 7 and heal fully." },
  { id: "medical-kit", name: "Medical Kit", tier: "Shop", character: "Shared", description: "Unplayable Status cards can now be played. Playing them Exhausts them." },
  { id: "membership-card", name: "Membership Card", tier: "Shop", character: "Shared", description: "Gives a 50% discount on all items sold by the merchant." },
  { id: "orange-pellets", name: "Orange Pellets", tier: "Shop", character: "Shared", description: "Whenever you play an Attack, a Skill, and a Power in the same turn, clear all your Debuffs." },
  { id: "prismatic-shard", name: "Prismatic Shard", tier: "Shop", character: "Shared", description: "Card rewards can now contain cards from any other character pool." },
  { id: "strange-spoon", name: "Strange Spoon", tier: "Shop", character: "Shared", description: "Cards that Exhaust have a 50% chance to be discarded instead." },
  { id: "the-abacus", name: "The Abacus", tier: "Shop", character: "Shared", description: "Whenever you shuffle your draw pile, gain 6 Block." },

  // ==========================================
  // EVENT RELICS
  // ==========================================
  { id: "bloody-idol", name: "Bloody Idol", tier: "Event", character: "Shared", description: "Whenever you gain Gold, heal 5 HP." },
  { id: "cultist-headpiece", name: "Cultist Headpiece", tier: "Event", character: "Shared", description: "You feel like cawing! (Cosmetic combat effect)" },
  { id: "enchiridion", name: "Enchiridion", tier: "Event", character: "Shared", description: "At the start of combat, add a random Power card to your hand. It costs 0 this turn." },
  { id: "face-of-cleric", name: "Face of Cleric", tier: "Event", character: "Shared", description: "At the start of combat, raise your Max HP by 1." },
  { id: "golden-idol", name: "Golden Idol", tier: "Event", character: "Shared", description: "Gain 25% more Gold from combats." },
  { id: "necronomicon", name: "Necronomicon", tier: "Event", character: "Shared", description: "The first Attack played each turn costing 2 or more is played twice." },
  { id: "nloths-gift", name: "Nloth's Gift", tier: "Event", character: "Shared", description: "Triples the drop rate of Rare cards from card rewards." },
  { id: "nloths-hungry-face", name: "Nloth's Hungry Face", tier: "Event", character: "Shared", description: "The next non-boss Chest you open will be completely empty." },
  { id: "odd-mushroom", name: "Odd Mushroom", tier: "Event", character: "Shared", description: "When Vulnerable, you take 25% more damage rather than 50%." },
  { id: "red-mask", name: "Red Mask", tier: "Event", character: "Shared", description: "At the start of combat, apply 1 Weak to ALL enemies." },
  { id: "spirit-poop", name: "Spirit Poop", tier: "Event", character: "Shared", description: "Minus 1 score at the end of the run." },
  { id: "warped-tongs", name: "Warped Tongs", tier: "Event", character: "Shared", description: "At the start of your turn, Upgrade a random card in your hand for the rest of combat." },

  // ==========================================
  // BLIGHT RELICS
  // ==========================================
  { id: "spearhead", name: "Spearhead", tier: "Blight", character: "Shared", description: "Enemies gain 1 Strength at the start of combat." },
  { id: "time-maze", name: "Time Maze", tier: "Blight", character: "Shared", description: "You cannot play more than 15 cards per turn." },
  { id: "mimic-infestation", name: "Mimic Infestation", tier: "Blight", character: "Shared", description: "Chests are now always Mimics." },
  { id: "mutilation", name: "Mutilation", tier: "Blight", character: "Shared", description: "Start each combat with 2 less Strength." },
  { id: "grotesque-trophy", name: "Grotesque Trophy", tier: "Blight", character: "Shared", description: "Upon pickup, obtain 3 Pride Curses." },
  { id: "ancient-creature", name: "Ancient Creature", tier: "Blight", character: "Shared", description: "Enemies gain 10% Max HP at the start of combat." },
  { id: "durshk", name: "Durshk", tier: "Blight", character: "Shared", description: "Enemies deal 10% more damage." }
];