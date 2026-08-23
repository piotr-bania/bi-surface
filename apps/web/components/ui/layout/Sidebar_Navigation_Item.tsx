import type { SidebarNavigationItemProps } from "@/types/navigation"

import { PiLockKeyDuotone } from "react-icons/pi"

import Link from "next/link"

const baseClasses = [
    "group",
    "relative",
    "flex",
    "min-h-12",
    "w-full",
    "items-center",
    "gap-3",
    "overflow-hidden",
    "border",
    "py-2",
    "text-left",
    "transition-[color,background-color,border-color,opacity,box-shadow]",
    "duration-150",
    "focus-visible:outline-none",
    "focus-visible:ring-1",
    "focus-visible:ring-[#21d4ff]",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--panel-dark)]",
].join(" ")

const stateClasses = {
    active: [
        "primary_color",
        "primary_border_color",
        "panel_light_color",
        "shadow-[inset_0_0_16px_rgba(33,212,255,0.05),0_0_10px_rgba(33,212,255,0.08)]",
    ].join(" "),

    inactive: [
        "paragraph_color",
        "border-transparent",
        "bg-transparent",
        "hover:border-[var(--border-neutral)]",
        "hover:bg-[var(--panel-light)]",
        "hover:text-[var(--text-heading)]",
    ].join(" "),

    disabled: [
        "disabled_color",
        "cursor-not-allowed",
        "border-transparent",
        "bg-transparent",
        "opacity-55",
    ].join(" "),
} as const

export default function Sidebar_Navigation_Item({
    route,
    label,
    state,
    badge,
    disabledReason,
    elevationLabel,
    collapsed = false,
    onNavigate,
}: SidebarNavigationItemProps) {
    const Icon = route.icon
    const layoutClasses = collapsed ? "justify-center px-0" : "justify-start px-3"
    const className = [baseClasses, layoutClasses, stateClasses[state]].join(" ")
    const content = (
        <>
            {state === "active" && (
                <span
                    aria-hidden="true"
                    className={[
                        "absolute",
                        "inset-y-2",
                        "left-0",
                        "w-px",
                        "bg-[#21d4ff]",
                        "shadow-[0_0_8px_rgba(33,212,255,0.9)]",
                    ].join(" ")}
                />
            )}

            <Icon aria-hidden="true" className="size-5 shrink-0" />

            {!collapsed && (
                <>
                    <span
                        className={[
                            "button_font",
                            "min-w-0",
                            "flex-1",
                            "truncate",
                            "normal-case",
                            "tracking-normal",
                        ].join(" ")}
                    >
                        {label}
                    </span>

                    {route.flags.requiresElevation && (
                        <PiLockKeyDuotone
                            aria-label={elevationLabel}
                            className="size-3.5 shrink-0 opacity-55"
                            title={elevationLabel}
                        />
                    )}

                    {badge && (
                        <span
                            className={[
                                "paragraph_tiny",
                                "muted_color",
                                "shrink-0",
                                "border",
                                "border-[var(--border-neutral)]",
                                "px-1.5",
                                "py-0.5",
                                "uppercase",
                            ].join(" ")}
                        >
                            {badge}
                        </span>
                    )}
                </>
            )}
        </>
    )

    if (state === "disabled") {
        return (
            <span aria-disabled="true" className={className} title={disabledReason}>
                {content}
            </span>
        )
    }

    return (
        <Link
            href={route.path}
            aria-current={state === "active" ? "page" : undefined}
            className={className}
            title={collapsed ? label : undefined}
            onClick={onNavigate}
        >
            {content}
        </Link>
    )
}
