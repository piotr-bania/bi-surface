import type { ReactNode } from "react"

type Status_Pill_Props = {
    children: ReactNode
    className?: string
}

export default function Status_Pill({ children, className = "" }: Status_Pill_Props) {
    return (
        <span
            className={`inline-flex w-fit items-center justify-center rounded-sm border px-2 py-[2px] paragraph_tiny leading-none uppercase ${className}`}
        >
            {children}
        </span>
    )
}
