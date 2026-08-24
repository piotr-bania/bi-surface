import type { ProcessesResponse } from "@/types/agent"
import type { VisibilityCoverageData, VisibilityState } from "@/types/routes/dashboard"

const PROCESS_VISIBILITY_FIELD_COUNT = 8

function calculateProcessVisibility(processes: ProcessesResponse | null): number | null {
    if (processes === null || processes.count <= 0) {
        return null
    }

    const totalFields = processes.count * PROCESS_VISIBILITY_FIELD_COUNT
    const deniedFields = Object.values(processes.denied_field_counts).reduce(
        (total, count) => total + count,
        0
    )
    const visibleFields = totalFields - Math.min(totalFields, deniedFields)
    const percentage = (visibleFields / totalFields) * 100

    return Math.round(percentage * 10) / 10
}

function resolveVisibilityState(percentage: number | null): VisibilityState {
    if (percentage === null) {
        return "unavailable"
    }

    if (percentage === 100) {
        return "full"
    }

    if (percentage >= 60) {
        return "partial"
    }

    if (percentage > 0) {
        return "limited"
    }

    return "locked"
}

export function createVisibilityCoverageData(
    processes: ProcessesResponse | null
): VisibilityCoverageData {
    const processVisibility = calculateProcessVisibility(processes)
    const processRequiresElevation =
        processes !== null && (processes.access.partial > 0 || processes.access.denied > 0)
    const items: VisibilityCoverageData["items"] = [
        {
            id: "processes",
            state: resolveVisibilityState(processVisibility),
            visibilityPercent: processVisibility,
            requiresElevation: processRequiresElevation,
        },
        {
            id: "network",
            state: "planned",
            visibilityPercent: null,
            requiresElevation: false,
        },
        {
            id: "services",
            state: "planned",
            visibilityPercent: null,
            requiresElevation: false,
        },
        {
            id: "files",
            state: "planned",
            visibilityPercent: null,
            requiresElevation: false,
        },
        {
            id: "registry",
            state: "planned",
            visibilityPercent: null,
            requiresElevation: true,
        },
    ]

    const totalCollectors = items.length
    const totalVisibility = items.reduce((total, item) => total + (item.visibilityPercent ?? 0), 0)
    const overallVisibilityPercent = Math.round((totalVisibility / totalCollectors) * 10) / 10
    const activeCollectors = items.filter((item) => item.visibilityPercent !== null).length

    return {
        overallVisibilityPercent,
        overallState:
            activeCollectors > 0 ? resolveVisibilityState(overallVisibilityPercent) : "unavailable",

        activeCollectors,
        totalCollectors,
        items,
    }
}
