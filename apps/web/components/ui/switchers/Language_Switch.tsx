"use client"

import { useLanguage } from "@/i18n/Language_Context"

const languageOptions = [
    { value: "en", label: "EN" },
    { value: "de", label: "DE" },
] as const

export default function Language_Switch() {
    const { language, setLanguage } = useLanguage()

    return (
        <div role="radiogroup" aria-label="Language Switcher" className="inline-flex w-fit gap-1">
            {languageOptions.map(({ value, label }) => {
                const selected = language === value

                return (
                    <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={label}
                        onClick={() => setLanguage(value)}
                        className={`before:hidden after:hidden h-9 min-w-9 rounded-sm px-2 ${
                            selected
                                ? "connected_color bg-[var(--panel-light)]!"
                                : "bg-[var(--panel-dark)]!"
                        }`}
                    >
                        <span className="paragraph_tiny uppercase">{label}</span>
                    </button>
                )
            })}
        </div>
    )
}
