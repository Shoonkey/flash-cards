import { ButtonProps, Button, Heading, Text } from "@chakra-ui/react";
import { forwardRef } from "react";

interface CardSideProps {
  side: "front" | "back";
  text: string;
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

export default CardSide;
