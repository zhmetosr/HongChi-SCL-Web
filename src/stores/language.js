import { defineStore } from 'pinia'

let i18nInstance = null

export const setI18nInstance = (i18n) => {
  i18nInstance = i18n
}

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: 'zh',
    supportedLanguages: [
      { code: 'zh', name: '简体中文', flag: '🇨🇳' },
      { code: 'en', name: 'English', flag: '🇬🇧' }
    ]
  }),

  getters: {
    getCurrentLanguageName: (state) => {
      const lang = state.supportedLanguages.find(l => l.code === state.currentLanguage)
      return lang ? lang.name : '简体中文'
    },
    getCurrentLanguageFlag: (state) => {
      const lang = state.supportedLanguages.find(l => l.code === state.currentLanguage)
      return lang ? lang.flag : '🇨🇳'
    }
  },

  actions: {
    setLanguage(langCode) {
      this.currentLanguage = langCode
      if (i18nInstance) {
        i18nInstance.global.locale.value = langCode
      }
      localStorage.setItem('language', langCode)
      
      // 切换语言时自动刷新页面
      setTimeout(() => {
        window.location.reload()
      }, 300)
    },
    
    initLanguage() {
      const savedLang = localStorage.getItem('language')
      if (savedLang && this.supportedLanguages.find(l => l.code === savedLang)) {
        this.currentLanguage = savedLang
        if (i18nInstance) {
          i18nInstance.global.locale.value = savedLang
        }
      }
    }
  }
})
