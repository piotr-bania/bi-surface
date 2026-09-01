"use client"

import type { ReactNode } from "react"

import { PiCaretDownDuotone } from "react-icons/pi"

type SelectOption = {
    value: string | number
    label: string
}

type Select_Props = {
    value: string | number
    options: SelectOption[]
    onChange: (value: string) => void
    ariaLabel: string
    leadingIcon?: ReactNode
    disabled?: boolean
    className?: string
}

export default function Select({
    value,
    options,
    onChange,
    ariaLabel,
    leadingIcon,
    disabled = false,
    className = "",
}: Select_Props) {
    return (
        <div
            className={`relative inline-flex w-fit items-center rounded-sm border border-[var(--border-neutral)] ${
                disabled ? "cursor-not-allowed opacity-60" : ""
            } ${className}`}
        >
            {leadingIcon && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-2 flex size-4 items-center justify-center text-[var(--text-paragraph)]"
                >
                    {leadingIcon}
                </span>
            )}

            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-label={ariaLabel}
                disabled={disabled}
                className={`paragraph_small appearance-none py-1 pr-7 ${leadingIcon ? "pl-8" : "pl-3"} text-[var(--text-heading)] outline-none ${
                    disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <PiCaretDownDuotone
                aria-hidden="true"
                className="pointer-events-none absolute right-2 size-4"
            />
        </div>
    )
}
