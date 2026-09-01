"use client"

import { useId, type CSSProperties } from "react"

import Paragraph from "@/components/ui/text/Paragraph"

export type Switcher_Props = {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    ariaLabel: string
    label?: string
    checkedText?: string
    uncheckedText?: string
    checkedColor?: string
    uncheckedColor?: string
    thumbColor?: string
    disabled?: boolean
    className?: string
}

type SwitcherStyle = CSSProperties & {
    "--switcher-checked-color": string
    "--switcher-unchecked-color": string
    "--switcher-thumb-color": string
}

export default function Switcher({
    checked,
    onCheckedChange,
    ariaLabel,
    label,
    checkedText,
    uncheckedText,
    checkedColor = "#22c55e",
    uncheckedColor = "#64748b",
    thumbColor = "#dbeafe",
    disabled = false,
    className = "",
}: Switcher_Props) {
    const labelId = useId()
    const stateText = checked ? checkedText : uncheckedText

    const style: SwitcherStyle = {
        "--switcher-checked-color": checkedColor,
        "--switcher-unchecked-color": uncheckedColor,
        "--switcher-thumb-color": thumbColor,
    }

    return (
        <div
            className={`inline-flex w-fit items-center gap-3 ${
                disabled ? "cursor-not-allowed opacity-50" : ""
            } ${className}`}
            style={style}
        >
            {label && (
                <Paragraph
                    id={labelId}
                    className="paragraph_small whitespace-nowrap uppercase text-[var(--text-heading)]"
                >
                    {label}
                    {stateText && <span aria-hidden="true"> {stateText}</span>}
                </Paragraph>
            )}

            {!label && stateText && (
                <span
                    aria-hidden="true"
                    className="paragraph_small whitespace-nowrap uppercase text-[var(--text-heading)]"
                >
                    {stateText}
                </span>
            )}

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={ariaLabel}
                aria-labelledby={label ? labelId : undefined}
                disabled={disabled}
                onClick={() => onCheckedChange(!checked)}
                className={`before:hidden after:hidden relative inline-flex h-5 min-h-0! w-9! shrink-0 items-center rounded-full! border p-0! transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-heading)] disabled:pointer-events-none ${
                    checked
                        ? "border-[var(--switcher-checked-color)] bg-[var(--switcher-checked-color)]!"
                        : "border-[var(--switcher-unchecked-color)] bg-[var(--panel-light)]!"
                }`}
            >
                <span
                    aria-hidden="true"
                    className={`block size-3 rounded-full bg-[var(--switcher-thumb-color)] transition-transform duration-200 ${
                        checked ? "translate-x-2" : "-translate-x-2"
                    }`}
                />
            </button>
        </div>
    )
}
