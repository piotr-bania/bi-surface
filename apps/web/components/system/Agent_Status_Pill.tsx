"use client"

import Pill from "@/components/ui/pills/Pill"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"
import type { ConnectionState } from "@/types/agent"

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
    const status = statusPresentation[connectionState]

    return (
        <Pill title="Agent" showDot dotClassName={status.dotClassName}>
            <span className={`paragraph_tiny uppercase ${status.colorClassName}`}>
                {status.label}
            </span>
        </Pill>
    )
}
