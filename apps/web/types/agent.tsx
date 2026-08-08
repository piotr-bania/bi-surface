export type HealthResponse = {
    status: "online"
    service: string
    version: string
}

export type SystemResponse = {
    hostname: string

    operating_system: {
        name: string
        release: string
        version: string
        architecture: string
    }

    cpu: {
        name: string
        physical_cores: number
        logical_cores: number
        usage_percent: number
    }

    memory: {
        total_bytes: number
        available_bytes: number
        used_bytes: number
        usage_percent: number
    }

    boot_time: number
    uptime_seconds: number
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

    if (
        typeof record.operating_system !== "object" ||
        record.operating_system === null ||
        typeof record.cpu !== "object" ||
        record.cpu === null ||
        typeof record.memory !== "object" ||
        record.memory === null
    ) {
        return false
    }

    const os = record.operating_system as Record<string, unknown>
    const cpu = record.cpu as Record<string, unknown>
    const memory = record.memory as Record<string, unknown>

    return (
        typeof record.hostname === "string" &&
        typeof os.name === "string" &&
        typeof os.release === "string" &&
        typeof os.version === "string" &&
        typeof os.architecture === "string" &&
        typeof cpu.name === "string" &&
        typeof cpu.physical_cores === "number" &&
        typeof cpu.logical_cores === "number" &&
        typeof cpu.usage_percent === "number" &&
        typeof memory.total_bytes === "number" &&
        typeof memory.available_bytes === "number" &&
        typeof memory.used_bytes === "number" &&
        typeof memory.usage_percent === "number" &&
        typeof record.boot_time === "number" &&
        typeof record.uptime_seconds === "number"
    )
}
