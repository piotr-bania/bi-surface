"use client"

import { useLanguage } from "@/i18n/Language_Context"

import Card from "@/components/ui/cards/Card"
import Pill from "@/components/ui/pills/Pill"
import Last_Updated from "@/components/system/Last_Updated"
import Theme_Switch from "@/components/ui/switchers/Theme_Switch"
import Agent_Status_Pill from "@/components/system/Agent_Status_Pill"
import Language_Switch from "@/components/ui/switchers/Language_Switch"

export default function Topbar() {
    const { dictionary } = useLanguage()

    return (
        <Card
            topBorder={false}
            rightBorder={false}
            bottomBorder
            leftBorder={false}
            rounded={false}
            className="absolute left-[264px] top-0 w-[calc(100%-264px)] h-16 flex flex-row items-center justify-between gap-3 p-3"
        >
            {/* Agent connection status */}
            <Agent_Status_Pill />

            <div className="flex flex-row items-center gap-3">
                {/* Host information */}
                <Pill title={dictionary.common.host.title}>
                    <span className="paragraph_tiny">{dictionary.common.host.localMachine}</span>
                </Pill>

                {/* Latest successful telemetry refresh */}
                <Last_Updated />

                {/* Language switcher */}
                <Language_Switch />

                {/* Theme switcher */}
                <Theme_Switch />
            </div>
        </Card>
    )
}
