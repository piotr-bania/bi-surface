import type { CSSProperties, Key, ReactNode } from "react"

export type Table_Column<T> = {
    key: string
    header: ReactNode
    renderCell: (row: T, rowIndex: number) => ReactNode
    align?: "left" | "center" | "right"
    width?: CSSProperties["width"]
    headerClassName?: string
    cellClassName?: string
}

type Table_Props<T> = {
    columns: readonly Table_Column<T>[]
    rows: readonly T[]
    getRowKey: (row: T, rowIndex: number) => Key
    emptyState: ReactNode
    ariaLabel?: string
    className?: string
    tableClassName?: string
    headerRowClassName?: string
    rowClassName?: string | ((row: T, rowIndex: number) => string)
}

const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
} as const

export default function Table<T>({
    columns,
    rows,
    getRowKey,
    emptyState,
    ariaLabel,
    className = "",
    tableClassName = "",
    headerRowClassName = "",
    rowClassName = "",
}: Table_Props<T>) {
    return (
        <div className={`min-w-0 overflow-x-auto ${className}`}>
            <table aria-label={ariaLabel} className={`w-full border-collapse ${tableClassName}`}>
                <colgroup>
                    {columns.map((column) => (
                        <col key={column.key} style={{ width: column.width }} />
                    ))}
                </colgroup>

                <thead>
                    <tr
                        className={`border-y border-[var(--border-neutral)] bg-[var(--panel-light)] ${headerRowClassName}`}
                    >
                        {columns.map((column) => {
                            const alignment = column.align ?? "left"

                            return (
                                <th
                                    key={column.key}
                                    scope="col"
                                    className={`paragraph_tiny px-3 py-2 font-normal uppercase ${alignmentClasses[alignment]} ${column.headerClassName ?? ""}`}
                                >
                                    {column.header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, rowIndex) => {
                            const resolvedRowClassName =
                                typeof rowClassName === "function"
                                    ? rowClassName(row, rowIndex)
                                    : rowClassName

                            return (
                                <tr
                                    key={getRowKey(row, rowIndex)}
                                    className={`border-b border-[var(--border-neutral)] ${resolvedRowClassName}`}
                                >
                                    {columns.map((column) => {
                                        const alignment = column.align ?? "left"

                                        return (
                                            <td
                                                key={column.key}
                                                className={`paragraph_tiny px-3 py-2 ${alignmentClasses[alignment]} ${column.cellClassName ?? ""}`}
                                            >
                                                {column.renderCell(row, rowIndex)}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    ) : (
                        <tr className="border-b border-[var(--border-neutral)]">
                            <td
                                colSpan={columns.length}
                                className="h-24 px-4 text-center align-middle"
                            >
                                {emptyState}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
