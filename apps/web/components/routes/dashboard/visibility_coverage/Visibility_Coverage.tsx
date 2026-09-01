"use client"

import type { IconType } from "react-icons"
import type { VisibilityCoverageData, VisibilitySourceId } from "@/types/routes/dashboard"

import {
    PiDatabaseDuotone,
    PiFileTextDuotone,
    PiGearDuotone,
    PiGlobeDuotone,
    PiLockKeyDuotone,
    PiWrenchDuotone,
} from "react-icons/pi"
import { useLanguage } from "@/i18n/Language_Context"
import { visibilityStyles } from "@/lib/dashboard/visibilityStyles"

import Paragraph from "@/components/ui/text/Paragraph"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Visibility_Coverage_Props = {
    data: VisibilityCoverageData
    className?: string
}

const sourceIcons: Record<VisibilitySourceId, IconType> = {
    processes: PiGearDuotone,
    network: PiGlobeDuotone,
    services: PiWrenchDuotone,
    files: PiFileTextDuotone,
    registry: PiDatabaseDuotone,
}

function normalisePercentage(value: number | null): number | null {
    if (value === null || !Number.isFinite(value)) {
        return null
    }

    return Math.min(100, Math.max(0, value))
}

function formatOverallPercentage(value: number, language: "en" | "de"): string {
    const locale = language === "de" ? "de-DE" : "en-GB"

    return `${new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(value)}%`
}

export default function Visibility_Coverage({ data, className = "" }: Visibility_Coverage_Props) {
    const { language, dictionary } = useLanguage()

    const overallStyle = visibilityStyles[data.overallState]
    const copy = dictionary.dashboard.visibilityCoverage
    const hasElevationRequirement = data.items.some((item) => item.requiresElevation)

    return (
        <Section_Frame title={copy.title} className={className} contentClassName="px-4 pb-4 pt-3">
            <div className="flex h-full flex-col gap-4 sm:flex-row">
                <ul className="flex min-w-0 flex-1 flex-col justify-center gap-4">
                    {data.items.map((item) => {
                        const Icon = sourceIcons[item.id]
                        const style = visibilityStyles[item.state]
                        const percentage = normalisePercentage(item.visibilityPercent)
                        const sourceLabel = copy.sources[item.id]
                        const stateLabel = copy.states[item.state]

                        return (
                            <li
                                key={item.id}
                                className="grid grid-cols-[auto_minmax(82px,auto)_minmax(64px,1fr)_auto] items-center gap-3"
                            >
                                <Icon
                                    aria-hidden="true"
                                    className="paragraph_color size-6 shrink-0"
                                />

                                <Paragraph className="paragraph_small whitespace-nowrap">
                                    {sourceLabel}
                                </Paragraph>

                                {percentage !== null ? (
                                    <div
                                        role="progressbar"
                                        aria-label={`${sourceLabel}: ${percentage}%`}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-valuenow={percentage}
                                        className="h-1 overflow-hidden bg-[var(--border-neutral)]"
                                    >
                                        <span
                                            className={`block h-full ${style.bar}`}
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        aria-hidden="true"
                                        className="h-1 border-t border-dashed border-[var(--border-neutral)]"
                                    />
                                )}

                                <div className="flex min-w-[76px] items-center justify-end gap-1.5">
                                    {item.requiresElevation && (
                                        <PiLockKeyDuotone
                                            aria-label={copy.requiresElevation}
                                            title={copy.requiresElevation}
                                            className={`size-3.5 shrink-0 ${style.text}`}
                                        />
                                    )}

                                    <Paragraph
                                        className={`paragraph_tiny whitespace-nowrap uppercase ${style.text}`}
                                    >
                                        {stateLabel}
                                    </Paragraph>
                                </div>
                            </li>
                        )
                    })}
                </ul>

                <div className="flex w-32 shrink-0 flex-col items-stretch justify-between gap-4 border-l border-[var(--border-neutral)] pl-4">
                    <div className="flex flex-col items-end">
                        <Paragraph className="paragraph_tiny uppercase">
                            {copy.summary.overall}
                        </Paragraph>

                        <Paragraph className={`header_3 tabular-nums ${overallStyle.text}`}>
                            {formatOverallPercentage(data.overallVisibilityPercent, language)}
                        </Paragraph>

                        <Paragraph className={`paragraph_tiny uppercase ${overallStyle.text}`}>
                            {copy.summary.visible}
                        </Paragraph>
                    </div>

                    {hasElevationRequirement && (
                        <div className="accent_border_color flex flex-col items-center gap-2 rounded-sm border p-2 text-center">
                            <PiLockKeyDuotone aria-hidden="true" className="accent_color size-5" />

                            <Paragraph className="paragraph_tiny accent_color">
                                {copy.requiresElevation}
                            </Paragraph>
                        </div>
                    )}
                </div>
            </div>
        </Section_Frame>
    )
}
