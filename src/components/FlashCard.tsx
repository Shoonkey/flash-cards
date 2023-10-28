import { Box, Button, ButtonProps, Heading, Text } from "@chakra-ui/react";
import { forwardRef, useRef } from "react";

import CardData from "../shared/CardData";
import CardPosition from "../shared/CardPosition";

interface CardSideProps {
  side: "front" | "back";
  text: string;
  onClick: () => void;
}

interface FlashCardProps extends Omit<CardData, "id"> {
  isFlipped: boolean;
  position: CardPosition;
  onClick: () => void;
  "aria-keyshortcuts": ButtonProps["aria-keyshortcuts"];
}

const CardSide = forwardRef<HTMLButtonElement, CardSideProps & ButtonProps>(
  ({ text, side, ...props }, ref) => {
    return (
      <Button
        borderRadius="inherit"
        variant="unstyled"
        _focus={{ outlineWidth: "2px", outlineColor: "cyan.200" }}
        _light={{ _focus: { outlineWidth: "4px", outlineColor: "orange.700" } }}
        ref={ref}
        w="100%"
        h="100%"
        position="absolute"
        transform={`rotateY(${side === "back" ? -180 : 0}deg)`}
        style={{ backfaceVisibility: "hidden" }}
        textAlign="center"
        {...props}
      >
        {side === "front" && <Heading as="h1">{text}</Heading>}
        {side === "back" && <Text fontSize="24px">{text}</Text>}
      </Button>
    );
  }
);

function InactiveOverlay(props: ButtonProps) {
  return (
    <Button
      variant="unstyled"
      tabIndex={-1}
      bg="blackAlpha.600"
      _hover={{ cursor: "pointer", bg: "blackAlpha.400" }}
      transition="background-color .4s"
      position="absolute"
      w="100%"
      h="100%"
      borderRadius="inherit"
      {...props}
    />
  );
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

  const isActive = position === "middle";
  
  const computedPosition: { top: number; left: number; rotation: number } = {
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
