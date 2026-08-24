"use client"

import type { ConnectionState } from "@/types/agent"

import { useLanguage } from "@/i18n/Language_Context"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"

import Card from "@/components/ui/cards/Card"
import Paragraph from "@/components/ui/text/Paragraph"

type Agent_Status_Presentation = {
    textClassName: string
    dotClassName: string
    borderClassName: string
}

const statusPresentation: Record<ConnectionState, Agent_Status_Presentation> = {
    disconnected: {
        textClassName: "danger",
        dotClassName: "critical_background_color",
        borderClassName: "danger_border_color",
    },
    connecting: {
        textClassName: "connecting_color",
        dotClassName: "connecting_background_color",
        borderClassName: "info_border_color",
    },
    connected: {
        textClassName: "success",
        dotClassName: "connected_background_color",
        borderClassName: "success_border_color",
    },
    disconnecting: {
        textClassName: "warning",
        dotClassName: "connecting_background_color",
        borderClassName: "warning_border_color",
    },
    offline: {
        textClassName: "warning",
        dotClassName: "offline_background_color",
        borderClassName: "warning_border_color",
    },
    timed_out: {
        textClassName: "danger",
        dotClassName: "critical_background_color",
        borderClassName: "danger_border_color",
    },
    error: {
        textClassName: "danger",
        dotClassName: "critical_background_color",
        borderClassName: "danger_border_color",
    },
}

export default function Agent_Status_Card() {
    const { dictionary } = useLanguage()
    const { connectionState, agent, telemetry, message, connectAgent, disconnectAgent } =
        useAgentConnection()

    const copy = dictionary.system.agentStatus
    const connection = dictionary.system.connection
    const presentation = statusPresentation[connectionState]
    const isConnected = connectionState === "connected"
    const isConnecting = connectionState === "connecting"
    const isDisconnecting = connectionState === "disconnecting"

    const canRetry =
        connectionState === "offline" ||
        connectionState === "timed_out" ||
        connectionState === "error"

    const telemetryState =
        isConnected && telemetry ? "active" : isConnected || isConnecting ? "waiting" : "inactive"

    const telemetryClassName =
        telemetryState === "active"
            ? "success"
            : telemetryState === "waiting"
              ? "warning"
              : "muted_color"

    const healthDescription =
        isConnected && agent?.status === "online"
            ? copy.health.healthy
            : isConnecting
              ? copy.health.waiting
              : copy.health.unavailable

    const pid = agent?.pid !== undefined ? String(agent.pid) : copy.unavailable

    function handleConnect() {
        void connectAgent()
    }

    return (
        <Card
            aria-label={copy.title}
            className={`relative shrink-0 overflow-hidden border bg-[var(--panel-dark)] p-3 shadow-[inset_0_0_18px_rgba(34,197,94,0.025)] ${presentation.borderClassName}`}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,197,94,0.08),transparent_62%)] opacity-40"
            />

            <div className="relative flex flex-col gap-3">
                {/* Title */}
                <Paragraph className="paragraph_small uppercase">{copy.title}</Paragraph>

                {/* Agent status health display */}
                <div className="flex flex-wrap items-center justify-between border-t border-[var(--border-neutral)] pt-3">
                    <div aria-live="polite" className="flex items-center gap-3">
                        <span
                            aria-hidden="true"
                            className={`size-2 shrink-0 rounded-full ${presentation.dotClassName} ${
                                isConnected ? "success_glow" : ""
                            }`}
                        />

                        <Paragraph className={`uppercase ${presentation.textClassName}`}>
                            {copy.states[connectionState]}
                        </Paragraph>
                    </div>

                    <Paragraph
                        className={`paragraph_small ${isConnected ? "success" : "muted_color"}`}
                    >
                        {healthDescription}
                    </Paragraph>
                </div>

                {/* Agent details table */}
                <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-t border-[var(--border-neutral)] pt-3">
                    <dt className="paragraph_small">{copy.labels.pid}</dt>
                    <dd className="paragraph_small heading_color tabular-nums text-right">{pid}</dd>

                    <dt className="paragraph_small">{copy.labels.telemetry}</dt>
                    <dd className={`paragraph_small text-right ${telemetryClassName}`}>
                        {copy.telemetry[telemetryState]}
                    </dd>
                </dl>

                {message && (
                    <div aria-live="polite" title={message}>
                        <Paragraph className="paragraph_tiny warning break-words">
                            {message}
                        </Paragraph>
                    </div>
                )}

                {isConnected || isConnecting || isDisconnecting ? (
                    <button
                        type="button"
                        className={`!w-full ${
                            isConnecting ? "neutral cancel" : "danger disconnect"
                        }`}
                        onClick={disconnectAgent}
                        disabled={isDisconnecting}
                    >
                        {isConnecting
                            ? connection.actions.cancel
                            : isDisconnecting
                              ? connection.actions.disconnecting
                              : connection.actions.disconnect}
                    </button>
                ) : (
                    <button
                        type="button"
                        className={`!w-full ${canRetry ? "warning retry" : "success connect"}`}
                        onClick={handleConnect}
                    >
                        {canRetry ? connection.actions.retry : connection.actions.connect}
                    </button>
                )}
            </div>
        </Card>
    )
}
