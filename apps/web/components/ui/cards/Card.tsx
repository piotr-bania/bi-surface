import type { ReactNode } from "react"

type CardProps = {
    children: ReactNode
    topBorder?: boolean
    rightBorder?: boolean
    bottomBorder?: boolean
    leftBorder?: boolean
    background?: boolean
    className?: string
}

export default function Card({
    children,
    className = "",
    topBorder = true,
    rightBorder = true,
    bottomBorder = true,
    leftBorder = true,
    background = true,
}: CardProps) {
    const borderClasses = `${topBorder ? "border-t border-t-[var(--border-neutral)]" : "border-t-0"} ${rightBorder ? "border-r border-r-[var(--border-neutral)]" : "border-r-0"} ${bottomBorder ? "border-b border-b-[var(--border-neutral)]" : "border-b-0"} ${leftBorder ? "border-l border-l-[var(--border-neutral)]" : "border-l-0"}`

    return (
        <div
            className={`gap-3 p-3 ${borderClasses} ${background ? "bg-[var(--panel-dark)]" : "bg-transparent"} ${className}`}
        >
            {children}
        </div>
    )
}
