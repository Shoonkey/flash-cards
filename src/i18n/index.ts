import i18next from "i18next";

import en from "./en-US.json";
import pt from "./pt-BR.json";
import es from "./es-ES.json";

function setupI18N(lang: string) {
  const instance = i18next.createInstance();

  instance.init({
    lng: lang,
    fallbackLng: "en-US",
    resources: {
      "en-US": { translation: en },
      "pt-BR": { translation: pt },
      "es-ES": { translation: es }
    }
  });

  return instance;
}

export default setupI18N;