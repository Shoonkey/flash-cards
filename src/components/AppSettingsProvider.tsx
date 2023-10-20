import { ColorMode, useColorMode } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useEffect } from "react";

export interface AppSettingsData {
  isSubapp: boolean;
  theme: ColorMode;
}

type AppSettingsProviderProps = PropsWithChildren<AppSettingsData>;

export const AppSettingsContext = createContext<AppSettingsData>({
  isSubapp: false,
  theme: "dark",
});

function AppSettingsProvider({
  isSubapp,
  theme,
  children,
}: AppSettingsProviderProps) {
  const { setColorMode } = useColorMode();

  useEffect(() => setColorMode(theme), [theme]);

  return (
    <AppSettingsContext.Provider value={{ isSubapp, theme }}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export default AppSettingsProvider;
