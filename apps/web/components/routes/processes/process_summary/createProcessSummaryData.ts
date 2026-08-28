import type { ProcessSummaryData } from "@/types/routes/processes"
import type { HealthResponse, ProcessesResponse } from "@/types/agent"

type CreateProcessSummaryDataInput = {
    agent: HealthResponse | null
    processes: ProcessesResponse | null
}

export function createProcessSummaryData({
    agent,
    processes,
}: CreateProcessSummaryDataInput): ProcessSummaryData {
    if (!processes) {
        return {
            total: null,
            visible: null,
            partial: null,
            accessDenied: null,
            running: null,
            sleeping: null,
            agentPid: agent?.pid ?? null,
            visibilityPercent: null,
        }
    }

    const running = processes.processes.reduce(
        (count, process) => count + (process.status === "running" ? 1 : 0),
        0
    )

    const sleeping = processes.processes.reduce(
        (count, process) => count + (process.status === "sleeping" ? 1 : 0),
        0
    )

    const visibilityPercent =
        processes.count > 0 ? (processes.access.full / processes.count) * 100 : 0

    return {
        total: processes.count,
        visible: processes.access.full,
        partial: processes.access.partial,
        accessDenied: processes.access.denied,
        running,
        sleeping,
        agentPid: agent?.pid ?? null,
        visibilityPercent,
    }
}
