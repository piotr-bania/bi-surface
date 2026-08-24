import type { InvestigationQueueMetric, InvestigationSeverity } from "@/types/routes/dashboard"

type InvestigationMetricStyle = {
    text: string
    border: string
}

type InvestigationSeverityStyle = {
    text: string
    dot: string
}

export const investigationMetricStyles: Record<InvestigationQueueMetric, InvestigationMetricStyle> =
    {
        critical: {
            text: "danger",
            border: "danger_border_color",
        },
        high: {
            text: "warning",
            border: "warning_border_color",
        },
        warning: {
            text: "warning",
            border: "warning_border_color",
        },
        reviewed: {
            text: "info",
            border: "info_border_color",
        },
    }

export const investigationSeverityStyles: Record<
    InvestigationSeverity,
    InvestigationSeverityStyle
> = {
    critical: {
        text: "danger",
        dot: "critical_background_color",
    },
    high: {
        text: "warning",
        dot: "bg-[#f59e0b]",
    },
    warning: {
        text: "warning",
        dot: "bg-[#eab308]",
    },
    info: {
        text: "info",
        dot: "bg-[#21d4ff]",
    },
}
