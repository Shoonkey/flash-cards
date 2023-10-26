import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { PencilSimple, Plus } from "@phosphor-icons/react";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CardDialogData from "../shared/CardDialogData";
import { saveCard, updateCard } from "../util/card";

interface FormInput {
  label: string;
  description: string;
}

function CardDialog({
  open,
  onClose,
  mode,
  prefillCard,
}: CardDialogData & { onClose: () => void }) {
  const { t } = useTranslation();

  const [data, setData] = useState<FormInput>({
    label: "",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<FormInput>>({});

  useEffect(() => {
    if (!prefillCard) setData({ label: "", description: "" });
    else
      setData({
        label: prefillCard.frontText,
        description: prefillCard.backText,
      });
  }, [prefillCard]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors: Partial<FormInput> = {};

    if (!data.label) errors.label = t("cardDialog.form.label.error");
    if (!data.description)
      errors.description = t("cardDialog.form.description.error");

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (prefillCard) {
      updateCard(prefillCard.id, data.label, data.description);
    } else {
      saveCard(data.label, data.description);
    }

    setErrors({});
    setData({ label: "", description: "" });
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      closeOnOverlayClick
      closeOnEsc
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx={6}>
        <ModalCloseButton />
        <ModalHeader>{t(`cardDialog.title.${mode}`)}</ModalHeader>
        <ModalBody mb={4}>
          <Flex flexDir="column" gap={4} as="form" onSubmit={handleSubmit}>
            <FormControl isInvalid={!!errors.label}>
              <FormLabel>{t("cardDialog.form.label.title")}</FormLabel>
              <Input
                disabled={mode === "view"}
                value={data.label}
                onChange={(e) => setData({ ...data, label: e.target.value })}
              />
              {errors.label ? (
                <FormErrorMessage>{errors.label}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  {t("cardDialog.form.label.helperText")}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>{t("cardDialog.form.description.title")}</FormLabel>
              <Textarea
                disabled={mode === "view"}
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
              {errors.description ? (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  {t("cardDialog.form.description.helperText")}
                </FormHelperText>
              )}
            </FormControl>
            {mode !== "view" && (
              <Button
                type="submit"
                alignSelf="center"
                leftIcon={
                  mode === "new" ? (
                    <Plus size={32} />
                  ) : (
                    <PencilSimple size={32} />
                  )
                }
                color="black"
                bg="pink.400"
                _hover={{ bg: "pink.500" }}
              >
                <Text as="span" pt={1}>
                  {mode === "new" && t("cardDialog.addButton")}
                  {mode === "edit" && t("cardDialog.editButton")}
                </Text>
              </Button>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CardDialog;
