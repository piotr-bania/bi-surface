export type HealthResponse = {
    status: "online"
    service: string
    version: string
}

export type SystemResponse = {
    hostname: string
    operating_system: string
    os_release: string
    os_version: string
    architecture: string
    processor: string
    physical_cores: number
    logical_cores: number
    memory_total_bytes: number
}

export type ConnectionState =
    | "disconnected"
    | "connecting"
    | "connected"
    | "disconnecting"
    | "offline"
    | "timed_out"
    | "error"

export function isHealthResponse(data: unknown): data is HealthResponse {
    if (typeof data !== "object" || data === null) {
        return false
    }

    const record = data as Record<string, unknown>

    return (
        record.status === "online" &&
        typeof record.service === "string" &&
        typeof record.version === "string"
    )
}

export function isSystemResponse(data: unknown): data is SystemResponse {
    if (typeof data !== "object" || data === null) {
        return false
    }

    const record = data as Record<string, unknown>

    return (
        typeof record.hostname === "string" &&
        typeof record.operating_system === "string" &&
        typeof record.os_release === "string" &&
        typeof record.os_version === "string" &&
        typeof record.architecture === "string" &&
        typeof record.processor === "string" &&
        typeof record.physical_cores === "number" &&
        typeof record.logical_cores === "number" &&
        typeof record.memory_total_bytes === "number"
    )
}
