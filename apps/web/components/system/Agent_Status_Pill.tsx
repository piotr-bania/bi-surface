"use client"

import type { ConnectionState } from "@/types/agent"

import { useLanguage } from "@/i18n/Language_Context"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"

import Pill from "@/components/ui/pills/Pill"

const statusPresentation: Record<
    ConnectionState,
    { label: string; colorClassName: string; dotClassName: string }
> = {
    disconnected: {
        label: "Disconnected",
        colorClassName: "disconnected_color",
        dotClassName: "disconnected_background_color",
    },
    connecting: {
        label: "Connecting",
        colorClassName: "connecting_color",
        dotClassName: "connecting_background_color",
    },
    connected: {
        label: "Connected",
        colorClassName: "connected_color",
        dotClassName: "connected_background_color",
    },
    disconnecting: {
        label: "Disconnecting",
        colorClassName: "connecting_color",
        dotClassName: "connecting_background_color",
    },
    offline: {
        label: "Offline",
        colorClassName: "offline_color",
        dotClassName: "offline_background_color",
    },
    timed_out: {
        label: "Timed out",
        colorClassName: "critical_color",
        dotClassName: "critical_background_color",
    },
    error: {
        label: "Error",
        colorClassName: "critical_color",
        dotClassName: "critical_background_color",
    },
}

export default function Agent_Status_Pill() {
    const { connectionState } = useAgentConnection()
    const { dictionary } = useLanguage()

    const status = statusPresentation[connectionState]
    const label = dictionary.system.connection.states[connectionState]

    return (
        <Pill title={dictionary.common.agent.title} showDot dotClassName={status.dotClassName}>
            <span className={`paragraph_tiny uppercase ${status.colorClassName}`}>{label}</span>
        </Pill>
    )
}
