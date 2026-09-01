import type { ProcessesDictionary } from "@/types/routes/processes"

export const processes: ProcessesDictionary = {
    page: {
        title: "Prozesse",
        description: "Live-Prozesssichtbarkeit, Eigentümerschaft und Eltern-Kind-Kontext",
        snapshotAge: "Snapshot-Alter",
    },

    processSummary: {
        title: "Prozessübersicht",
        placeholder: "Die Prozessübersicht wird hier angezeigt.",
        labels: {
            total: "Gesamt",
            visible: "Sichtbar",
            partial: "Teilweise",
            accessDenied: "Zugriff verweigert",
            running: "Laufend",
            sleeping: "Schlafend",
            agentPid: "Agent-PID",
            visibility: "Standard-Sichtbarkeit",
            elevateAgent: "Agent erhöhen",
        },
    },

    processExplorer: {
        title: "Prozess-Explorer",
        placeholder: "Die Live-Prozesstabelle wird hier angezeigt.",
        searchPlaceholder: "Name, PID oder Benutzer suchen...",
        searchAriaLabel: "Prozesse durchsuchen",
        filters: {
            allStates: "Alle Zustände",
            allUsers: "Alle Benutzer",
            allVisibility: "Alle Sichtbarkeiten",
        },
        controls: {
            sortAriaLabel: "Prozesse sortieren",
            cpuDescending: "CPU % absteigend",
            cpuAscending: "CPU % aufsteigend",
            autoRefresh: "Auto-Aktualisierung",
            refreshIntervalAriaLabel: "Prozess-Aktualisierungsintervall",
            refreshNow: "Jetzt aktualisieren",
        },
        columns: {
            pid: "PID",
            ppid: "PPID",
            name: "Name",
            user: "Benutzer",
            cpu: "CPU %",
            memoryPercent: "Speicher %",
            memory: "Arbeitsspeicher",
            threads: "Threads",
            state: "Status",
            visibility: "Sichtbarkeit",
        },

        pagination: {
            showing: "Zeige",
            of: "von",
            processes: "Prozessen",
        },
    },

    selectedProcess: {
        title: "Ausgewählter Prozess",
        placeholder: "Wähle einen Prozess aus, um Details zu untersuchen.",
    },

    parentChain: {
        title: "Elternkette",
        placeholder: "Eltern-Kind-Prozessbeziehungen werden hier angezeigt.",
    },

    resourceLeaders: {
        title: "Ressourcenführer",
        placeholder: "Prozesse mit dem höchsten Ressourcenverbrauch werden hier angezeigt.",
        topCpu: "Top CPU",
        topMemory: "Top Speicher",
    },

    historyDetections: {
        title: "Verlauf & Erkennungen",
        placeholder: "Historische Prozessereignisse werden noch nicht gesammelt.",
        eventStreamPlanned: "Ereignisstream — Geplant",
        detectionEnginePlanned: "Erkennungsmodul — Geplant",
        viewHistory: "Verlauf anzeigen",
    },

    common: {
        unavailable: "Nicht verfügbar",
        planned: "Geplant",
    },
}
