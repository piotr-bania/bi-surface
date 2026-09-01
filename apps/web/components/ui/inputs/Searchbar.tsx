"use client"

import type { ChangeEventHandler } from "react"

import { PiMagnifyingGlassDuotone } from "react-icons/pi"

type Searchbar_Props = {
    value: string
    onChange: (value: string) => void
    placeholder: string
    ariaLabel: string
    id?: string
    name?: string
    className?: string
    disabled?: boolean
}

export default function Searchbar({
    value,
    onChange,
    placeholder,
    ariaLabel,
    id,
    name,
    className = "",
    disabled = false,
}: Searchbar_Props) {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange(event.target.value)
    }

    return (
        <div
            className={`relative flex min-w-0 items-center rounded-sm border border-[var(--border-neutral)] bg-[var(--panel-light)] transition-colors focus-within:border-[var(--accent-cyan)] ${className}`}
        >
            <PiMagnifyingGlassDuotone
                aria-hidden="true"
                className="pointer-events-none absolute left-3 size-4 text-[var(--text-muted)]"
            />

            <input
                id={id}
                name={name}
                type="search"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                aria-label={ariaLabel}
                autoComplete="off"
                spellCheck={false}
                disabled={disabled}
                className="paragraph_tiny min-w-0 flex-1 bg-transparent py-2 pl-9 pr-3 text-[var(--text-heading)] outline-none placeholder:text-[var(--text-muted)] disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:appearance-none"
            />
        </div>
    )
}
