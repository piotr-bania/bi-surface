"use client"

import {
    isHealthResponse,
    isSystemResponse,
    type ConnectionState,
    type HealthResponse,
    type SystemResponse,
} from "@/types/agent"
import { useRef, useState } from "react"
import { formatBytes } from "@/helpers/formatBytes"
import { formatDuration } from "@/helpers/formatDuration"

const AGENT_HEALTH_URL = "http://127.0.0.1:8000/api/v1/health"
const AGENT_SYSTEM_URL = "http://127.0.0.1:8000/api/v1/system"

const REQUEST_TIMEOUT_MS = 5000

export default function Agent_Connection() {
    const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected")
    const [agent, setAgent] = useState<HealthResponse | null>(null)
    const [system, setSystem] = useState<SystemResponse | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const activeRequestController = useRef<AbortController | null>(null)

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

    function disconnectAgent() {
        setConnectionState("disconnecting")

        activeRequestController.current?.abort()
        activeRequestController.current = null

        window.setTimeout(() => {
            setAgent(null)
            setSystem(null)
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
            <div className="flex flex-col">
                <h1 className="display_font accent_color">BI Surface Agent</h1>
                <p className="primary_color">Explainable Local System Visibility</p>
            </div>

            <p>Connection state: {connectionState}</p>

            {agent && (
                <div>
                    <p>Service: {agent.service}</p>
                    <p>Status: {agent.status}</p>
                    <p>Version: {agent.version}</p>
                </div>
            )}

            {system && (
                <div className="flex flex-col gap-3">
                    <div>
                        <p>Hostname: {system.hostname}</p>
                        <p>
                            Operating system: {system.operating_system.name}{" "}
                            {system.operating_system.release}
                        </p>
                        <p>OS version: {system.operating_system.version}</p>
                        <p>Architecture: {system.operating_system.architecture}</p>
                    </div>

                    <div>
                        <p>Processor: {system.cpu.name}</p>
                        <p>Physical cores: {system.cpu.physical_cores}</p>
                        <p>Logical cores: {system.cpu.logical_cores}</p>
                        <p>CPU usage: {system.cpu.usage_percent}%</p>
                    </div>

                    <div>
                        <p>Total memory: {formatBytes(system.memory.total_bytes)}</p>
                        <p>Used memory: {formatBytes(system.memory.used_bytes)}</p>
                        <p>Available memory: {formatBytes(system.memory.available_bytes)}</p>
                        <p>Memory usage: {system.memory.usage_percent}%</p>
                    </div>

                    <div>
                        <p>Uptime: {formatDuration(system.uptime_seconds)}</p>
                    </div>
                </div>
            )}

            {message && <p>{message}</p>}

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
