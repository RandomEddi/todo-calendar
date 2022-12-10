import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'

import interfaceRU from './assets/locales/ru/interface.json'
import interfaceEN from './assets/locales/en/interface.json'

const configureI18n = (): typeof i18n => {
  void i18n.use(detector).init({
    resources: {
      ru: {
        interface: interfaceRU
      },
      en: {
        interface: interfaceEN
      }
    },
    fallbackLng: 'ru',
    ns: ['interface'],
    defaultNS: 'interface',
    debug: false
  })
  return i18n
}

export default configureI18n
