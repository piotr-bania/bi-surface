"use client"

import type {
    SidebarItemState,
    SidebarRouteDefinition,
    SidebarRouteGroup,
    SidebarRouteOverride,
    SidebarRouteOverrides,
} from "@/types/navigation"

import { usePathname } from "next/navigation"
import { useLanguage } from "@/i18n/Language_Context"
import { sidebarRoutes } from "@/lib/navigation/sidebarRoutes"
import { isSidebarRouteActive } from "@/lib/navigation/isSidebarRouteActive"

import Sidebar_Navigation_Item from "./Sidebar_Navigation_Item"

const groupOrder: readonly SidebarRouteGroup[] = ["telemetry", "analysis", "configuration"]

type Sidebar_Navigation_Props = {
    routeOverrides?: SidebarRouteOverrides
    collapsed?: boolean
    onNavigate?: () => void
}

function resolveRoute(
    route: SidebarRouteDefinition,
    override?: SidebarRouteOverride
): SidebarRouteDefinition {
    if (!override) {
        return route
    }
    return {
        ...route,
        flags: {
            visible: override.visible ?? route.flags.visible,
            disabled: override.disabled ?? route.flags.disabled,
            comingSoon: override.comingSoon ?? route.flags.comingSoon,
            beta: override.beta ?? route.flags.beta,
            requiresAgent: override.requiresAgent ?? route.flags.requiresAgent,
            requiresElevation: override.requiresElevation ?? route.flags.requiresElevation,
        },
    }
}

export default function Sidebar_Navigation({
    routeOverrides = {},
    collapsed = false,
    onNavigate,
}: Sidebar_Navigation_Props) {
    const pathname = usePathname()
    const { dictionary } = useLanguage()
    const resolvedRoutes = sidebarRoutes.map((route) =>
        resolveRoute(route, routeOverrides[route.id])
    )

    return (
        <nav aria-label={dictionary.navigation.label} className="min-h-0 flex-1 overflow-y-auto">
            {groupOrder.map((group) => {
                const groupRoutes = resolvedRoutes.filter(
                    (route) => route.group === group && route.flags.visible
                )

                if (groupRoutes.length === 0) {
                    return null
                }

                const groupLabel = dictionary.navigation.groups[group]

                return (
                    <div
                        key={group}
                        aria-labelledby={`sidebar-group-${group}`}
                        className="mb-4 last:mb-0"
                    >
                        {!collapsed && (
                            <p
                                id={`sidebar-group-${group}`}
                                className={[
                                    "paragraph_tiny",
                                    "muted_color",
                                    "mb-1",
                                    "px-3",
                                    "uppercase",
                                    "tracking-[0.12em]",
                                ].join(" ")}
                            >
                                {groupLabel}
                            </p>
                        )}

                        <ul className="flex flex-col gap-1">
                            {groupRoutes.map((route) => {
                                const override = routeOverrides[route.id]
                                const state: SidebarItemState = route.flags.disabled
                                    ? "disabled"
                                    : isSidebarRouteActive(pathname, route)
                                      ? "active"
                                      : "inactive"
                                const badge = route.flags.comingSoon
                                    ? dictionary.navigation.states.comingSoon
                                    : route.flags.beta
                                      ? dictionary.navigation.states.beta
                                      : undefined
                                const disabledReason =
                                    override?.disabledReason ??
                                    dictionary.navigation.states.disabled

                                return (
                                    <li key={route.id}>
                                        <Sidebar_Navigation_Item
                                            route={route}
                                            label={dictionary.navigation.routes[route.labelKey]}
                                            state={state}
                                            badge={badge}
                                            disabledReason={disabledReason}
                                            elevationLabel={
                                                dictionary.navigation.states.requiresElevation
                                            }
                                            collapsed={collapsed}
                                            onNavigate={onNavigate}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </nav>
    )
}
