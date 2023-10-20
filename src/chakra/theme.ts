import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const themeOverride: ThemeOverride = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
    disableTransitionOnChange: false,
  },
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
      },
    },
  },
};

export default extendTheme(themeOverride);
