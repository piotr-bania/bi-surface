import type { ProcessesResponse } from "@/types/agent"
import type { ProcessExplorerData } from "@/types/routes/processes"

type CreateProcessExplorerDataInput = {
    processes: ProcessesResponse | null
}

export function createProcessExplorerData({
    processes,
}: CreateProcessExplorerDataInput): ProcessExplorerData {
    if (!processes) {
        return {
            rows: [],
            total: 0,
        }
    }

    return {
        rows: processes.processes.map((process) => ({
            pid: process.pid,
            ppid: process.ppid,
            name: process.name,
            username: process.username,
            cpuPercent: process.cpu_percent,
            memoryPercent: process.memory_percent,
            memoryMb: process.memory_mb,
            threads: process.threads,
            status: process.status,
            visibility: process.access_status,
        })),

        total: processes.count,
    }
}
