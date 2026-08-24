"use client"

import { useEffect, useState } from "react"
import {
    investigationMetricStyles,
    investigationSeverityStyles,
} from "@/lib/dashboard/investigationQueueStyles"
import { useLanguage } from "@/i18n/Language_Context"
import { INVESTIGATION_QUEUE_METRICS, type InvestigationQueueData } from "@/types/routes/dashboard"

import Link from "next/link"
import Paragraph from "@/components/ui/text/Paragraph"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Investigation_Queue_Props = {
    data: InvestigationQueueData
    className?: string
}

function formatFirstSeen(firstSeen: number, language: "en" | "de"): string {
    const locale = language === "de" ? "de-DE" : "en-GB"

    return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(firstSeen)
}

function formatAge(firstSeen: number, now: number): string {
    const totalSeconds = Math.max(0, Math.floor((now - firstSeen) / 1000))
    const days = Math.floor(totalSeconds / 86_400)
    const hours = Math.floor((totalSeconds % 86_400) / 3_600)
    const minutes = Math.floor((totalSeconds % 3_600) / 60)
    const seconds = totalSeconds % 60

    if (days > 0) {
        return `${days}d ${String(hours).padStart(2, "0")}h`
    }

    if (hours > 0) {
        return `${hours}h ${String(minutes).padStart(2, "0")}m`
    }

    return `${minutes}m ${String(seconds).padStart(2, "0")}s`
}

export default function Investigation_Queue({ data, className = "" }: Investigation_Queue_Props) {
    const { language, dictionary } = useLanguage()

    const [now, setNow] = useState(() => Date.now())

    const copy = dictionary.dashboard.investigationQueue

    useEffect(() => {
        if (data.items.length === 0) {
            return
        }

        const intervalId = window.setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [data.items.length])

    const stateMessage =
        data.state === "loading"
            ? copy.states.loading
            : data.state === "empty"
              ? copy.states.empty
              : data.state === "unavailable"
                ? copy.states.unavailable
                : null

    const hasQueueItems = data.state === "active" && data.items.length > 0

    return (
        <Section_Frame
            number={copy.frameNumber}
            title={copy.title}
            className={className}
            contentClassName="px-4 pb-4 pt-3"
        >
            <div className="flex h-full flex-col gap-4">
                <div className="grid grid-cols-4 gap-3">
                    {INVESTIGATION_QUEUE_METRICS.map((metric) => {
                        const style = investigationMetricStyles[metric]

                        const count = data.counts[metric]

                        return (
                            <div
                                key={metric}
                                className={`flex min-w-0 flex-col items-center justify-center border rounded-sm px-2 py-2 text-center ${style.border}`}
                            >
                                <Paragraph className={`header_6 tabular-nums ${style.text}`}>
                                    {count ?? "—"}
                                </Paragraph>

                                <Paragraph className={`paragraph_tiny uppercase ${style.text}`}>
                                    {copy.metrics[metric]}
                                </Paragraph>
                            </div>
                        )
                    })}
                </div>

                <div className="flex min-h-0 flex-1 flex-col">
                    <div className="grid grid-cols-[minmax(0,1fr)_116px_64px] gap-3 border-y border-[var(--border-neutral)] bg-[var(--panel-light)] px-3 py-2">
                        <Paragraph className="paragraph_tiny uppercase">
                            {copy.table.priorityItem}
                        </Paragraph>

                        <Paragraph className="paragraph_tiny text-right uppercase">
                            {copy.table.firstSeen}
                        </Paragraph>

                        <Paragraph className="paragraph_tiny text-right uppercase">
                            {copy.table.age}
                        </Paragraph>
                    </div>

                    {hasQueueItems ? (
                        <ul className="flex flex-col">
                            {data.items.map((item) => {
                                const severityStyle = investigationSeverityStyles[item.severity]

                                return (
                                    <li
                                        key={item.id}
                                        className="grid grid-cols-[minmax(0,1fr)_90px_64px] items-center gap-3 border-b border-[var(--border-neutral)] px-3 py-2"
                                    >
                                        <div className="flex min-w-0 items-center gap-2">
                                            <span
                                                aria-hidden="true"
                                                className={`size-2 shrink-0 rounded-full ${severityStyle.dot}`}
                                            />

                                            <Paragraph className="paragraph_tiny truncate">
                                                {item.title}
                                            </Paragraph>
                                        </div>

                                        <time
                                            dateTime={new Date(item.firstSeen).toISOString()}
                                            className="paragraph_tiny text-right tabular-nums"
                                        >
                                            {formatFirstSeen(item.firstSeen, language)}
                                        </time>

                                        <span className="paragraph_tiny text-right tabular-nums">
                                            {formatAge(item.firstSeen, now)}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <div
                            aria-live="polite"
                            className="flex min-h-24 flex-1 items-center justify-center border-b border-[var(--border-neutral)] px-4 text-center"
                        >
                            <Paragraph className="paragraph_small muted_color">
                                {stateMessage ?? copy.states.empty}
                            </Paragraph>
                        </div>
                    )}

                    <Link
                        href="/detections"
                        className="primary_color paragraph_tiny mt-auto flex items-center gap-2 pt-3 transition-opacity hover:opacity-75"
                    >
                        <span>{copy.viewAll}</span>
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </Section_Frame>
    )
}
