"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/i18n/Language_Context"
import { investigationMetricStyles } from "@/lib/dashboard/investigationQueueStyles"
import { INVESTIGATION_QUEUE_METRICS, type InvestigationQueueData } from "@/types/routes/dashboard"
import { createInvestigationQueueColumns } from "@/components/routes/dashboard/investigation_queue/createInvestigationQueueColumns"

import Link from "next/link"
import Table from "@/components/ui/tables/Table"
import Paragraph from "@/components/ui/text/Paragraph"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Investigation_Queue_Props = {
    data: InvestigationQueueData
    className?: string
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
    const columns = createInvestigationQueueColumns({
        columns: copy.table,
        language,
        now,
    })

    return (
        <Section_Frame title={copy.title} className={className} contentClassName="px-4 pb-4 pt-3">
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
                    <Table
                        ariaLabel={copy.title}
                        columns={columns}
                        rows={hasQueueItems ? data.items : []}
                        getRowKey={(item) => item.id}
                        className={hasQueueItems ? "" : "flex-1"}
                        tableClassName={`table-fixed ${hasQueueItems ? "" : "h-full"}`}
                        emptyState={
                            <div aria-live="polite" className="text-center">
                                <Paragraph className="paragraph_small muted_color">
                                    {stateMessage ?? copy.states.empty}
                                </Paragraph>
                            </div>
                        }
                    />

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
