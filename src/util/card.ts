import { v4 as uuidv4 } from "uuid";

import CardData from "../shared/CardData";

export function getCards(): CardData[] {
  try {
    const cards = JSON.parse(localStorage.getItem("cards") || "[]");
    return cards;
  } catch (e) {
    return [];
  }
}

export function getNewCardIndex(availableIndices: number[]): number | null {
  if (availableIndices.length === 0) return null;

  const randomIndex =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return randomIndex;
}

export function saveCard(label: string, description: string) {
  const cards = getCards();
  cards.push({ id: uuidv4(), frontText: label, backText: description });
  localStorage.setItem("cards", JSON.stringify(cards));
}

export function updateCard(id: string, label: string, description: string) {
  const cards = getCards();

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].id === id)
      cards.splice(i, 1, {
        ...cards[i],
        frontText: label,
        backText: description,
      });
  }

  localStorage.setItem("cards", JSON.stringify(cards));
}

export function deleteCard(id: string) {
  const cards = getCards();
  const cardIndex = cards.findIndex((card) => card.id === id);
  cards.splice(cardIndex, 1);
  localStorage.setItem("cards", JSON.stringify(cards));
}

export function drawFirstDeck(): CardData[] {
  const cards = getCards();

  if (cards.length < 5) return [];

  const selectedCards: CardData[] = [];
  const availableIndices = cards.map((_, index) => index);

  for (let i = 0; i < 5; i++) {
    const cardIndex = getNewCardIndex(availableIndices) as number;
    selectedCards.push(cards[cardIndex]);
    availableIndices.splice(
      availableIndices.findIndex((index) => index === cardIndex),
      1
    );
  }

  return selectedCards;
}

export function drawNextCard({ blacklist }: { blacklist: string[] }): CardData {
  const availableIndices = [];
  const cards = getCards();

  for (let i = 0; i < cards.length; i++)
    if (!blacklist.includes(cards[i].id)) availableIndices.push(i);

  const randomIndex = getNewCardIndex(availableIndices) as number;
  return cards[randomIndex];
}
