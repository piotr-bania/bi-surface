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
    const { processes } = useAgentConnection()

    const data = useMemo(
        () =>
            createProcessExplorerData({
                processes,
            }),
        [processes]
    )

    return <Process_Explorer data={data} className={className} />
}
