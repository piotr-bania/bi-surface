export const processStateStyles: Record<string, string> = {
    running: "success",
    sleeping: "secondary_color",
    stopped: "warning",
    idle: "neutral_color",
    waiting: "primary_color",
    waking: "primary_color",
    parked: "neutral_color",
    locked: "warning",
    "disk-sleep": "warning",
    zombie: "danger",
    dead: "danger",
}

export function getProcessStateStyle(status: string | null): string {
    if (!status) {
        return "neutral_color"
    }

    return processStateStyles[status.toLowerCase()] ?? "neutral_color"
}
