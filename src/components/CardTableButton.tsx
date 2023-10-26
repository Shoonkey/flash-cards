import { Button, Tooltip } from "@chakra-ui/react";
import { ListPlus } from "@phosphor-icons/react";

interface EditCardsButtonProps {
  onClick: () => void;
}

function CardTableButton({ onClick }: EditCardsButtonProps) {
  return (
    <Tooltip placement="left" label="Edit cards">
      <Button
        position="absolute"
        bottom={4}
        right={4}
        bg="pink.400"
        _hover={{ bg: "pink.500" }}
        color="black"
        w="64px"
        h="64px"
        borderRadius="50%"
        aria-label="Add cards"
        onClick={onClick}
        zIndex={2}
      >
        <ListPlus size={32} />
      </Button>
    </Tooltip>
  );
}
export default CardTableButton;
