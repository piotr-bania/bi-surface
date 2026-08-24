import type { InvestigationQueueData } from "@/types/routes/dashboard"

export function createInvestigationQueueData(): InvestigationQueueData {
    return {
        state: "unavailable",
        counts: {
            critical: null,
            high: null,
            warning: null,
            reviewed: null,
        },
        items: [],
    }
}
