"use client"

import { useMemo } from "react"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"
import { createHostPostureData } from "@/components/routes/dashboard/host_posture/createHostPostureData"

import Host_Posture from "@/components/routes/dashboard/host_posture/Host_Posture"

type Host_Posture_Container_Props = {
    className?: string
}

export default function Host_Posture_Container({ className = "" }: Host_Posture_Container_Props) {
    const { connectionState, agent, system, telemetry, processes } = useAgentConnection()

    const data = useMemo(
        () =>
            createHostPostureData({
                connectionState,
                agent,
                system,
                telemetry,
                processes,
            }),
        [connectionState, agent, system, telemetry, processes]
    )

    return <Host_Posture data={data} className={className} />
}
