"use client"
import { useState, useEffect, createContext, useContext, ReactNode } from "react"
import axios from "axios"

interface TranslationContextType {
  language: string
  setLanguage: (lang: string) => void
  isTranslating: boolean
}

const TranslationContext = createContext<TranslationContextType | null>(null)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("es")
  const [isTranslating, setIsTranslating] = useState(false)

  const translateText = async (text: string, targetLang: string) => {
    try {
      const response = await axios.get(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      )
      return response.data[0][0][0]
    } catch {
      return text
    }
  }

  const translatePage = async () => {
    setIsTranslating(true)

    const textNodes: any[] = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)

    let node: any
    while ((node = walker.nextNode())) {
      if (
        node.textContent?.trim() &&
        !node.parentElement?.classList.contains("no-translate") &&
        node.parentElement?.tagName !== "SCRIPT" &&
        node.parentElement?.tagName !== "STYLE"
      ) {
        textNodes.push(node)
      }
    }

    for (const node of textNodes) {
      const originalText = node.textContent?.trim()
      if (originalText && originalText.length > 1) {
        const translatedText = await translateText(originalText, language)
        node.textContent = node.textContent.replace(originalText, translatedText)
      }
    }

    setIsTranslating(false)
  }

  useEffect(() => {
    if (language !== "es") translatePage()
  }, [language])

  return (
    <TranslationContext.Provider value={{ language, setLanguage, isTranslating }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(TranslationContext)
  if (!ctx) {
    throw new Error("useTranslation debe usarse dentro de TranslationProvider")
  }
  return ctx
}
