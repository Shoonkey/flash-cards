import {
  Center,
  Flex,
  Heading,
  Kbd,
  ListItem,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Page from "../components/Page";
import CardTableButton from "../components/CardTableButton";
import CardTableDialog from "../components/CardTableDialog";
import FlashCard from "../components/FlashCard";
import CardData from "../shared/CardData";
import ViewStage from "../shared/ViewStage";
import { drawFirstDeck } from "../util/card";
import {
  getStageCardPositions,
  getNextStage,
  getStageCards,
} from "../util/stage";

interface AppMetadata {
  playable: boolean;
  stage: ViewStage;
  cards: (CardData | null)[];
}

function FlashCardApp() {
  const { t } = useTranslation();

  const [cardTableDialogOpen, setCardTableDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [metadata, setMetadata] = useState<AppMetadata>({
    playable: false,
    stage: "none-left",
    cards: [],
  });

  useEffect(() => {
    const deck = drawFirstDeck();
    setMetadata((data) => ({
      ...data,
      playable: deck.length >= 5,
      cards: deck,
    }));
    setLoading(false);
  }, []);

  useEffect(() => {
    // TODO: Set aria-keyshortcuts on previous and next cards

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey || e.ctrlKey || e.metaKey) return;

      if (e.key === "ArrowLeft") {
        // TODO: Move to previous card and focus it
        console.log("Pressed <");
        return;
      }

      if (e.key === "ArrowRight") {
        // TODO: Move to next card and focus it
        console.log("Pressed >");
        return;
      }
    };

    document.body.addEventListener("keyup", handleKeyPress);
    return () => document.body.removeEventListener("keyup", handleKeyPress);
  }, []);

  const cardPositions = getStageCardPositions(metadata.stage);

  if (loading)
    return (
      <Page metaTitle="home">
        <Center flexGrow={1}>
          <Spinner />
        </Center>
      </Page>
    );

  return (
    <Page metaTitle="home" overflowX="hidden">
      <CardTableButton onClick={() => setCardTableDialogOpen(true)} />
      <CardTableDialog
        open={cardTableDialogOpen}
        onClose={() => {
          const deck = drawFirstDeck();

          if (!metadata.playable && deck.length > 0)
            setMetadata({ ...metadata, playable: true, cards: deck });

          setCardTableDialogOpen(false);
        }}
      />
      <Flex flexGrow={1} position="relative">
        {cardPositions.map((position, index) => {
          return (
            <FlashCard
              key={metadata.cards[index]?.id || index}
              position={position}
              frontText={
                metadata.cards[index]?.frontText ||
                t("pages.home.emptyCardPlaceholder.label")
              }
              backText={
                metadata.cards[index]?.backText ||
                t("pages.home.emptyCardPlaceholder.description")
              }
              onClick={() => {
                if (!metadata.playable) return;
                const nextStage = getNextStage(metadata.stage, position);
                const stageCards = getStageCards(
                  metadata.stage,
                  position,
                  metadata.cards as CardData[]
                );

                setMetadata({
                  ...metadata,
                  stage: nextStage,
                  cards: stageCards,
                });
              }}
            />
          );
        })}
      </Flex>
      <Flex flexDir="column" gap={2} my={8} textAlign="center">
        <UnorderedList
          listStyleType="none"
          display="flex"
          gap={2}
          color="gray.500"
          mx="auto"
        >
          <ListItem>
            <Kbd>&larr;</Kbd> Previous card
          </ListItem>
          <ListItem>
            <Kbd>&rarr;</Kbd> Next card
          </ListItem>
        </UnorderedList>
        <Heading as="h3" size="sm" color="gray.500">
          {t("pages.home.dataNotice")}
        </Heading>
        <Heading as="h3" size="sm" color="gray.500">
          {t("pages.home.explanation")}
        </Heading>
      </Flex>
    </Page>
  );
}

export default FlashCardApp;
