import CardData from "../shared/CardData";
import CardPosition from "../shared/CardPosition";
import ViewStage from "../shared/ViewStage";
import { drawNextCard } from "./card";

export function getNextStage(
  stage: ViewStage,
  position: CardPosition
): ViewStage {
  if (stage === "none-left" && position === "right") return "no-invisible-left";

  if (stage === "no-invisible-left")
    return position === "left" ? "none-left" : "complete";

  return stage;
}

export function getStageCards(
  stage: ViewStage,
  position: CardPosition,
  currentCards: CardData[]
) {
  if (stage === "complete") {
    if (position === "left") {
      const remainingSlice = currentCards.slice(0, currentCards.length - 1);

      return [
        drawNextCard({
          blacklist: remainingSlice.map((card) => (card as CardData).id),
        }),
        ...remainingSlice,
      ];
    }

    if (position === "right") {
      const remainingSlice = currentCards.slice(1);

      return [
        ...remainingSlice,
        drawNextCard({
          blacklist: remainingSlice.map((card) => (card as CardData).id),
        }),
      ];
    }
  }

  return currentCards;
}

export function getStageCardPositions(stage: ViewStage) {
  let cardPositions: CardPosition[];

  switch (stage) {
    case "none-left":
      cardPositions = [
        "middle",
        "right",
        "invisible-right",
        "invisible-right",
        "invisible-right",
      ];
      break;
    case "no-invisible-left":
      cardPositions = [
        "left",
        "middle",
        "right",
        "invisible-right",
        "invisible-right",
      ];
      break;
    case "complete":
      cardPositions = [
        "invisible-left",
        "left",
        "middle",
        "right",
        "invisible-right",
      ];
      break;
  }

  return cardPositions;
}
