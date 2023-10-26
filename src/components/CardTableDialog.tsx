import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { Info, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import CardData from "../shared/CardData";
import CardDialogData from "../shared/CardDialogData";
import { getCards } from "../util/card";
import CardDialog from "./CardDialog";
import DeleteCardDialog from "./DeleteCardDialog";

interface EditCardsDialogProps {
  open: boolean;
  onClose: () => void;
}

function CardTableDialog({ open, onClose }: EditCardsDialogProps) {
  const { t } = useTranslation();

  const [cardDialogData, setCardDialogData] = useState<CardDialogData>({
    open: false,
    mode: "view",
  });

  const [deleteCardDialogData, setDeleteCardDialogData] = useState<{
    open: boolean;
    cardId: string | null;
  }>({
    open: false,
    cardId: null,
  });

  return (
    <>
      <CardDialog
        open={cardDialogData.open}
        mode={cardDialogData.mode}
        prefillCard={cardDialogData.prefillCard}
        onClose={() => setCardDialogData({ ...cardDialogData, open: false })}
      />
      <DeleteCardDialog
        open={deleteCardDialogData.open}
        onClose={() => setDeleteCardDialogData({ open: false, cardId: null })}
        cardId={deleteCardDialogData.cardId}
      />
      <Modal
        isOpen={open}
        onClose={onClose}
        closeOnOverlayClick
        closeOnEsc
        isCentered
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          <ModalCloseButton />
          <ModalHeader>{t("cardTableDialog.title")}</ModalHeader>
          <ModalBody mb={4} display="flex" flexDir="column">
            <Button
              alignSelf="end"
              colorScheme="cyan"
              onClick={() =>
                setCardDialogData({
                  mode: "new",
                  open: true,
                })
              }
            >
              <Text as="span" pt={1}>
                {t("cardTableDialog.addButton")}
              </Text>
            </Button>
            <TableContainer>
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th w="70%">{t("cardTableDialog.table.label")}</Th>
                    <Th>{t("cardTableDialog.table.actions")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getCards().map(card => (
                    <Tr key={card.id}>
                      <Td>{card.frontText}</Td>
                      <Td display="flex" gap={2}>
                        <Tooltip label={t("cardDialog.title.view")}>
                          <IconButton
                            color="purple.400"
                            variant="transparent"
                            aria-label={t("cardDialog.title.view")}
                            onClick={() =>
                              setCardDialogData({
                                open: true,
                                mode: "view",
                                prefillCard: card as CardData,
                              })
                            }
                          >
                            <Info size={32} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip label={t("cardDialog.title.edit")}>
                          <IconButton
                            color="pink.400"
                            variant="transparent"
                            aria-label={t("cardDialog.title.edit")}
                            onClick={() =>
                              setCardDialogData({
                                open: true,
                                mode: "edit",
                                prefillCard: card,
                              })
                            }
                          >
                            <PencilSimple size={32} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip label={t("deleteDialog.title")}>
                          <IconButton
                            color="red.400"
                            variant="transparent"
                            aria-label={t("deleteDialog.title")}
                            onClick={() =>
                              setDeleteCardDialogData({
                                open: true,
                                cardId: card.id,
                              })
                            }
                          >
                            <TrashSimple size={32} />
                          </IconButton>
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardTableDialog;
