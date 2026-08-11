import type { ReactNode } from "react"

type PillProps = {
    title?: string
    showTitle?: boolean
    showDot?: boolean
    dotClassName?: string
    className?: string
    children?: ReactNode
}

export default function Pill({
    title,
    showTitle = true,
    showDot = false,
    dotClassName = "bg-success",
    children,
    className,
}: PillProps) {
    return (
        <div
            className={`w-fit inline-flex items-center overflow-hidden rounded-sm border border-[var(--border-neutral)] bg-[var(--panel-light)] ${className ?? ""}`}
        >
            {showTitle && title && (
                <div className="w-fit flex items-center border-r border-[var(--border-neutral)] p-3 py-1">
                    <span className="paragraph_tiny primary_color uppercase">{title}</span>
                </div>
            )}

            {children && (
                <div className="w-fit flex items-center gap-2 p-2">
                    {showDot && (
                        <span
                            aria-hidden="true"
                            className={`size-[6px] shrink-0 rounded-full ${dotClassName}`}
                        />
                    )}

                    <div className="flex items-center">{children}</div>
                </div>
            )}
        </div>
    )
}
