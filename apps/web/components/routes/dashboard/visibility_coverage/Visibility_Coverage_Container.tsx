"use client"

import { useMemo } from "react"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"
import { createVisibilityCoverageData } from "@/components/routes/dashboard/visibility_coverage/createVisibilityCoverageData"

import Visibility_Coverage from "@/components/routes/dashboard/visibility_coverage/Visibility_Coverage"

type Visibility_Coverage_Container_Props = {
    className?: string
}

export default function Visibility_Coverage_Container({
    className = "",
}: Visibility_Coverage_Container_Props) {
    const { processes } = useAgentConnection()

    const data = useMemo(() => createVisibilityCoverageData(processes), [processes])

    return <Visibility_Coverage data={data} className={className} />
}
