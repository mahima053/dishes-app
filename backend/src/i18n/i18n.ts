import i18next from "i18next";
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        backend: {
        loadPath: __dirname + 'locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['querystring', 'header'],
        }
    });

export default i18next;