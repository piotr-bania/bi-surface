import Process_Summary from "@/components/routes/processes/process_summary/Process_Summary"

type Process_Summary_Container_Props = {
    className?: string
}

export default function Process_Summary_Container({
    className = "",
}: Process_Summary_Container_Props) {
    return <Process_Summary className={className} />
}
