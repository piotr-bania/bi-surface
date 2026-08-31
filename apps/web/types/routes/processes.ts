export type ProcessSummaryData = {
    total: number | null
    visible: number | null
    partial: number | null
    accessDenied: number | null
    running: number | null
    sleeping: number | null
    agentPid: number | null
    visibilityPercent: number | null
}

export type ProcessVisibility = "full" | "partial" | "denied"

export type ProcessExplorerRow = {
    pid: number
    ppid: number | null
    name: string | null
    username: string | null
    cpuPercent: number | null
    memoryPercent: number | null
    memoryMb: number | null
    threads: number | null
    status: string | null
    visibility: ProcessVisibility
}

export type ProcessExplorerData = {
    rows: ProcessExplorerRow[]
    total: number
}

export type ProcessesDictionary = {
    page: {
        title: string
        description: string
        snapshotAge: string
    }

    processSummary: {
        title: string
        placeholder: string
        labels: {
            total: string
            visible: string
            partial: string
            accessDenied: string
            running: string
            sleeping: string
            agentPid: string
            visibility: string
            elevateAgent: string
        }
    }

    processExplorer: {
        title: string
        placeholder: string
        searchPlaceholder: string
        filters: {
            allStates: string
            allUsers: string
            allVisibility: string
        }
        controls: {
            cpuDescending: string
            autoRefresh: string
            refreshNow: string
        }
        columns: {
            pid: string
            ppid: string
            name: string
            user: string
            cpu: string
            memoryPercent: string
            memory: string
            threads: string
            state: string
            visibility: string
        }
        pagination: {
            showing: string
            of: string
            processes: string
        }
    }

    selectedProcess: {
        title: string
        placeholder: string
    }

    parentChain: {
        title: string
        placeholder: string
    }

    resourceLeaders: {
        title: string
        placeholder: string
        topCpu: string
        topMemory: string
    }

    historyDetections: {
        title: string
        placeholder: string
        eventStreamPlanned: string
        detectionEnginePlanned: string
        viewHistory: string
    }

    common: {
        unavailable: string
        planned: string
    }
}
