import type { DashboardDictionary } from "@/types/routes/dashboard"

export const dashboard: DashboardDictionary = {
    page: {
        title: "Übersicht",
        description: "Live-Status des Endpunkts, Untersuchungsprioritäten und Beweiskorrelation",
        localDataOnly: "Nur lokale Daten",
    },

    hostPosture: {
        frameNumber: "1.",
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
}
