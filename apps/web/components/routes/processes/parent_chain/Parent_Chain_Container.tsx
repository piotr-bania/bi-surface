import Parent_Chain from "@/components/routes/processes/parent_chain/Parent_Chain"

type Parent_Chain_Container_Props = {
    className?: string
}

export default function Parent_Chain_Container({ className = "" }: Parent_Chain_Container_Props) {
    return <Parent_Chain className={className} />
}
