import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import english from "./Languages/en";
import italian from "./Languages/it";
import french from "./Languages/fr";
import german from "./Languages/de";
import hindi from "./Languages/in";
//resources
const resources = {
    en: english,
    it: italian,
    fr: french,
    de: german,
    in: hindi
};

//configuration
i18n.use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en"
    });

export default i18n