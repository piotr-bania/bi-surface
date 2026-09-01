import type { Table_Column } from "@/components/ui/tables/Table"
import type { Language } from "@/i18n"
import type { ProcessesDictionary, ProcessExplorerRow } from "@/types/routes/processes"

import { formatIdentifier } from "@/lib/formatters/formatIdentifier"
import { formatMemory } from "@/lib/formatters/formatMemory"
import { formatPercentage } from "@/lib/formatters/formatPercentage"
import { getProcessStateStyle } from "@/lib/processes/processStateStyles"
import { processVisibilityStyles } from "@/lib/processes/processVisibilityStyles"

import Status_Pill from "@/components/ui/pills/Status_Pill"

type CreateProcessExplorerColumnsInput = {
    columns: ProcessesDictionary["processExplorer"]["columns"]
    language: Language
    unavailable: string
}

export function createProcessExplorerColumns({
    columns,
    language,
    unavailable,
}: CreateProcessExplorerColumnsInput): readonly Table_Column<ProcessExplorerRow>[] {
    return [
        {
            key: "pid",
            header: columns.pid,
            width: 72,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatIdentifier(process.pid, unavailable),
        },
        {
            key: "ppid",
            header: columns.ppid,
            width: 72,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatIdentifier(process.ppid, unavailable),
        },
        {
            key: "name",
            header: columns.name,
            width: "22%",
            renderCell: (process) => (
                <span className="block truncate">{process.name ?? unavailable}</span>
            ),
        },
        {
            key: "user",
            header: columns.user,
            width: "18%",
            renderCell: (process) => (
                <span className="block truncate">{process.username ?? unavailable}</span>
            ),
        },
        {
            key: "cpu",
            header: columns.cpu,
            align: "right",
            width: 90,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatPercentage(process.cpuPercent, language, unavailable),
        },
        {
            key: "memory-percent",
            header: columns.memoryPercent,
            align: "right",
            width: 90,
            cellClassName: "tabular-nums",
            renderCell: (process) =>
                formatPercentage(process.memoryPercent, language, unavailable),
        },
        {
            key: "memory",
            header: columns.memory,
            align: "right",
            width: 110,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatMemory(process.memoryMb, language, unavailable),
        },
        {
            key: "threads",
            header: columns.threads,
            align: "right",
            width: 90,
            cellClassName: "tabular-nums",
            renderCell: (process) => formatIdentifier(process.threads, unavailable),
        },
        {
            key: "state",
            header: columns.state,
            align: "right",
            width: 110,
            renderCell: (process) => (
                <span className={`uppercase ${getProcessStateStyle(process.status)}`}>
                    {process.status ?? unavailable}
                </span>
            ),
        },
        {
            key: "visibility",
            header: columns.visibility,
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
}
