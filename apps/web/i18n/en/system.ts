export const system = {
    connection: {
        label: "Connection state",

        states: {
            disconnected: "Disconnected",
            connecting: "Connecting",
            connected: "Connected",
            disconnecting: "Disconnecting",
            offline: "Offline",
            timed_out: "Timed out",
            error: "Error",
        },

        actions: {
            connect: "Connect agent",
            disconnect: "Disconnect",
            disconnecting: "Disconnecting...",
            cancel: "Cancel connection",
            retry: "Retry connection",
        },

        information: {
            service: "Service",
            status: "Status",
            version: "Version",
        },

        messages: {
            timedOut: "The BI Surface agent did not respond within 5 seconds.",
            offline: "The BI Surface agent could not be reached.",
            unknownError: "An unknown connection error occurred.",
            invalidHealth: "Agent returned an invalid health response.",
            invalidSystem: "Agent returned an invalid system response.",
            invalidTelemetry: "Agent returned an invalid telemetry response.",
            telemetryRefreshFailed: "Live telemetry could not be refreshed.",
            invalidProcesses: "Der Agent hat eine ungültige Prozessantwort zurückgegeben.",
            processesRefreshFailed: "Die Prozesssichtbarkeit konnte nicht aktualisiert werden.",
        },
    },

    overview: {
        hostname: "Hostname",
        operatingSystem: "Operating system",
        osVersion: "OS version",
        architecture: "Architecture",

        processor: "Processor",
        physicalCores: "Physical cores",
        logicalCores: "Logical cores",
        cpuUsage: "CPU usage",

        totalMemory: "Total memory",
        usedMemory: "Used memory",
        availableMemory: "Available memory",
        memoryUsage: "Memory usage",

        uptime: "Uptime",
    },
}
