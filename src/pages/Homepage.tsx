import { useTranslation } from "react-i18next";

import Page from "../components/Page";

function Homepage() {
  const { t } = useTranslation();

  return <Page metaTitle="home">{t("pages.home.text")}</Page>;
}

export default Homepage;
