import type { SidebarNavigationDictionary } from "@/types/navigation"

export const navigation: SidebarNavigationDictionary = {
    label: "Primary navigation",

    groups: {
        telemetry: "Telemetry",
        analysis: "Analysis",
        configuration: "Configuration",
    },

    routes: {
        dashboard: "Dashboard",
        system: "System",
        processes: "Processes",
        network: "Network",
        events: "Events",
        detections: "Detections",
        simulation: "Simulation Lab",
        settings: "Settings",
    },

    states: {
        comingSoon: "Soon",
        beta: "Beta",
        disabled: "This page is not available yet.",
        requiresElevation: "Some information requires elevated access.",
    },
}
