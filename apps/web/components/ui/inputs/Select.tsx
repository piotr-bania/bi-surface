"use client"

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
    className?: string
}

export default function Select({
    value,
    options,
    onChange,
    ariaLabel,
    className = "",
}: Select_Props) {
    return (
        <div
            className={`relative inline-flex w-fit items-center rounded-sm border border-[var(--border-neutral)] ${className}`}
        >
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-label={ariaLabel}
                className="paragraph_small cursor-pointer appearance-none py-2 pl-3 pr-7 text-[var(--text-heading)] outline-none"
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
