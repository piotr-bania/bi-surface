"use client"

import { useEffect, useState } from "react"
import { useAgentConnection } from "@/components/system/Agent_Connection_Context"

function formatElapsed(seconds: number) {
    if (seconds < 60) {
        return `${seconds}s ago`
    }

    const minutes = Math.floor(seconds / 60)

    if (minutes < 60) {
        return `${minutes}m ago`
    }

    return `${Math.floor(minutes / 60)}h ago`
}

export default function Last_Updated() {
    const { lastUpdated } = useAgentConnection()
    const [now, setNow] = useState(() => Date.now())

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => window.clearInterval(intervalId)
    }, [])

    const updatedAt = lastUpdated ? new Date(lastUpdated) : null
    const elapsedSeconds = lastUpdated ? Math.max(0, Math.floor((now - lastUpdated) / 1000)) : null

    return (
        <div className="flex w-fit flex-col justify-center">
            <span className="paragraph_tiny muted_color uppercase">Last updated</span>

            <div className="flex items-center gap-3 whitespace-nowrap">
                {updatedAt ? (
                    <time
                        dateTime={updatedAt.toISOString()}
                        className="paragraph_tiny heading_color tabular-nums"
                    >
                        {updatedAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                        })}
                    </time>
                ) : (
                    <span className="paragraph_tiny heading_color tabular-nums">--:--:--</span>
                )}

                <span className="paragraph_tiny muted_color tabular-nums">
                    {elapsedSeconds === null ? "No data" : formatElapsed(elapsedSeconds)}
                </span>
            </div>
        </div>
    )
}
