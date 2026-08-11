import Card from "@/components/ui/cards/Card"
import Pill from "@/components/ui/pills/Pill"
import Theme_Switch from "@/components/ui/switchers/Theme_Switch"
import Agent_Status_Pill from "@/components/system/Agent_Status_Pill"
import Last_Updated from "@/components/system/Last_Updated"

export default function Topbar() {
    return (
        <Card
            topBorder={false}
            rightBorder={false}
            bottomBorder
            leftBorder={false}
            className="absolute left-[264px] top-0 w-[calc(100%-264px)] h-16 flex flex-row items-center justify-between gap-3 p-3"
        >
            {/* Agent connection status */}
            <Agent_Status_Pill />

            <div className="flex flex-row items-center gap-3">
                {/* Host information */}
                <Pill title="Host">
                    <span className="paragraph_tiny">localhost (This Machine)</span>
                </Pill>

                {/* Latest successful telemetry refresh */}
                <Last_Updated />

                {/* Theme switcher */}
                <Theme_Switch />
            </div>
        </Card>
    )
}
