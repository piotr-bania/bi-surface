"use client"

import type { HostPostureData } from "@/types/routes/dashboard"

import {
    PiCpuDuotone,
    PiListBulletsDuotone,
    PiMemoryDuotone,
    PiMonitorDuotone,
} from "react-icons/pi"
import { useLanguage } from "@/i18n/Language_Context"
import { monitoringStyles } from "@/lib/dashboard/monitoringStyles"
import { agentHealthStyles } from "@/lib/dashboard/agentHealthStyles"

import Paragraph from "@/components/ui/text/Paragraph"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Host_Posture_Props = {
    data: HostPostureData
    className?: string
}

function formatUptime(uptimeSeconds: number | null, unavailable: string): string {
    if (uptimeSeconds === null || !Number.isFinite(uptimeSeconds)) {
        return unavailable
    }

    const totalSeconds = Math.max(0, Math.floor(uptimeSeconds))
    const days = Math.floor(totalSeconds / 86_400)
    const hours = Math.floor((totalSeconds % 86_400) / 3_600)
    const minutes = Math.floor((totalSeconds % 3_600) / 60)
    const seconds = totalSeconds % 60
    const time = [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":")

    return days > 0 ? `${days}d ${time}` : time
}

function formatPercentage(
    value: number | null,
    language: "en" | "de",
    unavailable: string
): string {
    if (value === null || !Number.isFinite(value)) {
        return unavailable
    }

    const locale = language === "de" ? "de-DE" : "en-GB"

    return `${new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
    }).format(value)}%`
}

function formatCount(value: number | null, language: "en" | "de", unavailable: string): string {
    if (value === null || !Number.isFinite(value)) {
        return unavailable
    }

    const locale = language === "de" ? "de-DE" : "en-GB"

    return Math.max(0, Math.floor(value)).toLocaleString(locale)
}

export default function Host_Posture({ data, className = "" }: Host_Posture_Props) {
    const { language, dictionary } = useLanguage()

    const copy = dictionary.dashboard.hostPosture
    const monitoringStyle = monitoringStyles[data.monitoringState]
    const agentHealthStyle = agentHealthStyles[data.agentHealth]
    const operatingSystem = [data.operatingSystem, data.osVersion].filter(Boolean).join(" · ")

    return (
        <Section_Frame
            number={copy.frameNumber}
            title={copy.title}
            className={className}
            contentClassName="px-4 pb-4 pt-3"
        >
            <div className="flex flex-row items-center justify-between gap-3">
                <div className="flex justify-center">
                    <div
                        className={`relative flex size-36 items-center justify-center rounded-full border-2 ${monitoringStyle.border} ${monitoringStyle.glow}`}
                    >
                        <span
                            aria-hidden="true"
                            className={`absolute -inset-2 rounded-full border border-dashed ${monitoringStyle.border} opacity-50`}
                        />

                        <div className={`flex flex-col items-center gap-2 ${monitoringStyle.text}`}>
                            <PiMonitorDuotone aria-hidden="true" className="size-12" />

                            <span className="paragraph_small uppercase">
                                {copy.monitoringStates[data.monitoringState]}
                            </span>
                        </div>
                    </div>
                </div>

                <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
                    <dt className="paragraph_small muted_color">{copy.labels.hostname}</dt>

                    <dd className="paragraph_small heading_color">
                        {data.hostname ?? copy.unavailable}
                    </dd>

                    <dt className="paragraph_small muted_color">{copy.labels.operatingSystem}</dt>

                    <dd className="paragraph_small heading_color">
                        {operatingSystem || copy.unavailable}
                    </dd>

                    <dt className="paragraph_small muted_color">{copy.labels.uptime}</dt>

                    <dd className="paragraph_small heading_color">
                        {formatUptime(data.uptimeSeconds, copy.unavailable)}
                    </dd>

                    <dt className="paragraph_small muted_color">{copy.labels.agentStatus}</dt>

                    <dd
                        className={`paragraph_small flex items-center gap-2 ${agentHealthStyle.text}`}
                    >
                        <span
                            aria-hidden="true"
                            className={`size-2 rounded-full ${agentHealthStyle.dot}`}
                        />

                        {copy.agentHealthStates[data.agentHealth]}
                    </dd>
                </dl>
            </div>

            <div className="mt-5 grid grid-cols-1 border-t border-[var(--border-neutral)] pt-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 border-b border-[var(--border-neutral)] py-3 sm:border-b-0 sm:border-r sm:py-0">
                    <PiCpuDuotone aria-hidden="true" className="primary_color size-7 shrink-0" />

                    <div>
                        <Paragraph className="paragraph_tiny muted_color">
                            {copy.labels.cpu}
                        </Paragraph>

                        <Paragraph className="header_6 primary_color">
                            {formatPercentage(data.cpuPercent, language, copy.unavailable)}
                        </Paragraph>
                    </div>
                </div>

                <div className="flex items-center gap-3 border-b border-[var(--border-neutral)] py-3 sm:border-b-0 sm:border-r sm:px-4 sm:py-0">
                    <PiMemoryDuotone aria-hidden="true" className="accent_color size-7 shrink-0" />

                    <div>
                        <Paragraph className="paragraph_tiny muted_color">
                            {copy.labels.memory}
                        </Paragraph>

                        <Paragraph className="header_6 accent_color">
                            {formatPercentage(data.memoryPercent, language, copy.unavailable)}
                        </Paragraph>
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-3 sm:px-4 sm:pt-0">
                    <PiListBulletsDuotone
                        aria-hidden="true"
                        className="secondary_color size-7 shrink-0"
                    />

                    <div>
                        <Paragraph className="paragraph_tiny muted_color">
                            {copy.labels.processes}
                        </Paragraph>

                        <Paragraph className="header_6 secondary_color">
                            {formatCount(data.processCount, language, copy.unavailable)}
                        </Paragraph>
                    </div>
                </div>
            </div>
        </Section_Frame>
    )
}
