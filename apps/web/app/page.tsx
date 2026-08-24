import Dashboard_Container from "@/components/routes/dashboard/Dashboard_Container"

export default function Home_Page() {
    return (
        <div className="absolute left-[264px] top-16 grid w-[calc(100%-264px)] h-fit grid-cols-12 gap-3 p-3">
            <Dashboard_Container />
        </div>
    )
}
