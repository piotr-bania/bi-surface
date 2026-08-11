"use client"

import {
    isHealthResponse,
    isSystemResponse,
    isTelemetryResponse,
    type HealthResponse,
    type SystemResponse,
    type TelemetryResponse,
} from "@/types/agent"

import { useEffect, useRef, useState } from "react"

import { useAgentConnection } from "@/components/system/Agent_Connection_Context"
import Paragraph from "@/components/ui/text/Paragraph"
import System_Overview from "@/components/system/System_Overview"

const AGENT_HEALTH_URL = "http://127.0.0.1:8000/api/v1/health"
const AGENT_SYSTEM_URL = "http://127.0.0.1:8000/api/v1/system"
const AGENT_TELEMETRY_URL = "http://127.0.0.1:8000/api/v1/telemetry"

const REQUEST_TIMEOUT_MS = 5000
const TELEMETRY_INTERVAL_MS = 1500

export default function Agent_Connection() {
    const { connectionState, setConnectionState, setLastUpdated } = useAgentConnection()

    const [agent, setAgent] = useState<HealthResponse | null>(null)

    const [system, setSystem] = useState<SystemResponse | null>(null)

    const [telemetry, setTelemetry] = useState<TelemetryResponse | null>(null)

    const [message, setMessage] = useState<string | null>(null)

    const activeRequestController = useRef<AbortController | null>(null)

    const telemetryRequestController = useRef<AbortController | null>(null)

    async function connectAgent() {
        const controller = new AbortController()

        activeRequestController.current = controller

        let didTimeOut = false

        const timeOutId = window.setTimeout(() => {
            didTimeOut = true
            controller.abort()
        }, REQUEST_TIMEOUT_MS)

        setConnectionState("connecting")
        setAgent(null)
        setSystem(null)
        setTelemetry(null)
        setLastUpdated(null)
        setMessage(null)

        try {
            const healthResponse = await fetch(AGENT_HEALTH_URL, {
                method: "GET",
                signal: controller.signal,
            })

            if (!healthResponse.ok) {
                throw new Error(`Agent responded with HTTP ${healthResponse.status}`)
            }

            const healthData: unknown = await healthResponse.json()

            if (!isHealthResponse(healthData)) {
                throw new Error("Agent returned an invalid health response.")
            }

            const systemResponse = await fetch(AGENT_SYSTEM_URL, {
                method: "GET",
                signal: controller.signal,
            })

            if (!systemResponse.ok) {
                throw new Error(`System endpoint responded with HTTP ${systemResponse.status}`)
            }

            const systemData: unknown = await systemResponse.json()

            if (!isSystemResponse(systemData)) {
                throw new Error("Agent returned an invalid system response.")
            }

            setAgent(healthData)
            setSystem(systemData)
            setConnectionState("connected")
        } catch (error: unknown) {
            setAgent(null)
            setSystem(null)
            setTelemetry(null)

            if (didTimeOut) {
                setConnectionState("timed_out")

                setMessage("The BI Surface agent did not respond within 5 seconds.")

                return
            }

            if (error instanceof DOMException && error.name === "AbortError") {
                return
            }

            if (error instanceof TypeError) {
                setConnectionState("offline")

                setMessage("The BI Surface agent could not be reached.")

                return
            }

            setConnectionState("error")

            setMessage(
                error instanceof Error ? error.message : "An unknown connection error occurred."
            )
        } finally {
            window.clearTimeout(timeOutId)

            if (activeRequestController.current === controller) {
                activeRequestController.current = null
            }
        }
    }

    useEffect(() => {
        if (connectionState !== "connected") {
            return
        }

        let cancelled = false
        let timeoutId: number | undefined

        async function refreshTelemetry() {
            const controller = new AbortController()

            telemetryRequestController.current = controller

            try {
                const response = await fetch(AGENT_TELEMETRY_URL, {
                    method: "GET",
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error(`Telemetry endpoint responded with HTTP ${response.status}`)
                }

                const data: unknown = await response.json()

                if (!isTelemetryResponse(data)) {
                    throw new Error("Agent returned an invalid telemetry response.")
                }

                if (!cancelled) {
                    setTelemetry(data)
                    setLastUpdated(Date.now())
                    setMessage(null)
                }
            } catch (error: unknown) {
                if (cancelled || (error instanceof DOMException && error.name === "AbortError")) {
                    return
                }

                if (!cancelled) {
                    setMessage(
                        error instanceof Error
                            ? error.message
                            : "Live telemetry could not be refreshed."
                    )
                }
            } finally {
                if (telemetryRequestController.current === controller) {
                    telemetryRequestController.current = null
                }

                if (!cancelled) {
                    timeoutId = window.setTimeout(refreshTelemetry, TELEMETRY_INTERVAL_MS)
                }
            }
        }

        refreshTelemetry()

        return () => {
            cancelled = true

            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId)
            }

            telemetryRequestController.current?.abort()
            telemetryRequestController.current = null
        }
    }, [connectionState, setLastUpdated])

    function disconnectAgent() {
        setConnectionState("disconnecting")

        activeRequestController.current?.abort()
        activeRequestController.current = null

        telemetryRequestController.current?.abort()
        telemetryRequestController.current = null
        setLastUpdated(null)

        window.setTimeout(() => {
            setAgent(null)
            setSystem(null)
            setTelemetry(null)
            setMessage(null)

            setConnectionState("disconnected")
        }, 500)
    }

    const canRetry =
        connectionState === "offline" ||
        connectionState === "timed_out" ||
        connectionState === "error"

    const canDisconnect =
        connectionState === "connecting" ||
        connectionState === "connected" ||
        connectionState === "disconnecting"

    return (
        <div className="col-span-12 flex flex-col gap-3">
            <Paragraph>Connection state: {connectionState}</Paragraph>

            {agent && (
                <div>
                    <Paragraph>Service: {agent.service}</Paragraph>

                    <Paragraph>Status: {agent.status}</Paragraph>

                    <Paragraph>Version: {agent.version}</Paragraph>
                </div>
            )}

            {system && <System_Overview system={system} telemetry={telemetry} />}

            {message && <Paragraph>{message}</Paragraph>}

            {canDisconnect ? (
                <button
                    type="button"
                    className={
                        connectionState === "connecting" ? "neutral cancel" : "danger disconnect"
                    }
                    onClick={disconnectAgent}
                    disabled={connectionState === "disconnecting"}
                >
                    {connectionState === "connecting"
                        ? "Cancel connection"
                        : connectionState === "disconnecting"
                          ? "Disconnecting..."
                          : "Disconnect"}
                </button>
            ) : (
                <button
                    type="button"
                    className={canRetry ? "warning retry" : "primary"}
                    onClick={connectAgent}
                >
                    {canRetry ? "Retry connection" : "Connect agent"}
                </button>
            )}
        </div>
    )
}
