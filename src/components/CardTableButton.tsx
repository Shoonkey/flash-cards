import { IconButton, Tooltip } from "@chakra-ui/react";
import { ListPlus } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

interface EditCardsButtonProps {
  onClick: () => void;
}

function CardTableButton({ onClick }: EditCardsButtonProps) {
  const { t } = useTranslation();

  return (
    <Tooltip placement="left" label={t("pages.home.manageCardsButton")}>
      <IconButton
        icon={<ListPlus size={32} />}
        aria-label={t("pages.home.manageCardsButton")}
        position="absolute"
        bottom={4}
        right={4}
        bg="pink.400"
        _hover={{ bg: "pink.500" }}
        color="black"
        w="64px"
        h="64px"
        borderRadius="50%"
        onClick={onClick}
        zIndex={2}
      />
    </Tooltip>
  );
}
export default CardTableButton;
