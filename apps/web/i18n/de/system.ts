import type { TranslationDictionary } from "@/i18n/en"

export const system: TranslationDictionary["system"] = {
    connection: {
        label: "Verbindungsstatus",

        states: {
            disconnected: "Getrennt",
            connecting: "Verbindung wird hergestellt",
            connected: "Verbunden",
            disconnecting: "Verbindung wird getrennt",
            offline: "Offline",
            timed_out: "Zeitüberschreitung",
            error: "Fehler",
        },

        actions: {
            connect: "Agent verbinden",
            disconnect: "Trennen",
            disconnecting: "Verbindung wird getrennt...",
            cancel: "Verbindung abbrechen",
            retry: "Erneut verbinden",
        },

        information: {
            service: "Dienst",
            status: "Status",
            version: "Version",
        },

        messages: {
            timedOut: "Der BI Surface Agent hat innerhalb von 5 Sekunden nicht geantwortet.",
            offline: "Der BI Surface Agent konnte nicht erreicht werden.",
            unknownError: "Ein unbekannter Verbindungsfehler ist aufgetreten.",
            invalidHealth: "Der Agent hat eine ungültige Statusantwort zurückgegeben.",
            invalidSystem: "Der Agent hat eine ungültige Systemantwort zurückgegeben.",
            invalidTelemetry: "Der Agent hat eine ungültige Telemetrieantwort zurückgegeben.",
            telemetryRefreshFailed: "Die Live-Telemetrie konnte nicht aktualisiert werden.",
            invalidProcesses: "Agent returned an invalid processes response.",
            processesRefreshFailed: "Process visibility could not be refreshed.",
        },
    },

    overview: {
        hostname: "Hostname",
        operatingSystem: "Betriebssystem",
        osVersion: "Betriebssystemversion",
        architecture: "Architektur",

        processor: "Prozessor",
        physicalCores: "Physische Kerne",
        logicalCores: "Logische Kerne",
        cpuUsage: "CPU-Auslastung",

        totalMemory: "Gesamtspeicher",
        usedMemory: "Belegter Speicher",
        availableMemory: "Verfügbarer Speicher",
        memoryUsage: "Speicherauslastung",

        uptime: "Betriebszeit",
    },

    agentStatus: {
        title: "Agent-Status",

        states: {
            disconnected: "Offline",
            connecting: "Verbindung wird hergestellt",
            connected: "Online",
            disconnecting: "Verbindung wird getrennt",
            offline: "Offline",
            timed_out: "Zeitüberschreitung",
            error: "Fehler",
        },

        health: {
            healthy: "Agent arbeitet fehlerfrei",
            waiting: "Warten auf den Agent",
            unavailable: "Agent nicht verfügbar",
        },

        labels: {
            pid: "Agent-PID",
            telemetry: "Telemetrie",
        },

        telemetry: {
            active: "Aktiv",
            waiting: "Wartet",
            inactive: "Inaktiv",
        },

        unavailable: "Nicht verfügbar",
    },
}
