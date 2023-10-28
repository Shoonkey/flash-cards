import CardPosition from "../../shared/CardPosition";

interface ComputedPosition {
  top: number;
  left: number;
  rotation: number;
}

export function getComputedPosition(position: CardPosition) {
  const computedPosition: ComputedPosition = {
    top: 0,
    left: 0,
    rotation: 0,
  };
  
  switch (position) {
    case "invisible-left":
      computedPosition.top = 40;
      computedPosition.left = -60;
      computedPosition.rotation = 60;
      break;
    case "left":
      computedPosition.top = 50;
      computedPosition.left = -10;
      computedPosition.rotation = -30;
      break;
    case "middle":
      computedPosition.top = 60;
      computedPosition.left = 50;
      computedPosition.rotation = 0;
      break;
    case "right":
      computedPosition.top = 50;
      computedPosition.left = 110;
      computedPosition.rotation = 30;
      break;
    case "invisible-right":
      computedPosition.top = 40;
      computedPosition.left = 160;
      computedPosition.rotation = 60;
      break;
  }

  return computedPosition;
}
