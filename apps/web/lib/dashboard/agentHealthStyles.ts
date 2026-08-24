import type { AgentHealthState } from "@/types/routes/dashboard"

export const agentHealthStyles: Record<
    AgentHealthState,
    {
        text: string
        dot: string
    }
> = {
    healthy: {
        text: "success",
        dot: "connected_background_color",
    },
    degraded: {
        text: "warning",
        dot: "bg-[#f59e0b]",
    },
    unavailable: {
        text: "danger",
        dot: "bg-[#ef4444]",
    },
    unknown: {
        text: "muted_color",
        dot: "bg-[var(--text-muted)]",
    },
}
