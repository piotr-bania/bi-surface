import type { HostMonitoringState } from "@/types/routes/dashboard"

export const monitoringStyles: Record<
    HostMonitoringState,
    {
        text: string
        border: string
        glow: string
    }
> = {
    monitored: {
        text: "success",
        border: "success_border_color",
        glow: "success_glow",
    },
    partial: {
        text: "warning",
        border: "warning_border_color",
        glow: "warning_glow",
    },
    offline: {
        text: "danger",
        border: "danger_border_color",
        glow: "danger_glow",
    },
    unknown: {
        text: "muted_color",
        border: "neutral_border_color",
        glow: "",
    },
}
