import Resource_Leaders from "@/components/routes/processes/resource_leaders/Resource_Leaders"

type Resource_Leaders_Container_Props = {
    className?: string
}

export default function Resource_Leaders_Container({
    className = "",
}: Resource_Leaders_Container_Props) {
    return <Resource_Leaders className={className} />
}
