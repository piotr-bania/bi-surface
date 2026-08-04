"use client"

import { useState } from "react"
import type { ConnectionState, HealthResponse } from "@/app/types/agent"

const AGENT_HEALTH_URL = "http://127.0.0.1:8000/api/v1/health"

export default function Agent_Connection() {
    const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected")
    const [agent, setAgent] = useState<HealthResponse | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    async function connectAgent() {
        setConnectionState("connecting")
        setMessage(null)

        try {
            const response = await fetch(AGENT_HEALTH_URL)

            if (!response.ok) {
                throw new Error(`Agent responded with HTTP ${response.status}`)
            }

            const data: HealthResponse = await response.json()
            setAgent(data)
            setConnectionState("connected")
        } catch (error: unknown) {
            setAgent(null)

            if (error instanceof TypeError) {
                setConnectionState("offline")
                setMessage("The BI Surface agent could not be reached.")

                return
            }

            setConnectionState("error")
            setMessage(
                error instanceof Error ? error.message : "An unknown connection error occurred."
            )
        }
    }

    function disconnectAgent() {
        setConnectionState("disconnecting")

        window.setTimeout(() => {
            setAgent(null)
            setMessage(null)
            setConnectionState("disconnected")
        }, 500)
    }

    return (
        <section>
            <h1>BI Surface</h1>
            <p>Connection state: {connectionState}</p>

            {agent && (
                <div>
                    <p>Service: {agent.service}</p>
                    <p>Status: {agent.status}</p>
                    <p>Version: {agent.version}</p>
                </div>
            )}

            {message && <p>{message}</p>}

            {connectionState === "connected" || connectionState === "disconnecting" ? (
                <button
                    type="button"
                    onClick={disconnectAgent}
                    disabled={connectionState === "disconnecting"}
                >
                    {connectionState === "disconnecting" ? "Disconnecting..." : "Disconnect"}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={connectAgent}
                    disabled={connectionState === "connecting"}
                >
                    {connectionState === "connecting"
                        ? "Connecting..."
                        : connectionState === "offline" || connectionState === "error"
                          ? "Retry connection"
                          : "Connect agent"}
                </button>
            )}
        </section>
    )
}
