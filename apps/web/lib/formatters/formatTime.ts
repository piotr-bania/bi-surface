import type { Language } from "@/i18n"

export function formatTime(timestamp: number, language: Language): string {
    const locale = language === "de" ? "de-DE" : "en-GB"

    return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(timestamp)
}
