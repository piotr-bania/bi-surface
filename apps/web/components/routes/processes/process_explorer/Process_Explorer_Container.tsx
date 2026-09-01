"use client"

import { useMemo } from "react"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"
import { createProcessExplorerData } from "@/components/routes/processes/process_explorer/createProcessExplorerData"

import Process_Explorer from "@/components/routes/processes/process_explorer/Process_Explorer"

type Process_Explorer_Container_Props = {
    className?: string
}

export default function Process_Explorer_Container({
    className = "",
}: Process_Explorer_Container_Props) {
    const {
        connectionState,
        processes,
        processesAutoRefresh,
        processesRefreshInterval,
        processesRefreshing,
        setProcessesAutoRefresh,
        setProcessesRefreshInterval,
        refreshProcesses,
    } = useAgentConnection()

    const data = useMemo(
        () =>
            createProcessExplorerData({
                processes,
            }),
        [processes]
    )

    return (
        <Process_Explorer
            data={data}
            autoRefresh={processesAutoRefresh}
            onAutoRefreshChange={setProcessesAutoRefresh}
            refreshInterval={processesRefreshInterval}
            onRefreshIntervalChange={setProcessesRefreshInterval}
            canRefresh={connectionState === "connected"}
            isRefreshing={processesRefreshing}
            onRefresh={refreshProcesses}
            className={className}
        />
    )
}
