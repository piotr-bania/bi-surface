import Dashboard_Container from "@/components/routes/dashboard/Dashboard_Container"

export default function Home_Page() {
    return (
        <div className="absolute w-full grid grid-cols-12 gap-3 p-3">
            <Dashboard_Container />
        </div>
    )
}
