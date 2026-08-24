import type { DashboardDictionary } from "@/types/routes/dashboard"

export const dashboard: DashboardDictionary = {
    page: {
        title: "Dashboard",
        description: "Live endpoint posture, investigation priorities and evidence correlation",
        localDataOnly: "Local data only",
    },

    hostPosture: {
        frameNumber: "1.",
        title: "Host Posture",

        labels: {
            hostname: "Hostname",
            operatingSystem: "OS",
            uptime: "Uptime",
            agentStatus: "Agent status",
            cpu: "CPU",
            memory: "Memory",
            processes: "Processes",
        },

        monitoringStates: {
            monitored: "Monitored",
            partial: "Partial",
            offline: "Offline",
            unknown: "Unknown",
        },

        agentHealthStates: {
            healthy: "Healthy",
            degraded: "Degraded",
            unavailable: "Unavailable",
            unknown: "Unknown",
        },

        unavailable: "Unavailable",
    },
}
