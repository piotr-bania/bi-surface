export type HealthResponse = {
    status: string
    service: string
    version: string
}

export type ConnectionState =
    | "disconnected"
    | "connecting"
    | "connected"
    | "disconnecting"
    | "offline"
    | "timed_out"
    | "error"
