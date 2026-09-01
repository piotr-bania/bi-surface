"use client"

import type { Table_Column } from "@/components/ui/tables/Table"
import type { ProcessExplorerData } from "@/types/routes/processes"

import { useState } from "react"
import { useLanguage } from "@/i18n/Language_Context"
import { getProcessStateStyle } from "@/lib/processes/processStateStyles"
import { processVisibilityStyles } from "@/lib/processes/processVisibilityStyles"

import Table from "@/components/ui/tables/Table"
import Paragraph from "@/components/ui/text/Paragraph"
import Status_Pill from "@/components/ui/pills/Status_Pill"
import Pagination from "@/components/ui/navigation/Pagination"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Process_Explorer_Props = {
    data: ProcessExplorerData
    className?: string
}

type Process_Explorer_Row = ProcessExplorerData["rows"][number]

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

    const columns: readonly Table_Column<Process_Explorer_Row>[] = [
        {
            key: "pid",
            header: copy.columns.pid,
            width: 72,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatIdentifier(process.pid, common.unavailable),
        },
        {
            key: "ppid",
            header: copy.columns.ppid,
            width: 72,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatIdentifier(process.ppid, common.unavailable),
        },
        {
            key: "name",
            header: copy.columns.name,
            width: "22%",
            renderCell: (process) => (
                <span className="block truncate">{process.name ?? common.unavailable}</span>
            ),
        },
        {
            key: "user",
            header: copy.columns.user,
            width: "18%",
            renderCell: (process) => (
                <span className="block truncate">{process.username ?? common.unavailable}</span>
            ),
        },
        {
            key: "cpu",
            header: copy.columns.cpu,
            align: "right",
            width: 90,
            cellClassName: "tabular-nums",
            renderCell: (process) =>
                formatPercentage(process.cpuPercent, language, common.unavailable),
        },
        {
            key: "memory-percent",
            header: copy.columns.memoryPercent,
            align: "right",
            width: 90,
            cellClassName: "tabular-nums",
            renderCell: (process) =>
                formatPercentage(process.memoryPercent, language, common.unavailable),
        },
        {
            key: "memory",
            header: copy.columns.memory,
            align: "right",
            width: 110,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatMemory(process.memoryMb, language, common.unavailable),
        },
        {
            key: "threads",
            header: copy.columns.threads,
            align: "right",
            width: 90,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatIdentifier(process.threads, common.unavailable),
        },
        {
            key: "state",
            header: copy.columns.state,
            align: "right",
            width: 110,
            renderCell: (process) => (
                <span className={`uppercase ${getProcessStateStyle(process.status)}`}>
                    {process.status ?? common.unavailable}
                </span>
            ),
        },
        {
            key: "visibility",
            header: copy.columns.visibility,
            align: "right",
            width: 110,
            renderCell: (process) => (
                <div className="flex justify-end">
                    <Status_Pill className={processVisibilityStyles[process.visibility]}>
                        {process.visibility}
                    </Status_Pill>
                </div>
            ),
        },
    ]

    return (
        <Section_Frame title={copy.title} className={className} contentClassName="px-3 pb-3 pt-2">
            <div className="flex min-h-0 flex-col">
                <Table
                    ariaLabel={copy.title}
                    columns={columns}
                    rows={visibleRows}
                    getRowKey={(process) => process.pid}
                    tableClassName="min-w-[1120px] table-fixed"
                    emptyState={
                        <Paragraph className="paragraph_small muted_color">
                            {common.unavailable}
                        </Paragraph>
                    }
                />

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
