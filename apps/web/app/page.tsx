import Agent_Connection from "@/components/system/Agent_Connection"

export default function Home_Page() {
    return (
        <div className="absolute left-[264px] top-16 w-[calc(100%-264px)] h-fit flex flex-row gap-3 p-3">
            <Agent_Connection />
        </div>
    )
}
