import type { DashboardDictionary } from "@/types/routes/dashboard"

export const dashboard: DashboardDictionary = {
    page: {
        title: "Übersicht",
        description: "Live-Status des Endpunkts, Untersuchungsprioritäten und Beweiskorrelation",
        localDataOnly: "Nur lokale Daten",
    },

    hostPosture: {
        title: "Host-Status",
        labels: {
            hostname: "Hostname",
            operatingSystem: "Betriebssystem",
            uptime: "Betriebszeit",
            agentStatus: "Agent-Status",
            cpu: "CPU",
            memory: "Arbeitsspeicher",
            processes: "Prozesse",
        },
        monitoringStates: {
            monitored: "Überwacht",
            partial: "Teilweise",
            offline: "Offline",
            unknown: "Unbekannt",
        },
        agentHealthStates: {
            healthy: "Fehlerfrei",
            degraded: "Beeinträchtigt",
            unavailable: "Nicht verfügbar",
            unknown: "Unbekannt",
        },
        unavailable: "Nicht verfügbar",
    },

    visibilityCoverage: {
        title: "Sichtbarkeitsabdeckung",
        summary: {
            overall: "Kollektoren",
            visible: "Aktiv",
        },
        sources: {
            processes: "Prozesse",
            network: "Netzwerk",
            services: "Dienste",
            files: "Dateien",
            registry: "Registrierung",
        },
        states: {
            full: "Vollständig",
            partial: "Teilweise",
            limited: "Begrenzt",
            locked: "Gesperrt",
            planned: "Geplant",
            unavailable: "Nicht verfügbar",
        },
        requiresElevation: "Erhöhte Rechte erforderlich",
        unavailable: "Nicht verfügbar",
    },

    investigationQueue: {
        title: "Untersuchungs-Queue",
        metrics: {
            critical: "Kritisch",
            high: "Hoch",
            warning: "Warnung",
            reviewed: "Geprüft",
        },
        table: {
            priorityItem: "Prioritätseintrag",
            firstSeen: "Erstmals erkannt",
            age: "Alter",
        },
        states: {
            loading: "Untersuchungs-Queue wird geladen",
            empty: "Derzeit sind keine Untersuchungen erforderlich",
            unavailable: "Die Erkennungspipeline ist nicht aktiv",
        },
        viewAll: "Alle Queue-Einträge anzeigen",
    },
}
