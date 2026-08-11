import Card from "@/components/ui/cards/Card"
import Brand from "@/components/ui/layout/Brand"

export default async function Sidebar() {
    return (
        <Card
            topBorder={false}
            rightBorder
            bottomBorder={false}
            leftBorder={false}
            className="flex h-screen w-[264px] shrink-0 flex-col gap-3 p-3"
        >
            <Brand />
        </Card>
    )
}
