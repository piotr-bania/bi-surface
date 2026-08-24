export const HOST_MONITORING_STATES = ["monitored", "partial", "offline", "unknown"] as const
export const AGENT_HEALTH_STATES = ["healthy", "degraded", "unavailable", "unknown"] as const

export const VISIBILITY_SOURCE_IDS = [
    "processes",
    "network",
    "services",
    "files",
    "registry",
] as const

export const VISIBILITY_STATES = [
    "full",
    "partial",
    "limited",
    "locked",
    "planned",
    "unavailable",
] as const

export const INVESTIGATION_QUEUE_METRICS = ["critical", "high", "warning", "reviewed"] as const
export const INVESTIGATION_SEVERITIES = ["critical", "high", "warning", "info"] as const
export const INVESTIGATION_QUEUE_STATES = ["loading", "active", "empty", "unavailable"] as const

export type AgentHealthState = (typeof AGENT_HEALTH_STATES)[number]
export type HostMonitoringState = (typeof HOST_MONITORING_STATES)[number]
export type VisibilitySourceId = (typeof VISIBILITY_SOURCE_IDS)[number]
export type VisibilityState = (typeof VISIBILITY_STATES)[number]
export type InvestigationQueueMetric = (typeof INVESTIGATION_QUEUE_METRICS)[number]
export type InvestigationSeverity = (typeof INVESTIGATION_SEVERITIES)[number]
export type InvestigationQueueState = (typeof INVESTIGATION_QUEUE_STATES)[number]

export type HostPostureData = {
    hostname: string | null
    operatingSystem: string | null
    osVersion: string | null
    uptimeSeconds: number | null
    monitoringState: HostMonitoringState
    agentHealth: AgentHealthState
    cpuPercent: number | null
    memoryPercent: number | null
    processCount: number | null
}

export type VisibilityCoverageItem = {
    id: VisibilitySourceId
    state: VisibilityState
    visibilityPercent: number | null
    requiresElevation: boolean
}

export type VisibilityCoverageData = {
    overallVisibilityPercent: number
    overallState: VisibilityState
    activeCollectors: number
    totalCollectors: number
    items: VisibilityCoverageItem[]
}

export type InvestigationQueueItem = {
    id: string
    title: string
    severity: InvestigationSeverity
    firstSeen: number
}

export type InvestigationQueueData = {
    state: InvestigationQueueState

    counts: Record<InvestigationQueueMetric, number | null>

    items: InvestigationQueueItem[]
}

export type DashboardDictionary = {
    page: {
        title: string
        description: string
        localDataOnly: string
    }

    hostPosture: {
        frameNumber: string
        title: string

        labels: {
            hostname: string
            operatingSystem: string
            uptime: string
            agentStatus: string
            cpu: string
            memory: string
            processes: string
        }

        monitoringStates: Record<HostMonitoringState, string>
        agentHealthStates: Record<AgentHealthState, string>

        unavailable: string
    }

    visibilityCoverage: {
        frameNumber: string
        title: string

        summary: {
            overall: string
            visible: string
        }

        sources: Record<VisibilitySourceId, string>
        states: Record<VisibilityState, string>

        requiresElevation: string
        unavailable: string
    }

    investigationQueue: {
        frameNumber: string
        title: string

        metrics: Record<InvestigationQueueMetric, string>

        table: {
            priorityItem: string
            firstSeen: string
            age: string
        }

        states: {
            loading: string
            empty: string
            unavailable: string
        }

        viewAll: string
    }
}
