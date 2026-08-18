"use client"

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react"

import { translations, type Dictionary, type Language } from "@/i18n"

type LanguageContextValue = {
    language: Language
    setLanguage: (language: Language) => void
    dictionary: Dictionary
}

const STORAGE_KEY = "bi-surface-language"
const LANGUAGE_EVENT = "bi-surface-language-change"

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getLanguageSnapshot(): Language {
    const storedLanguage = localStorage.getItem(STORAGE_KEY)

    if (storedLanguage === "en" || storedLanguage === "de") {
        return storedLanguage
    }

    return "en"
}

function getServerLanguageSnapshot(): Language {
    return "en"
}

function subscribeToLanguage(callback: () => void) {
    window.addEventListener("storage", callback)
    window.addEventListener(LANGUAGE_EVENT, callback)

    return () => {
        window.removeEventListener("storage", callback)
        window.removeEventListener(LANGUAGE_EVENT, callback)
    }
}

export function Language_Provider({ children }: { children: ReactNode }) {
    const language = useSyncExternalStore(
        subscribeToLanguage,
        getLanguageSnapshot,
        getServerLanguageSnapshot
    )

    function setLanguage(language: Language) {
        localStorage.setItem(STORAGE_KEY, language)

        document.documentElement.lang = language

        window.dispatchEvent(new Event(LANGUAGE_EVENT))
    }

    const dictionary = translations[language]

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                dictionary,
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error("useLanguage must be used within Language_Provider.")
    }

    return context
}
