import type { VisibilityState } from "@/types/routes/dashboard"

type VisibilityStyle = {
    text: string
    bar: string
    border: string
}

export const visibilityStyles: Record<VisibilityState, VisibilityStyle> = {
    full: {
        text: "success",
        bar: "success_background_color",
        border: "success_border_color",
    },

    partial: {
        text: "warning",
        bar: "warning_background_color",
        border: "warning_border_color",
    },

    limited: {
        text: "danger",
        bar: "danger_background_color",
        border: "danger_border_color",
    },

    locked: {
        text: "danger",
        bar: "danger_background_color",
        border: "danger_border_color",
    },

    planned: {
        text: "info",
        bar: "info_background_color",
        border: "info_border_color",
    },

    unavailable: {
        text: "neutral_color",
        bar: "neutral_background_color",
        border: "neutral_border_color",
    },
}
