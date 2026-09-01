export function formatElapsedAge(startedAt: number, now: number): string {
    const totalSeconds = Math.max(0, Math.floor((now - startedAt) / 1000))
    const days = Math.floor(totalSeconds / 86_400)
    const hours = Math.floor((totalSeconds % 86_400) / 3_600)
    const minutes = Math.floor((totalSeconds % 3_600) / 60)
    const seconds = totalSeconds % 60

    if (days > 0) {
        return `${days}d ${String(hours).padStart(2, "0")}h`
    }

    if (hours > 0) {
        return `${hours}h ${String(minutes).padStart(2, "0")}m`
    }

    return `${minutes}m ${String(seconds).padStart(2, "0")}s`
}
