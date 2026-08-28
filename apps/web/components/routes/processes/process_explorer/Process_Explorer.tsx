"use client"

import type { ProcessExplorerData } from "@/types/routes/processes"

import { useState } from "react"
import { useLanguage } from "@/i18n/Language_Context"
import { getProcessStateStyle } from "@/lib/processes/processStateStyles"
import { processVisibilityStyles } from "@/lib/processes/processVisibilityStyles"

import Paragraph from "@/components/ui/text/Paragraph"
import Status_Pill from "@/components/ui/pills/Status_Pill"
import Pagination from "@/components/ui/navigation/Pagination"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Process_Explorer_Props = {
    data: ProcessExplorerData
    className?: string
}

function formatIdentifier(value: number | null, unavailable: string): string {
    if (value === null || !Number.isFinite(value)) {
        return unavailable
    }

    return String(Math.floor(value))
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

    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(value)
}

function formatMemory(value: number | null, language: "en" | "de", unavailable: string): string {
    if (value === null || !Number.isFinite(value)) {
        return unavailable
    }

    const locale = language === "de" ? "de-DE" : "en-GB"

    return `${new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(value)} MB`
}

export default function Process_Explorer({ data, className = "" }: Process_Explorer_Props) {
    const { language, dictionary } = useLanguage()

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const visibleRows = data.rows.slice(startIndex, endIndex)

    const copy = dictionary.processes.processExplorer
    const common = dictionary.processes.common

    return (
        <Section_Frame title={copy.title} className={className} contentClassName="px-3 pb-3 pt-2">
            <div className="flex min-h-0 flex-col">
                <div className="grid grid-cols-[72px_72px_minmax(180px,1.4fr)_minmax(120px,1fr)_90px_90px_110px_90px_110px_110px] items-center gap-3 border-y border-[var(--border-neutral)] bg-[var(--panel-light)] px-3 py-2">
                    <Paragraph className="paragraph_tiny uppercase">{copy.columns.pid}</Paragraph>
                    <Paragraph className="paragraph_tiny uppercase">{copy.columns.ppid}</Paragraph>
                    <Paragraph className="paragraph_tiny uppercase">{copy.columns.name}</Paragraph>
                    <Paragraph className="paragraph_tiny uppercase">{copy.columns.user}</Paragraph>
                    <Paragraph className="paragraph_tiny text-right uppercase">
                        {copy.columns.cpu}
                    </Paragraph>
                    <Paragraph className="paragraph_tiny text-right uppercase">
                        {copy.columns.memoryPercent}
                    </Paragraph>
                    <Paragraph className="paragraph_tiny text-right uppercase">
                        {copy.columns.memory}
                    </Paragraph>
                    <Paragraph className="paragraph_tiny text-right uppercase">
                        {copy.columns.threads}
                    </Paragraph>
                    <Paragraph className="paragraph_tiny text-right uppercase">
                        {copy.columns.state}
                    </Paragraph>
                    <Paragraph className="paragraph_tiny text-right uppercase">
                        {copy.columns.visibility}
                    </Paragraph>
                </div>

                {data.rows.length > 0 ? (
                    <ul className="flex flex-col">
                        {visibleRows.map((process) => (
                            <li
                                key={process.pid}
                                className="grid grid-cols-[72px_72px_minmax(180px,1.4fr)_minmax(120px,1fr)_90px_90px_110px_90px_110px_110px] items-center gap-3 border-b border-[var(--border-neutral)] px-3 py-2"
                            >
                                <span className="paragraph_tiny tabular-nums">
                                    {formatIdentifier(process.pid, common.unavailable)}
                                </span>
                                <span className="paragraph_tiny tabular-nums">
                                    {formatIdentifier(process.ppid, common.unavailable)}
                                </span>
                                <span className="paragraph_tiny truncate">
                                    {process.name ?? common.unavailable}
                                </span>
                                <span className="paragraph_tiny truncate">
                                    {process.username ?? common.unavailable}
                                </span>
                                <span className="paragraph_tiny text-right tabular-nums">
                                    {formatPercentage(
                                        process.cpuPercent,
                                        language,
                                        common.unavailable
                                    )}
                                </span>
                                <span className="paragraph_tiny text-right tabular-nums">
                                    {formatPercentage(
                                        process.memoryPercent,
                                        language,
                                        common.unavailable
                                    )}
                                </span>
                                <span className="paragraph_tiny text-right tabular-nums">
                                    {formatMemory(process.memoryMb, language, common.unavailable)}
                                </span>
                                <span className="paragraph_tiny text-right tabular-nums">
                                    {formatIdentifier(process.threads, common.unavailable)}
                                </span>
                                <div className="flex justify-end">
                                    <span
                                        className={`paragraph_tiny text-right uppercase ${getProcessStateStyle(
                                            process.status
                                        )}`}
                                    >
                                        {process.status ?? common.unavailable}
                                    </span>
                                </div>
                                <div className="flex justify-end">
                                    <Status_Pill
                                        className={processVisibilityStyles[process.visibility]}
                                    >
                                        {process.visibility}
                                    </Status_Pill>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex min-h-24 items-center justify-center border-b border-[var(--border-neutral)] px-4 text-center">
                        <Paragraph className="paragraph_small muted_color">
                            {common.unavailable}
                        </Paragraph>
                    </div>
                )}

                {data.rows.length > 0 && (
                    <Pagination
                        page={page}
                        totalItems={data.rows.length}
                        pageSize={pageSize}
                        onPageChange={setPage}
                        onPageSizeChange={(size) => {
                            setPageSize(size)
                            setPage(1)
                        }}
                        showingLabel={copy.pagination.showing}
                        ofLabel={copy.pagination.of}
                        itemLabel={copy.pagination.processes}
                    />
                )}
            </div>
        </Section_Frame>
    )
}
