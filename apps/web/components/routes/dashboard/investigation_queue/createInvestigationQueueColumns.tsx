import type { Table_Column } from "@/components/ui/tables/Table"
import type { Language } from "@/i18n"
import type { DashboardDictionary, InvestigationQueueItem } from "@/types/routes/dashboard"

import { investigationSeverityStyles } from "@/lib/dashboard/investigationQueueStyles"
import { formatElapsedAge } from "@/lib/formatters/formatElapsedAge"
import { formatTime } from "@/lib/formatters/formatTime"

import Paragraph from "@/components/ui/text/Paragraph"

type CreateInvestigationQueueColumnsInput = {
    columns: DashboardDictionary["investigationQueue"]["table"]
    language: Language
    now: number
}

export function createInvestigationQueueColumns({
    columns,
    language,
    now,
}: CreateInvestigationQueueColumnsInput): readonly Table_Column<InvestigationQueueItem>[] {
    return [
        {
            key: "priority-item",
            header: columns.priorityItem,
            renderCell: (item) => {
                const severityStyle = investigationSeverityStyles[item.severity]

                return (
                    <div className="flex min-w-0 items-center gap-2">
                        <span
                            aria-hidden="true"
                            className={`size-2 shrink-0 rounded-full ${severityStyle.dot}`}
                        />

                        <Paragraph className="paragraph_tiny truncate">{item.title}</Paragraph>
                    </div>
                )
            },
        },
        {
            key: "first-seen",
            header: columns.firstSeen,
            align: "right",
            width: 116,
            cellClassName: "tabular-nums",
            renderCell: (item) => (
                <time dateTime={new Date(item.firstSeen).toISOString()}>
                    {formatTime(item.firstSeen, language)}
                </time>
            ),
        },
        {
            key: "age",
            header: columns.age,
            align: "right",
            width: 64,
            cellClassName: "tabular-nums",
            renderCell: (item) => formatElapsedAge(item.firstSeen, now),
        },
    ]
}
