"use client"

import { useRef, useState } from "react"
import type { ConnectionState, HealthResponse } from "@/types/agent"

const AGENT_HEALTH_URL = "http://127.0.0.1:8000/api/v1/health"
const REQUEST_TIMEOUT_MS = 5000

export default function Agent_Connection() {
    const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected")
    const [agent, setAgent] = useState<HealthResponse | null>(null)
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
        setMessage(null)

        try {
            const response = await fetch(AGENT_HEALTH_URL, {
                method: "GET",
                signal: controller.signal,
            })

            if (!response.ok) {
                throw new Error(`Agent responded with HTTP ${response.status}`)
            }

            const data: HealthResponse = await response.json()

            setAgent(data)
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
        <div className="col-span-12 flex flex-col">
            <h1 className="display_font">BI Surface</h1>
            <p>Connection state: {connectionState}</p>

            {agent && (
                <div>
                    <p>Service: {agent.service}</p>
                    <p>Status: {agent.status}</p>
                    <p>Version: {agent.version}</p>
                </div>
            )}

            {message && <p>{message}</p>}

            {canDisconnect ? (
                <button
                    type="button"
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
                <button type="button" onClick={connectAgent}>
                    {canRetry ? "Retry connection" : "Connect agent"}
                </button>
            )}
        </div>
    )
}
