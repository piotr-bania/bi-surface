import type {
    ConnectionState,
    HealthResponse,
    ProcessesResponse,
    SystemResponse,
    TelemetryResponse,
} from "@/types/agent"

import type {
    AgentHealthState,
    HostMonitoringState,
    HostPostureData,
} from "@/types/routes/dashboard"

type CreateHostPostureDataInput = {
    connectionState: ConnectionState
    agent: HealthResponse | null
    system: SystemResponse | null
    telemetry: TelemetryResponse | null
    processes: ProcessesResponse | null
}

function resolveMonitoringState(
    connectionState: ConnectionState,
    hasSystem: boolean,
    hasTelemetry: boolean,
    hasProcesses: boolean
): HostMonitoringState {
    if (connectionState === "connecting" || connectionState === "disconnecting") {
        return "unknown"
    }

    if (
        connectionState === "disconnected" ||
        connectionState === "offline" ||
        connectionState === "timed_out" ||
        connectionState === "error"
    ) {
        return "offline"
    }

    if (hasSystem && hasTelemetry && hasProcesses) {
        return "monitored"
    }

    if (hasSystem || hasTelemetry || hasProcesses) {
        return "partial"
    }

    return "unknown"
}

function resolveAgentHealth(
    connectionState: ConnectionState,
    isAgentOnline: boolean
): AgentHealthState {
    if (connectionState === "connecting" || connectionState === "disconnecting") {
        return "unknown"
    }

    if (
        connectionState === "disconnected" ||
        connectionState === "offline" ||
        connectionState === "timed_out" ||
        connectionState === "error"
    ) {
        return "unavailable"
    }

    return isAgentOnline ? "healthy" : "degraded"
}

export function createHostPostureData({
    connectionState,
    agent,
    system,
    telemetry,
    processes,
}: CreateHostPostureDataInput): HostPostureData {
    return {
        hostname: system?.hostname ?? null,
        operatingSystem: system?.operating_system.name ?? null,
        osVersion: system?.operating_system.release ?? null,
        uptimeSeconds: telemetry?.uptime_seconds ?? null,

        monitoringState: resolveMonitoringState(
            connectionState,
            system !== null,
            telemetry !== null,
            processes !== null
        ),

        agentHealth: resolveAgentHealth(connectionState, agent?.status === "online"),

        cpuPercent: telemetry?.cpu_usage_percent ?? null,
        memoryPercent: telemetry?.memory_usage_percent ?? null,
        processCount: processes?.count ?? null,
    }
}
