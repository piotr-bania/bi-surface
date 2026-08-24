import type { ReactNode } from "react"

import Heading from "@/components/ui/text/Heading"

type Section_Frame_Props = {
    number?: string
    title: string
    children: ReactNode
    className?: string
    contentClassName?: string
    headerRight?: ReactNode
}

export default function Section_Frame({
    number,
    title,
    children,
    className = "",
    contentClassName = "p-4 pt-3",
    headerRight,
}: Section_Frame_Props) {
    const accessibleTitle = number ? `${number} ${title}` : title

    return (
        <div
            aria-label={accessibleTitle}
            className={`relative flex flex-col gap-0 rounded-sm border border-[var(--border-neutral)] bg-[var(--panel-dark)] p-0 ${className}`}
        >
            <span
                aria-hidden="true"
                className="absolute right-2 top-2 size-3 border-r border-t border-[var(--border-neutral)]"
            />

            <header className="flex min-h-10 items-center justify-between gap-4 px-4 pt-3 pr-8">
                <Heading as="h2" className="header_6 secondary_color flex items-center gap-2">
                    {number && <span aria-hidden="true">{number}</span>}
                    <span>{title}</span>
                </Heading>

                {headerRight && <div className="shrink-0">{headerRight}</div>}
            </header>

            <div className={contentClassName}>{children}</div>
        </div>
    )
}
