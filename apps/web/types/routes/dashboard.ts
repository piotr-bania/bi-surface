export const HOST_MONITORING_STATES = ["monitored", "partial", "offline", "unknown"] as const
export const AGENT_HEALTH_STATES = ["healthy", "degraded", "unavailable", "unknown"] as const

export type AgentHealthState = (typeof AGENT_HEALTH_STATES)[number]
export type HostMonitoringState = (typeof HOST_MONITORING_STATES)[number]

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
}
