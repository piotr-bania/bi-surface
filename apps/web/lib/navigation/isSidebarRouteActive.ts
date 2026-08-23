import type { SidebarRouteDefinition } from "@/types/navigation"

export function isSidebarRouteActive(pathname: string, route: SidebarRouteDefinition): boolean {
    if (route.exact) {
        return pathname === route.path
    }

    return pathname === route.path || pathname.startsWith(`${route.path}/`)
}
