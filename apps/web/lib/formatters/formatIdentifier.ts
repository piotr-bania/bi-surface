export function formatIdentifier(value: number | null, unavailable: string): string {
    if (value === null || !Number.isFinite(value)) {
        return unavailable
    }

    return String(Math.floor(value))
}
