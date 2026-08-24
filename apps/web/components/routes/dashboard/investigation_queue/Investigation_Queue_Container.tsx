import { createInvestigationQueueData } from "@/components/routes/dashboard/investigation_queue/createInvestigationQueueData"

import Investigation_Queue from "@/components/routes/dashboard/investigation_queue/Investigation_Queue"

type Investigation_Queue_Container_Props = {
    className?: string
}

export default function Investigation_Queue_Container({
    className = "",
}: Investigation_Queue_Container_Props) {
    const data = createInvestigationQueueData()

    return <Investigation_Queue data={data} className={className} />
}
