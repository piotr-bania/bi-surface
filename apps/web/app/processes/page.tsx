import Processes_Container from "@/components/routes/processes/Processes_Container"

export default function Processes_Page() {
    return (
        <div className="absolute left-[264px] top-16 grid h-fit w-[calc(100%-264px)] grid-cols-12 gap-3 p-3">
            <Processes_Container />
        </div>
    )
}
