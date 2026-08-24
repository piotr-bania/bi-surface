"use client"

import { useLanguage } from "@/i18n/Language_Context"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"

import Paragraph from "@/components/ui/text/Paragraph"

export default function Agent_Connection() {
    const { connectionState, agent, message, connectAgent, disconnectAgent } = useAgentConnection()

    const { dictionary } = useLanguage()

    const connection = dictionary.system.connection

    const canRetry =
        connectionState === "offline" ||
        connectionState === "timed_out" ||
        connectionState === "error"

    const canDisconnect =
        connectionState === "connecting" ||
        connectionState === "connected" ||
        connectionState === "disconnecting"

    function handleConnect() {
        void connectAgent()
    }

    return (
        <div className="col-span-12 flex flex-col gap-3">
            <Paragraph>
                {connection.label}: {connection.states[connectionState]}
            </Paragraph>

            {agent && (
                <div>
                    <Paragraph>
                        {connection.information.service}: {agent.service}
                    </Paragraph>

                    <Paragraph>
                        {connection.information.status}: {agent.status}
                    </Paragraph>

                    <Paragraph>
                        {connection.information.version}: {agent.version}
                    </Paragraph>
                </div>
            )}

            {message && (
                <div aria-live="polite">
                    <Paragraph>{message}</Paragraph>
                </div>
            )}

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
                        ? connection.actions.cancel
                        : connectionState === "disconnecting"
                          ? connection.actions.disconnecting
                          : connection.actions.disconnect}
                </button>
            ) : (
                <button
                    type="button"
                    className={canRetry ? "warning retry" : "primary"}
                    onClick={handleConnect}
                >
                    {canRetry ? connection.actions.retry : connection.actions.connect}
                </button>
            )}
        </div>
    )
}
