export function formatMemory(
    value: number | null,
    language: "en" | "de",
    unavailable: string
): string {
    if (value === null || !Number.isFinite(value)) {
        return unavailable
    }

    const locale = language === "de" ? "de-DE" : "en-GB"

    return `${new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(value)} MB`
}
