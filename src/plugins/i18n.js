import { createI18n } from 'vue-i18n'
import arFile from "../locales/ar.json"
import enFile from "../locales/en.json"
const messages = {
    en:enFile,
    ar: arFile
}
let i18n = createI18n({
    locale: window.localStorage.getItem('lang'),
    fallbackLocale: "en",
    messages,
})
export default i18n;