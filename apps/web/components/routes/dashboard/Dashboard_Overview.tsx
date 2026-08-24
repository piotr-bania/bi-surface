"use client"

import type { HostPostureData } from "@/types/routes/dashboard"

import { useLanguage } from "@/i18n/Language_Context"

import Heading from "@/components/ui/text/Heading"
import Paragraph from "@/components/ui/text/Paragraph"
import Host_Posture from "@/components/routes/dashboard/Host_Posture"

type Dashboard_Overview_Props = {
    hostPosture: HostPostureData
    className?: string
}

export default function Dashboard_Overview({ hostPosture }: Dashboard_Overview_Props) {
    const { dictionary } = useLanguage()

    const copy = dictionary.dashboard

    return (
        <div className="flex min-h-0 w-full flex-col gap-3 p-4">
            <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-1">
                    <Heading as="h1" className="header_3 primary_color">
                        {copy.page.title}
                    </Heading>

                    <Paragraph className="paragraph_small primary_color">
                        {copy.page.description}
                    </Paragraph>
                </div>

                <span className="button_font primary_color primary_border_color w-fit border px-4 py-2 uppercase">
                    {copy.page.localDataOnly}
                </span>
            </header>

            <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
                <Host_Posture data={hostPosture} className="xl:col-span-4" />
            </div>
        </div>
    )
}
