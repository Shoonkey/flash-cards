import { Box, ButtonProps } from "@chakra-ui/react";
import { useEffect, useMemo, useRef } from "react";

import CardData from "../../shared/CardData";
import CardPosition from "../../shared/CardPosition";
import CardSide from "./CardSide";
import InactiveOverlay from "./InactiveCardOverlay";
import { getComputedPosition } from "./util";

interface FlashCardProps extends Omit<CardData, "id"> {
  isFlipped: boolean;
  position: CardPosition;
  onClick: () => void;
  "aria-keyshortcuts": ButtonProps["aria-keyshortcuts"];
}

function FlashCard({
  isFlipped,
  position,
  frontText,
  backText,
  onClick,
  "aria-keyshortcuts": ariaKeyShortcuts,
}: FlashCardProps) {
  const frontBtnRef = useRef<HTMLButtonElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const isActive = useMemo(() => position === "middle", [position]);

  const computedPosition = getComputedPosition(position);

  useEffect(() => {
    if (!isActive || !frontBtnRef.current) return;
    frontBtnRef.current.focus();
  }, [isActive]);

  return (
    <Box
      position="absolute"
      zIndex={isActive ? 1 : 0}
      top={`${computedPosition.top}%`}
      left={`${computedPosition.left}%`}
      transform={`translate(-50%, -50%) rotate(${computedPosition.rotation}deg)`}
      transition={position.startsWith("invisible") ? "none" : "all .4s"}
      w="min(80%, 400px)"
      h="300px"
      style={{ perspective: "1000px" }}
    >
      <Box
        bg="#3c008f"
        color="#e2e2e2"
        position="relative"
        borderRadius="32px"
        h="100%"
        transition="transform .4s"
        style={{ transformStyle: "preserve-3d" }}
        transform={`rotateY(${isActive && isFlipped ? -180 : 0}deg)`}
        boxShadow={
          isActive ? "0px 16px 31px -22px rgba(87,87,87,1)" : undefined
        }
        _light={{
          boxShadow: isActive
            ? "0px 16px 31px -22px rgba(20, 20, 20,1)"
            : undefined,
        }}
      >
        <CardSide
          ref={frontBtnRef}
          side="front"
          text={frontText}
          aria-hidden={!isFlipped}
          aria-keyshortcuts={!isFlipped ? ariaKeyShortcuts : ""}
          tabIndex={isActive && !isFlipped ? 0 : -1}
          onClick={() => {
            onClick();
            backBtnRef.current?.focus();
          }}
        />
        <CardSide
          ref={backBtnRef}
          side="back"
          text={backText}
          aria-hidden={isFlipped}
          aria-keyshortcuts={isFlipped ? ariaKeyShortcuts : ""}
          tabIndex={isActive && isFlipped ? 0 : -1}
          onClick={() => {
            onClick();
            frontBtnRef.current?.focus();
          }}
        />
        {!isActive && <InactiveOverlay onClick={onClick} />}
      </Box>
    </Box>
  );
}

export default FlashCard;
