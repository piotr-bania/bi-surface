import type { SidebarRouteOverrides } from "@/types/navigation"

import Card from "@/components/ui/cards/Card"
import Brand from "@/components/ui/layout/Brand"
import Sidebar_Navigation from "@/components/ui/layout/Sidebar_Navigation"

type Sidebar_Props = {
    routeOverrides?: SidebarRouteOverrides
}

export default function Sidebar({ routeOverrides }: Sidebar_Props) {
    return (
        <aside aria-label="BI Surface" className="h-screen w-[264px] shrink-0">
            <Card
                topBorder={false}
                rightBorder
                bottomBorder={false}
                leftBorder={false}
                className={["flex", "h-full", "w-full", "flex-col", "gap-5", "p-3"].join(" ")}
            >
                <Brand />

                <Sidebar_Navigation routeOverrides={routeOverrides} />
            </Card>
        </aside>
    )
}
