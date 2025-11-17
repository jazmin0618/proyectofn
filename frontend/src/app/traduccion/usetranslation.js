// traduccion/useTranslation.js
"use client"
import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'

const TranslationContext = createContext()

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('es')
  const [translations, setTranslations] = useState({})
  const [isTranslating, setIsTranslating] = useState(false)

  // Función para traducir texto usando Google Translate API
  const translateText = async (text, targetLang) => {
    try {
      const response = await axios.get(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      )
      return response.data[0][0][0]
    } catch (error) {
      console.error('Error traduciendo:', error)
      return text // Devuelve el texto original si hay error
    }
  }

  // Función para extraer TODO el texto de la página y traducirlo
  const translatePage = async () => {
    setIsTranslating(true)
    
    // Extraer todos los textos de la página
    const textNodes = []
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    )
    
    let node
    while (node = walker.nextNode()) {
      if (node.textContent.trim() && 
          !node.parentElement.classList.contains('no-translate') && // Excluir elementos que no queremos traducir
          node.parentElement.tagName !== 'SCRIPT' &&
          node.parentElement.tagName !== 'STYLE') {
        textNodes.push(node)
      }
    }

    // Traducir cada texto
    for (const node of textNodes) {
      const originalText = node.textContent.trim()
      if (originalText && originalText.length > 1) {
        try {
          const translatedText = await translateText(originalText, language)
          node.textContent = node.textContent.replace(originalText, translatedText)
        } catch (error) {
          console.log('Error traduciendo:', originalText)
        }
      }
    }
    
    setIsTranslating(false)
  }

  useEffect(() => {
    if (language !== 'es') {
      translatePage()
    }
  }, [language])

  return (
    <TranslationContext.Provider value={{ language, setLanguage, isTranslating }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  return useContext(TranslationContext)
}