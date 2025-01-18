import * as fs from 'fs';
import * as path from 'path';

type CardRarity = 'common' | 'rare' | 'mythic' | 'legendary' | 'galactic';

interface Card {
  name: string;
  rarity: CardRarity;
  assetPath: string;
}

const cardDirectories: { [key in CardRarity]: string } = {
  common: './src/bot/Functions/card_gen/cards/assets/common',
  rare: './src/bot/Functions/card_gen/cards/assets/rare',
  mythic: './src/bot/Functions/card_gen/cards/assets/mythic',
  legendary: './src/bot/Functions/card_gen/cards/assets/legendary',
  galactic: './src/bot/Functions/card_gen/cards/assets/galactic',
};

const dropRates: { [key in CardRarity]: number } = {
  common: 0.6, // 60% chance
  rare: 0.25,  // 25% chance
  mythic: 0.1, // 10% chance
  legendary: 0.04, // 4% chance
  galactic: 0.01, // 1% chance
};

function loadCards(): Card[] {
  const cards: Card[] = [];

  for (const rarity in cardDirectories) {
    const directory = cardDirectories[rarity as CardRarity];
    const files = fs.readdirSync(directory);

    for (const file of files) {
      cards.push({
        name: path.basename(file, path.extname(file)),
        rarity: rarity as CardRarity,
        assetPath: path.join(directory, file),
      });
    }
  }

  return cards;
}

const cards = loadCards();

function getRandomCard(): Card {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const card of cards) {
    cumulativeProbability += dropRates[card.rarity];
    if (random < cumulativeProbability) {
      return card;
    }
  }

  // Fallback in case of rounding errors
  return cards[0];
}

export { getRandomCard, Card };