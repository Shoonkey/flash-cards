import {
  Button,
  ButtonGroup,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { deleteCard } from "../util/card";

interface DeleteCardDialogProps {
  open: boolean;
  onClose: () => void;
  cardId: string | null;
}

function DeleteCardDialog({ open, onClose, cardId }: DeleteCardDialogProps) {
  const { t } = useTranslation();

  if (!cardId) return null;

  return (
    <Modal isOpen={open} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent mx={6}>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as="h1" size="md">
            {t("deleteDialog.header")}
          </Heading>
        </ModalHeader>
        <ModalBody display="flex" flexDir="column" gap={4}>
          <ButtonGroup alignSelf="center" mb={4}>
            <Button
              onClick={() => {
                deleteCard(cardId);
                onClose();
              }}
              colorScheme="red"
            >
              {t("deleteDialog.yesButton")}
            </Button>
            <Button onClick={onClose}>
              {t("deleteDialog.noButton")}
            </Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DeleteCardDialog;
