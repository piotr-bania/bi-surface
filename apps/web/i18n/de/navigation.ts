import type { SidebarNavigationDictionary } from "@/types/navigation"

export const navigation: SidebarNavigationDictionary = {
    label: "Hauptnavigation",

    groups: {
        telemetry: "Telemetrie",
        analysis: "Analyse",
        configuration: "Konfiguration",
    },

    routes: {
        dashboard: "Übersicht",
        system: "System",
        processes: "Prozesse",
        network: "Netzwerk",
        events: "Ereignisse",
        detections: "Erkennungen",
        simulation: "Simulationslabor",
        settings: "Einstellungen",
    },

    states: {
        comingSoon: "Bald",
        beta: "Beta",
        disabled: "Diese Seite ist noch nicht verfügbar.",
        requiresElevation: "Einige Informationen erfordern erhöhte Berechtigungen.",
    },
}
