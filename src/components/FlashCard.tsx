import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import CardData from "../shared/CardData";
import CardPosition from "../shared/CardPosition";

interface CardSideProps {
  side: "front" | "back";
  text: string;
}

interface FlashCardProps extends Omit<CardData, "id"> {
  position: CardPosition;
  onClick: () => void;
}

function CardSide({ text, side }: CardSideProps) {
  return (
    <Center
      w="100%"
      h="100%"
      position="absolute"
      transform={`rotateY(${side === "back" ? -180 : 0}deg)`}
      style={{ backfaceVisibility: "hidden" }}
      textAlign="center"
    >
      {side === "front" && <Heading as="h1">{text}</Heading>}
      {side === "back" && <Text fontSize="24px">{text}</Text>}
    </Center>
  );
}

function InactiveOverlay({ onClick }: { onClick: FlashCardProps["onClick"] }) {
  return (
    <Box
      onClick={onClick}
      bg="blackAlpha.600"
      _hover={{ cursor: "pointer", bg: "blackAlpha.400" }}
      transition="background-color .4s"
      position="absolute"
      w="100%"
      h="100%"
      borderRadius="32px"
    />
  );
}

function FlashCard({ position, frontText, backText, onClick }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

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
      onClick={() => isActive && setFlipped(!flipped)}
    >
      <Box
        bg="#3c008f"
        color="#e2e2e2"
        boxShadow={
          isActive ? "0px 16px 31px -22px rgba(87,87,87,1)" : undefined
        }
        position="relative"
        borderRadius="32px"
        h="100%"
        transition="transform .4s"
        style={{ transformStyle: "preserve-3d" }}
        transform={`rotateY(${isActive && flipped ? -180 : 0}deg)`}
      >
        <CardSide side="front" text={frontText} />
        <CardSide side="back" text={backText} />
        {!isActive && <InactiveOverlay onClick={onClick} />}
      </Box>
    </Box>
  );
}

export default FlashCard;
