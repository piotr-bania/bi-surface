"use client"

import { PiCaretLeftDuotone, PiDotsThreeDuotone, PiCaretRightDuotone } from "react-icons/pi"

import Select from "@/components/ui/inputs/Select"
import Paragraph from "@/components/ui/text/Paragraph"

type PaginationItem = number | "ellipsis"

function createPaginationItems(page: number, totalPages: number): PaginationItem[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    if (page <= 4) {
        return [1, 2, 3, 4, 5, "ellipsis", totalPages]
    }

    if (page >= totalPages - 3) {
        return [
            1,
            "ellipsis",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ]
    }

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages]
}

type Pagination_Props = {
    page: number
    totalItems: number
    pageSize: number
    pageSizeOptions?: number[]
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
    itemLabel: string
    showingLabel: string
    ofLabel: string
}

export default function Pagination({
    page,
    totalItems,
    pageSize,
    pageSizeOptions = [10, 25, 50, 100],
    onPageChange,
    onPageSizeChange,
    itemLabel,
    showingLabel,
    ofLabel,
}: Pagination_Props) {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
    const end = Math.min(page * pageSize, totalItems)
    const paginationItems = createPaginationItems(page, totalPages)

    return (
        <div className="flex items-center justify-between gap-4 pt-3">
            <Paragraph className="paragraph_tiny primary_color whitespace-nowrap">
                {showingLabel} {start}–{end} {ofLabel} {totalItems} {itemLabel}
            </Paragraph>

            <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        aria-label="Previous page"
                        className={page === 1 ? undefined : "panel_light_color"}
                    >
                        <PiCaretLeftDuotone className="size-4" />
                    </button>

                    {paginationItems.map((item, index) => {
                        if (item === "ellipsis") {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="flex items-center justify-center"
                                    aria-hidden="true"
                                >
                                    <PiDotsThreeDuotone className="size-6" />
                                </span>
                            )
                        }

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => onPageChange(item)}
                                aria-current={item === page ? "page" : undefined}
                                className={`flex items-center justify-center ${
                                    item === page
                                        ? "sidebar-button primary_color primary_border_color panel_light_color"
                                        : "panel_light_color"
                                }`}
                            >
                                {item}
                            </button>
                        )
                    })}

                    <button
                        type="button"
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                        aria-label="Next page"
                        className={page === totalPages ? undefined : "panel_light_color"}
                    >
                        <PiCaretRightDuotone className="size-4" />
                    </button>
                </div>

                <Select
                    value={pageSize}
                    ariaLabel="Rows per page"
                    options={pageSizeOptions.map((size) => ({
                        value: size,
                        label: String(size),
                    }))}
                    onChange={(value) => onPageSizeChange(Number(value))}
                />
            </div>
        </div>
    )
}
