import type { SidebarRouteOverrides } from "@/types/navigation"

import packageJson from "@/package.json"
import Card from "@/components/ui/cards/Card"
import Brand from "@/components/layout/brand/Brand"
import Paragraph from "@/components/ui/text/Paragraph"
import Agent_Status_Card from "@/components/layout/sidebar/Agent_Status_Card"
import Sidebar_Navigation from "@/components/layout/sidebar/Sidebar_Navigation"

type Sidebar_Props = {
    routeOverrides?: SidebarRouteOverrides
}

export default function Sidebar({ routeOverrides }: Sidebar_Props) {
    return (
        <aside
            aria-label="BI Surface"
            className="fixed top-0 left-0 h-[calc(100dvh-3rem)] w-[264px] shrink-0 z-50"
        >
            <Card
                topBorder={false}
                rightBorder
                bottomBorder={false}
                leftBorder={false}
                rounded={false}
                className="flex h-full w-full flex-col"
            >
                <Brand className="px-3" />
                <Sidebar_Navigation routeOverrides={routeOverrides} />
                <Agent_Status_Card />
            </Card>
            <Card
                topBorder
                rightBorder
                bottomBorder={false}
                leftBorder={false}
                rounded={false}
                className="flex h-12 w-[264px] shrink-0 items-center p-3"
            >
                <Paragraph className="paragraph_tiny">BI Surface v{packageJson.version}</Paragraph>
            </Card>
        </aside>
    )
}
