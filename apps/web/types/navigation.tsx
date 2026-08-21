import type { IconType } from "react-icons"

export const SIDEBAR_ROUTE_IDS = [
    "dashboard",
    "system",
    "processes",
    "network",
    "events",
    "detections",
    "simulation",
    "settings",
] as const

export type SidebarRouteId = (typeof SIDEBAR_ROUTE_IDS)[number]

export type SidebarRoutePath =
    | "/"
    | "/system"
    | "/processes"
    | "/network"
    | "/events"
    | "/detections"
    | "/simulation"
    | "/settings"

export type SidebarRouteGroup = "telemetry" | "analysis" | "configuration"

export type SidebarItemState = "active" | "inactive" | "disabled"

export type SidebarRouteFlags = {
    visible: boolean
    disabled: boolean
    comingSoon: boolean
    beta: boolean
    requiresAgent: boolean
    requiresElevation: boolean
}

export type SidebarRouteDefinition = {
    id: SidebarRouteId
    path: SidebarRoutePath
    labelKey: SidebarRouteId
    icon: IconType
    group: SidebarRouteGroup
    exact: boolean
    flags: SidebarRouteFlags
}

export type SidebarRouteOverride = {
    visible?: boolean
    disabled?: boolean
    comingSoon?: boolean
    beta?: boolean
    requiresAgent?: boolean
    requiresElevation?: boolean
    disabledReason?: string
}

export type SidebarRouteOverrides = Partial<Record<SidebarRouteId, SidebarRouteOverride>>

export type SidebarNavigationItemProps = {
    route: SidebarRouteDefinition
    label: string
    state: SidebarItemState
    badge?: string
    disabledReason?: string
    collapsed?: boolean
    onNavigate?: () => void
}

export type SidebarNavigationDictionary = {
    label: string
    groups: Record<SidebarRouteGroup, string>
    routes: Record<SidebarRouteId, string>
    states: {
        comingSoon: string
        beta: string
        disabled: string
        requiresElevation: string
    }
}
