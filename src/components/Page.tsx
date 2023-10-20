import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface PageProps {
  metaTitle: string;
  children: ReactNode;
}

function Page({ metaTitle, children, ...props }: PageProps & FlexProps) {
  const { t } = useTranslation();

  document.title = `${t(`pages.${metaTitle}.meta.title`)} | ${t("appTitle")}`;

  return (
    <Flex flexGrow={1} flexDir="column" {...props}>
      {children}
    </Flex>
  );
}

export default Page;
