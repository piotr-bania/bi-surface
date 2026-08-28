import History_Detections from "@/components/routes/processes/history_detections/History_Detections"

type History_Detections_Container_Props = {
    className?: string
}

export default function History_Detections_Container({
    className = "",
}: History_Detections_Container_Props) {
    return <History_Detections className={className} />
}
