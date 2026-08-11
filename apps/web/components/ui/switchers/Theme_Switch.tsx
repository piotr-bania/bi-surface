"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { PiDesktopTowerDuotone, PiMoonStarsDuotone, PiSunDuotone } from "react-icons/pi"

type ThemePreference = "light" | "system" | "dark"
type ResolvedTheme = "light" | "dark"

const STORAGE_KEY = "bi-surface-theme"

const themeOptions = [
    {
        value: "light",
        label: "Light",
        icon: PiSunDuotone,
    },
    {
        value: "system",
        label: "System",
        icon: PiDesktopTowerDuotone,
    },
    {
        value: "dark",
        label: "Dark",
        icon: PiMoonStarsDuotone,
    },
] satisfies {
    value: ThemePreference
    label: string
    icon: typeof PiSunDuotone
}[]

function subscribeToClient() {
    return () => {}
}

function getSystemTheme(): ResolvedTheme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getStoredTheme(): ThemePreference {
    const storedTheme = localStorage.getItem(STORAGE_KEY)

    if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
        return storedTheme
    }

    return "system"
}

function resolveTheme(theme: ThemePreference): ResolvedTheme {
    return theme === "system" ? getSystemTheme() : theme
}

function applyTheme(theme: ThemePreference) {
    const resolvedTheme = resolveTheme(theme)

    document.documentElement.dataset.theme = resolvedTheme
    document.documentElement.dataset.themePreference = theme
}

export default function Theme_Switch() {
    const mounted = useSyncExternalStore(
        subscribeToClient,
        () => true,
        () => false
    )

    const [theme, setTheme] = useState<ThemePreference>(() => {
        if (typeof window === "undefined") {
            return "system"
        }

        return getStoredTheme()
    })

    useEffect(() => {
        if (!mounted) {
            return
        }

        applyTheme(theme)
    }, [mounted, theme])

    useEffect(() => {
        if (!mounted || theme !== "system") {
            return
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const handleSystemThemeChange = () => {
            applyTheme("system")
        }

        mediaQuery.addEventListener("change", handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange)
        }
    }, [mounted, theme])

    function handleThemeChange(nextTheme: ThemePreference) {
        setTheme(nextTheme)
        localStorage.setItem(STORAGE_KEY, nextTheme)
        applyTheme(nextTheme)
    }

    if (!mounted) {
        return null
    }

    return (
        <div role="radiogroup" aria-label="Theme" className="inline-flex w-fit gap-1">
            {themeOptions.map(({ value, label, icon: Icon }) => {
                const selected = theme === value

                return (
                    <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={`${label} theme`}
                        onClick={() => handleThemeChange(value)}
                        className={`before:hidden after:hidden size-9 rounded-sm ${
                            selected
                                ? "connected_color bg-[var(--panel-light)]!"
                                : "bg-[var(--panel-dark)]!"
                        }`}
                    >
                        <Icon aria-hidden="true" />
                    </button>
                )
            })}
        </div>
    )
}
