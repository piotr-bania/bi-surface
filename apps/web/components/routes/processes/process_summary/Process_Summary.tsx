"use client"

import type { ProcessSummaryData } from "@/types/routes/processes"

import { useLanguage } from "@/i18n/Language_Context"
import { PiArrowFatLinesUpDuotone } from "react-icons/pi"

import Paragraph from "@/components/ui/text/Paragraph"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Process_Summary_Props = {
    data: ProcessSummaryData
    className?: string
}

type SummaryMetricProps = {
    label: string
    value: string
    hasNumericValue: boolean
    valueClassName?: string
    borderRight?: boolean
}

function SummaryMetric({
    label,
    value,
    hasNumericValue,
    valueClassName = "primary_color",
    borderRight = true,
}: SummaryMetricProps) {
    return (
        <div
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-4 ${
                borderRight ? "border-r border-[var(--border-neutral)]" : ""
            }`}
        >
            <Paragraph className="paragraph_tiny whitespace-nowrap">{label}</Paragraph>

            <Paragraph
                className={`${
                    hasNumericValue ? "header_5" : "paragraph_small"
                } whitespace-nowrap tabular-nums ${valueClassName}`}
            >
                {value}
            </Paragraph>
        </div>
    )
}

function formatCount(value: number | null, unavailable: string): string {
    if (value === null || !Number.isFinite(value)) {
        return unavailable
    }

    return Math.max(0, Math.floor(value)).toLocaleString()
}

function formatPid(value: number | null, unavailable: string): string {
    if (value === null || !Number.isFinite(value)) {
        return unavailable
    }

    return String(Math.max(0, Math.floor(value)))
}

function hasNumericValue(value: number | null): value is number {
    return value !== null && Number.isFinite(value)
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

export default function Process_Summary({ data, className = "" }: Process_Summary_Props) {
    const { language, dictionary } = useLanguage()

    const copy = dictionary.processes.processSummary
    const common = dictionary.processes.common

    return (
        <Section_Frame title={copy.title} className={className} contentClassName="px-0 pb-3 pt-2">
            <div className="flex w-full items-stretch">
                <SummaryMetric
                    label={copy.labels.total}
                    value={formatCount(data.total, common.unavailable)}
                    hasNumericValue={hasNumericValue(data.total)}
                    valueClassName="primary_color"
                />

                <SummaryMetric
                    label={copy.labels.visible}
                    value={formatCount(data.visible, common.unavailable)}
                    hasNumericValue={hasNumericValue(data.visible)}
                    valueClassName="success"
                />

                <SummaryMetric
                    label={copy.labels.partial}
                    value={formatCount(data.partial, common.unavailable)}
                    hasNumericValue={hasNumericValue(data.partial)}
                    valueClassName="warning"
                />

                <SummaryMetric
                    label={copy.labels.accessDenied}
                    value={formatCount(data.accessDenied, common.unavailable)}
                    hasNumericValue={hasNumericValue(data.accessDenied)}
                    valueClassName="danger"
                />

                <SummaryMetric
                    label={copy.labels.running}
                    value={formatCount(data.running, common.unavailable)}
                    hasNumericValue={hasNumericValue(data.running)}
                    valueClassName="info"
                />

                <SummaryMetric
                    label={copy.labels.sleeping}
                    value={formatCount(data.sleeping, common.unavailable)}
                    hasNumericValue={hasNumericValue(data.sleeping)}
                    valueClassName="secondary_color"
                />

                <SummaryMetric
                    label={copy.labels.agentPid}
                    value={formatPid(data.agentPid, common.unavailable)}
                    hasNumericValue={hasNumericValue(data.agentPid)}
                    borderRight={false}
                    valueClassName="accent_color"
                />

                <div className="flex min-w-0 flex-2 items-center gap-5 border-l border-[var(--border-neutral)] px-5">
                    <div className="flex flex-col gap-1">
                        <Paragraph className="paragraph_tiny primary_color uppercase">
                            {copy.labels.visibility}
                        </Paragraph>

                        <div className="flex flex-row gap-9 items-center justify-between">
                            <Paragraph
                                className={`${
                                    hasNumericValue(data.visibilityPercent)
                                        ? "header_5"
                                        : "paragraph_small"
                                } primary_color whitespace-nowrap tabular-nums`}
                            >
                                {formatPercentage(
                                    data.visibilityPercent,
                                    language,
                                    common.unavailable
                                )}
                            </Paragraph>
                            <button
                                type="button"
                                disabled
                                className="accent_color accent_border_color "
                            >
                                <PiArrowFatLinesUpDuotone className="inline mr-1" />
                                {copy.labels.elevateAgent}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Section_Frame>
    )
}
