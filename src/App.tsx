import { ChakraProvider } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AppSettingsProvider from "./components/AppSettingsProvider";
import Root from "./components/Root";
import chakraTheme from "./chakra/theme";
import setupI18N from "./i18n";

interface AppProps {
  isSubapp?: boolean;
  theme?: "dark" | "light";
  language?: string;
}

function App({
  isSubapp = false,
  theme = "dark",
  language = "pt-BR",
}: AppProps) {
  const i18nInstance = useMemo(() => setupI18N(language), [language]);
  const { i18n } = useTranslation(undefined, { i18n: i18nInstance });

  const routerFactory = isSubapp ? createHashRouter : createBrowserRouter;

  const router = routerFactory([
    {
      path: "/*",
      Component: Root,
    },
  ]);

  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={chakraTheme}>
        <AppSettingsProvider isSubapp={isSubapp} theme={theme}>
          <RouterProvider router={router} />
        </AppSettingsProvider>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
