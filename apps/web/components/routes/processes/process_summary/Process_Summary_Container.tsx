"use client"

import { useMemo } from "react"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"
import { createProcessSummaryData } from "@/components/routes/processes/process_summary/createProcessSummaryData"

import Process_Summary from "@/components/routes/processes/process_summary/Process_Summary"

type Process_Summary_Container_Props = {
    className?: string
}

export default function Process_Summary_Container({
    className = "",
}: Process_Summary_Container_Props) {
    const { agent, processes } = useAgentConnection()

    const data = useMemo(
        () =>
            createProcessSummaryData({
                agent,
                processes,
            }),
        [agent, processes]
    )

    return <Process_Summary data={data} className={className} />
}
