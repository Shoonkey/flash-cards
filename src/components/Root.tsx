import {
  Box,
  Button,
  Flex,
  IconButton,
  Select,
  Tooltip,
  VisuallyHidden,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SunHorizon, MoonStars, ArrowLeft } from "@phosphor-icons/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import useAppSettings from "../hooks/useAppSettings";
import Homepage from "../pages/Homepage";

function Root() {
  const { t, i18n } = useTranslation();
  const { colorMode: theme, setColorMode: setTheme } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isSubapp } = useAppSettings();
  const backgroundColor = useColorModeValue("gray.200", "gray.800");

  return (
    <Flex
      bg={backgroundColor}
      flexDir="column"
      w={isSubapp ? "100%" : "100dvw"}
      minH={isSubapp ? "100%" : "100dvh"}
    >
      <Flex alignItems="center" p={2}>
        {location.pathname !== "/" && (
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft size={32} />}
            onClick={() => navigate(-1)}
          >
            {t("goBackButton")}
          </Button>
        )}
        {!isSubapp && (
          <Box
            ml="auto"
            bg="linear-gradient(90deg, hsla(139, 72%, 83%, 1) 0%, hsla(229, 89%, 62%, 1) 100%)"
            p={1}
            borderRadius="8px"
          >
            <Flex gap={2} borderRadius="8px">
              <VisuallyHidden>{t("appSettings")}</VisuallyHidden>
              <Select
                w="auto"
                bg="gray.800"
                color="whiteAlpha.800"
                aria-label={t("selectLanguage")}
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en-US">en-US</option>
                <option value="pt-BR">pt-BR</option>
                <option value="es-ES">es-ES</option>
              </Select>
              <Tooltip placement="left" label={t("changeTheme")}>
                <IconButton
                  aria-label={t("changeTheme")}
                  color="gray.800"
                  bg="transparent"
                  _hover={{ bg: "whiteAlpha.400" }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  icon={
                    theme === "dark" ? (
                      <SunHorizon size={36} weight="fill" />
                    ) : (
                      <MoonStars size={36} weight="fill" />
                    )
                  }
                />
              </Tooltip>
            </Flex>
          </Box>
        )}
      </Flex>
      <Flex
        flexDir="column"
        flexGrow={1}
        minWidth="300px"
        w="80%"
        mx="auto"
        px={0}
        pb={8}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default Root;
