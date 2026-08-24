"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react"

import {
    isHealthResponse,
    isProcessesResponse,
    isSystemResponse,
    isTelemetryResponse,
    type ConnectionState,
    type HealthResponse,
    type ProcessesResponse,
    type SystemResponse,
    type TelemetryResponse,
} from "@/types/agent"

import { useLanguage } from "@/i18n/Language_Context"

const AGENT_HEALTH_URL = "http://127.0.0.1:8000/api/v1/health"
const AGENT_SYSTEM_URL = "http://127.0.0.1:8000/api/v1/system"
const AGENT_TELEMETRY_URL = "http://127.0.0.1:8000/api/v1/telemetry"
const AGENT_PROCESSES_URL = "http://127.0.0.1:8000/api/v1/processes"

const CONNECTION_TIMEOUT_MS = 5_000
const TELEMETRY_INTERVAL_MS = 1_500
const PROCESSES_INTERVAL_MS = 5_000
const DISCONNECT_TRANSITION_MS = 500

type Agent_Connection_Context_Value = {
    connectionState: ConnectionState
    agent: HealthResponse | null
    system: SystemResponse | null
    telemetry: TelemetryResponse | null
    processes: ProcessesResponse | null
    lastUpdated: number | null
    message: string | null
    connectAgent: () => Promise<void>
    disconnectAgent: () => void
}

type Agent_Connection_Provider_Props = {
    children: ReactNode
}

const Agent_Connection_Context = createContext<Agent_Connection_Context_Value | null>(null)

async function requestJson(url: string, signal: AbortSignal): Promise<unknown> {
    const response = await fetch(url, {
        method: "GET",
        signal,
    })

    if (!response.ok) {
        throw new Error(`${url} responded with HTTP ${response.status}`)
    }

    return response.json()
}

export function Agent_Connection_Provider({ children }: Agent_Connection_Provider_Props) {
    const { dictionary } = useLanguage()

    const messages = dictionary.system.connection.messages

    const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected")
    const [agent, setAgent] = useState<HealthResponse | null>(null)
    const [system, setSystem] = useState<SystemResponse | null>(null)
    const [telemetry, setTelemetry] = useState<TelemetryResponse | null>(null)
    const [processes, setProcesses] = useState<ProcessesResponse | null>(null)
    const [lastUpdated, setLastUpdated] = useState<number | null>(null)
    const [connectionMessage, setConnectionMessage] = useState<string | null>(null)
    const [telemetryMessage, setTelemetryMessage] = useState<string | null>(null)
    const [processesMessage, setProcessesMessage] = useState<string | null>(null)

    const connectionRequestController = useRef<AbortController | null>(null)
    const telemetryRequestController = useRef<AbortController | null>(null)
    const processesRequestController = useRef<AbortController | null>(null)
    const disconnectTimeout = useRef<number | null>(null)

    const clearAgentData = useCallback(() => {
        setAgent(null)
        setSystem(null)
        setTelemetry(null)
        setProcesses(null)
        setLastUpdated(null)

        setConnectionMessage(null)
        setTelemetryMessage(null)
        setProcessesMessage(null)
    }, [])

    const connectAgent = useCallback(async () => {
        connectionRequestController.current?.abort()

        if (disconnectTimeout.current !== null) {
            window.clearTimeout(disconnectTimeout.current)
            disconnectTimeout.current = null
        }

        const controller = new AbortController()

        connectionRequestController.current = controller

        let didTimeOut = false

        const timeoutId = window.setTimeout(() => {
            didTimeOut = true
            controller.abort()
        }, CONNECTION_TIMEOUT_MS)

        setConnectionState("connecting")
        clearAgentData()

        try {
            const healthData = await requestJson(AGENT_HEALTH_URL, controller.signal)

            if (!isHealthResponse(healthData)) {
                throw new Error(messages.invalidHealth)
            }

            const systemData = await requestJson(AGENT_SYSTEM_URL, controller.signal)

            if (!isSystemResponse(systemData)) {
                throw new Error(messages.invalidSystem)
            }

            setAgent(healthData)
            setSystem(systemData)
            setConnectionMessage(null)
            setConnectionState("connected")
        } catch (error: unknown) {
            setAgent(null)
            setSystem(null)
            setTelemetry(null)
            setProcesses(null)
            setLastUpdated(null)

            if (didTimeOut) {
                setConnectionState("timed_out")
                setConnectionMessage(messages.timedOut)
                return
            }

            if (error instanceof DOMException && error.name === "AbortError") {
                return
            }

            if (error instanceof TypeError) {
                setConnectionState("offline")
                setConnectionMessage(messages.offline)
                return
            }

            setConnectionState("error")

            setConnectionMessage(error instanceof Error ? error.message : messages.unknownError)
        } finally {
            window.clearTimeout(timeoutId)

            if (connectionRequestController.current === controller) {
                connectionRequestController.current = null
            }
        }
    }, [
        clearAgentData,
        messages.invalidHealth,
        messages.invalidSystem,
        messages.offline,
        messages.timedOut,
        messages.unknownError,
    ])

    useEffect(() => {
        if (connectionState !== "connected") {
            return
        }

        let cancelled = false
        let refreshTimeoutId: number | undefined

        async function refreshTelemetry() {
            const controller = new AbortController()

            telemetryRequestController.current = controller

            try {
                const data = await requestJson(AGENT_TELEMETRY_URL, controller.signal)

                if (!isTelemetryResponse(data)) {
                    throw new Error(messages.invalidTelemetry)
                }

                if (!cancelled) {
                    setTelemetry(data)
                    setLastUpdated(Date.now())
                    setTelemetryMessage(null)
                }
            } catch (error: unknown) {
                if (cancelled || (error instanceof DOMException && error.name === "AbortError")) {
                    return
                }

                setTelemetryMessage(
                    error instanceof Error ? error.message : messages.telemetryRefreshFailed
                )
            } finally {
                if (telemetryRequestController.current === controller) {
                    telemetryRequestController.current = null
                }

                if (!cancelled) {
                    refreshTimeoutId = window.setTimeout(refreshTelemetry, TELEMETRY_INTERVAL_MS)
                }
            }
        }

        refreshTelemetry()

        return () => {
            cancelled = true

            if (refreshTimeoutId !== undefined) {
                window.clearTimeout(refreshTimeoutId)
            }

            telemetryRequestController.current?.abort()
            telemetryRequestController.current = null
        }
    }, [connectionState, messages.invalidTelemetry, messages.telemetryRefreshFailed])

    useEffect(() => {
        if (connectionState !== "connected") {
            return
        }

        let cancelled = false
        let refreshTimeoutId: number | undefined

        async function refreshProcesses() {
            const controller = new AbortController()

            processesRequestController.current = controller

            try {
                const data = await requestJson(AGENT_PROCESSES_URL, controller.signal)

                if (!isProcessesResponse(data)) {
                    throw new Error(messages.invalidProcesses)
                }

                if (!cancelled) {
                    setProcesses(data)
                    setProcessesMessage(null)
                }
            } catch (error: unknown) {
                if (cancelled || (error instanceof DOMException && error.name === "AbortError")) {
                    return
                }

                setProcessesMessage(
                    error instanceof Error ? error.message : messages.processesRefreshFailed
                )
            } finally {
                if (processesRequestController.current === controller) {
                    processesRequestController.current = null
                }

                if (!cancelled) {
                    refreshTimeoutId = window.setTimeout(refreshProcesses, PROCESSES_INTERVAL_MS)
                }
            }
        }

        refreshProcesses()

        return () => {
            cancelled = true

            if (refreshTimeoutId !== undefined) {
                window.clearTimeout(refreshTimeoutId)
            }

            processesRequestController.current?.abort()
            processesRequestController.current = null
        }
    }, [connectionState, messages.invalidProcesses, messages.processesRefreshFailed])

    const disconnectAgent = useCallback(() => {
        setConnectionState("disconnecting")
        connectionRequestController.current?.abort()
        connectionRequestController.current = null
        telemetryRequestController.current?.abort()
        telemetryRequestController.current = null
        processesRequestController.current?.abort()
        processesRequestController.current = null
        setLastUpdated(null)

        disconnectTimeout.current = window.setTimeout(() => {
            clearAgentData()
            setConnectionState("disconnected")
            disconnectTimeout.current = null
        }, DISCONNECT_TRANSITION_MS)
    }, [clearAgentData])

    useEffect(() => {
        return () => {
            connectionRequestController.current?.abort()
            telemetryRequestController.current?.abort()
            processesRequestController.current?.abort()

            if (disconnectTimeout.current !== null) {
                window.clearTimeout(disconnectTimeout.current)
            }
        }
    }, [])

    const message = connectionMessage ?? telemetryMessage ?? processesMessage

    const value = useMemo<Agent_Connection_Context_Value>(
        () => ({
            connectionState,
            agent,
            system,
            telemetry,
            processes,
            lastUpdated,
            message,
            connectAgent,
            disconnectAgent,
        }),
        [
            connectionState,
            agent,
            system,
            telemetry,
            processes,
            lastUpdated,
            message,
            connectAgent,
            disconnectAgent,
        ]
    )

    return (
        <Agent_Connection_Context.Provider value={value}>
            {children}
        </Agent_Connection_Context.Provider>
    )
}

export function useAgentConnection() {
    const context = useContext(Agent_Connection_Context)

    if (!context) {
        throw new Error("useAgentConnection must be used within Agent_Connection_Provider.")
    }

    return context
}
