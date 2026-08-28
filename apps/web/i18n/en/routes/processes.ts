import type { ProcessesDictionary } from "@/types/routes/processes"

export const processes: ProcessesDictionary = {
    page: {
        title: "Processes",
        description: "Live process visibility, ownership and parent-child context",
        snapshotAge: "Snapshot age",
    },

    processSummary: {
        title: "Process Summary",
        placeholder: "Process summary telemetry will render here.",
        labels: {
            total: "Total",
            visible: "Visible",
            partial: "Partial",
            accessDenied: "Access Denied",
            running: "Running",
            sleeping: "Sleeping",
            agentPid: "Agent PID",
            visibility: "Standard Visibility",
            elevateAgent: "Elevate Agent",
        },
    },

    processExplorer: {
        title: "Process Explorer",
        placeholder: "Live process table will render here.",
        searchPlaceholder: "Search name, PID or user...",
        filters: {
            allStates: "All States",
            allUsers: "All Users",
            allVisibility: "All Visibility",
        },
        controls: {
            cpuDescending: "CPU % Desc",
            autoRefresh: "Auto Refresh",
            refreshNow: "Refresh Now",
        },
        columns: {
            pid: "PID",
            ppid: "PPID",
            name: "Name",
            user: "User",
            cpu: "CPU %",
            memoryPercent: "Mem %",
            memory: "Memory",
            threads: "Threads",
            state: "State",
            visibility: "Visibility",
        },

        pagination: {
            showing: "Showing",
            of: "of",
            processes: "processes",
        },
    },

    selectedProcess: {
        title: "Selected Process",
        placeholder: "Select a process to inspect its details.",
    },

    parentChain: {
        title: "Parent Chain",
        placeholder: "Parent-child process relationships will render here.",
    },

    resourceLeaders: {
        title: "Resource Leaders",
        placeholder: "Top resource-consuming processes will render here.",
        topCpu: "Top CPU",
        topMemory: "Top Memory",
    },

    historyDetections: {
        title: "History & Detections",
        placeholder: "Historical process events are not collected yet.",
        eventStreamPlanned: "Event Stream — Planned",
        detectionEnginePlanned: "Detection Engine — Planned",
        viewHistory: "View History",
    },

    common: {
        unavailable: "Unavailable",
        planned: "Planned",
    },
}
