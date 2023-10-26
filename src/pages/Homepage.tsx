import { Center, Flex, Heading, Spinner } from "@chakra-ui/react";
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
      <Heading
        as="h2"
        size="md"
        ml={{ base: 0, md: 24 }}
        mt={{ base: 4, md: 0 }}
        textAlign={{ base: "center", md: "left" }}
        color="gray.500"
      >
        {t("pages.home.dataNotice")}
      </Heading>
      <Heading
        as="h2"
        size="md"
        ml={{ base: 0, md: 24 }}
        mt={2}
        textAlign={{ base: "center", md: "left" }}
        color="gray.500"
      >
        {t("pages.home.explanation")}
      </Heading>
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
    </Page>
  );
}

export default FlashCardApp;
