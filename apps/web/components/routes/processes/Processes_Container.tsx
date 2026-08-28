import Processes_Overview from "@/components/routes/processes/Processes_Overview"
import Parent_Chain_Container from "@/components/routes/processes/parent_chain/Parent_Chain_Container"
import Process_Summary_Container from "@/components/routes/processes/process_summary/Process_Summary_Container"
import Process_Explorer_Container from "@/components/routes/processes/process_explorer/Process_Explorer_Container"
import Selected_Process_Container from "@/components/routes/processes/selected_process/Selected_Process_Container"
import Resource_Leaders_Container from "@/components/routes/processes/resource_leaders/Resource_Leaders_Container"
import History_Detections_Container from "@/components/routes/processes/history_detections/History_Detections_Container"

export default function Processes_Container() {
    return (
        <Processes_Overview>
            <Process_Summary_Container className="col-span-12" />
            <Process_Explorer_Container className="col-span-12" />

            <div className="col-span-12 grid grid-cols-12 gap-3">
                <Selected_Process_Container className="col-span-5" />
                <Parent_Chain_Container className="col-span-3" />

                <div className="col-span-4 grid grid-cols-1 gap-3">
                    <Resource_Leaders_Container />
                    <History_Detections_Container />
                </div>
            </div>
        </Processes_Overview>
    )
}
