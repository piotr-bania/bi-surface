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
