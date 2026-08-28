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
            className={`relative inline-flex w-fit items-center border border-[var(--border-neutral)] bg-[var(--panel-light)] rounded-sm ${className}`}
        >
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-label={ariaLabel}
                className="paragraph_tiny appearance-none bg-transparent py-2 pl-3 pr-8 outline-none cursor-pointer"
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
