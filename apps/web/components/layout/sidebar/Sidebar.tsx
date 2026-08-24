import type { SidebarRouteOverrides } from "@/types/navigation"

import Card from "@/components/ui/cards/Card"
import Brand from "@/components/layout/brand/Brand"
import Agent_Status_Card from "@/components/layout/sidebar/Agent_Status_Card"
import Sidebar_Navigation from "@/components/layout/sidebar/Sidebar_Navigation"

type Sidebar_Props = {
    routeOverrides?: SidebarRouteOverrides
}

export default function Sidebar({ routeOverrides }: Sidebar_Props) {
    return (
        <aside aria-label="BI Surface" className="h-[calc(100dvh-4rem)] w-[264px] shrink-0">
            <Card
                topBorder={false}
                rightBorder
                bottomBorder={false}
                leftBorder={false}
                className="flex h-full w-full flex-col"
            >
                <Brand className="px-3" />
                <Sidebar_Navigation routeOverrides={routeOverrides} />
                <Agent_Status_Card />
            </Card>
        </aside>
    )
}
