import type { ProcessVisibility } from "@/types/routes/processes"

export const processVisibilityStyles: Record<ProcessVisibility, string> = {
    full: "success success_border_color",
    partial: "warning warning_border_color",
    denied: "danger danger_border_color",
}
