import Dashboard_Overview from "@/components/routes/dashboard/Dashboard_Overview"
import Host_Posture_Container from "@/components/routes/dashboard/host_posture/Host_Posture_Container"
import Visibility_Coverage_Container from "@/components/routes/dashboard/visibility_coverage/Visibility_Coverage_Container"
import Investigation_Queue_Container from "@/components/routes/dashboard/investigation_queue/Investigation_Queue_Container"

export default function Dashboard_Container() {
    return (
        <Dashboard_Overview>
            <Host_Posture_Container className="col-span-4" />
            <Visibility_Coverage_Container className="col-span-4" />
            <Investigation_Queue_Container className="col-span-4" />
        </Dashboard_Overview>
    )
}
