import type { DashboardDictionary } from "@/types/routes/dashboard"

export const dashboard: DashboardDictionary = {
    page: {
        title: "Dashboard",
        description: "Live endpoint posture, investigation priorities and evidence correlation",
        localDataOnly: "Local data only",
    },

    hostPosture: {
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

    visibilityCoverage: {
        title: "Visibility Coverage",
        summary: {
            overall: "Collectors",
            visible: "Active",
        },
        sources: {
            processes: "Processes",
            network: "Network",
            services: "Services",
            files: "Files",
            registry: "Registry",
        },
        states: {
            full: "Full",
            partial: "Partial",
            limited: "Limited",
            locked: "Locked",
            planned: "Planned",
            unavailable: "Unavailable",
        },
        requiresElevation: "Requires elevation",
        unavailable: "Unavailable",
    },

    investigationQueue: {
        title: "Investigation Queue",
        metrics: {
            critical: "Critical",
            high: "High",
            warning: "Warning",
            reviewed: "Reviewed",
        },
        table: {
            priorityItem: "Priority item",
            firstSeen: "First seen",
            age: "Age",
        },
        states: {
            loading: "Loading investigation queue",
            empty: "No investigations currently require attention",
            unavailable: "The detection pipeline is not active",
        },
        viewAll: "View all queue items",
    },
}
