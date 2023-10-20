import { useContext } from "react";

import { AppSettingsContext } from "../components/AppSettingsProvider";

const useAppSettings = () => useContext(AppSettingsContext);

export default useAppSettings;