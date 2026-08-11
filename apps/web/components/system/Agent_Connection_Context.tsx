"use client"

import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react"

import type { ConnectionState } from "@/types/agent"

type AgentConnectionContextValue = {
    connectionState: ConnectionState
    setConnectionState: Dispatch<SetStateAction<ConnectionState>>
}

const AgentConnectionContext = createContext<AgentConnectionContextValue | null>(null)

export function Agent_Connection_Provider({ children }: { children: ReactNode }) {
    const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected")

    return (
        <AgentConnectionContext.Provider value={{ connectionState, setConnectionState }}>
            {children}
        </AgentConnectionContext.Provider>
    )
}

export function useAgentConnection() {
    const context = useContext(AgentConnectionContext)

    if (!context) {
        throw new Error("useAgentConnection must be used within Agent_Connection_Provider.")
    }

    return context
}
