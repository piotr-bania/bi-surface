import Process_Explorer from "@/components/routes/processes/process_explorer/Process_Explorer"

type Process_Explorer_Container_Props = {
    className?: string
}

export default function Process_Explorer_Container({
    className = "",
}: Process_Explorer_Container_Props) {
    return <Process_Explorer className={className} />
}
