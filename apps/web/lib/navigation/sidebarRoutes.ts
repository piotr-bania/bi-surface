import {
    PiFlaskDuotone,
    PiGearDuotone,
    PiListBulletsDuotone,
    PiMonitorDuotone,
    PiNetworkDuotone,
    PiShieldWarningDuotone,
    PiSquaresFourDuotone,
    PiTerminalWindowDuotone,
} from "react-icons/pi"

import type { SidebarRouteDefinition, SidebarRouteFlags } from "@/types/navigation"

function available(overrides: Partial<SidebarRouteFlags> = {}): SidebarRouteFlags {
    return {
        visible: true,
        disabled: false,
        comingSoon: false,
        beta: false,
        requiresAgent: false,
        requiresElevation: false,
        ...overrides,
    }
}

function planned(overrides: Partial<SidebarRouteFlags> = {}): SidebarRouteFlags {
    return available({
        disabled: true,
        comingSoon: true,
        ...overrides,
    })
}

export const sidebarRoutes = [
    {
        id: "dashboard",
        path: "/",
        labelKey: "dashboard",
        icon: PiSquaresFourDuotone,
        group: "telemetry",
        exact: true,
        flags: available({
            requiresAgent: true,
        }),
    },

    {
        id: "system",
        path: "/system",
        labelKey: "system",
        icon: PiMonitorDuotone,
        group: "telemetry",
        exact: false,
        flags: planned({
            requiresAgent: true,
            requiresElevation: true,
        }),
    },

    {
        id: "processes",
        path: "/processes",
        labelKey: "processes",
        icon: PiTerminalWindowDuotone,
        group: "telemetry",
        exact: false,
        flags: available({
            requiresAgent: true,
            // requiresElevation: true,
        }),
    },

    {
        id: "network",
        path: "/network",
        labelKey: "network",
        icon: PiNetworkDuotone,
        group: "telemetry",
        exact: false,
        flags: planned({
            requiresAgent: true,
            requiresElevation: true,
        }),
    },

    {
        id: "events",
        path: "/events",
        labelKey: "events",
        icon: PiListBulletsDuotone,
        group: "analysis",
        exact: false,
        flags: planned({
            requiresAgent: true,
            requiresElevation: true,
        }),
    },

    {
        id: "detections",
        path: "/detections",
        labelKey: "detections",
        icon: PiShieldWarningDuotone,
        group: "analysis",
        exact: false,
        flags: planned({
            requiresAgent: true,
            requiresElevation: true,
        }),
    },

    {
        id: "simulation",
        path: "/simulation",
        labelKey: "simulation",
        icon: PiFlaskDuotone,
        group: "analysis",
        exact: false,
        flags: planned({
            requiresAgent: true,
            requiresElevation: true,
        }),
    },

    {
        id: "settings",
        path: "/settings",
        labelKey: "settings",
        icon: PiGearDuotone,
        group: "configuration",
        exact: false,
        flags: planned({
            requiresElevation: true,
        }),
    },
] as const satisfies readonly SidebarRouteDefinition[]
