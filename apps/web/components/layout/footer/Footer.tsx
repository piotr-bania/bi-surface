import packageJson from "@/package.json"
import Card from "@/components/ui/cards/Card"
import Paragraph from "@/components/ui/text/Paragraph"

export default function Footer() {
    return (
        <Card
            topBorder
            rightBorder={false}
            bottomBorder={false}
            leftBorder={false}
            rounded={false}
            className="flex h-12 w-full items-center gap-0! p-0!"
        >
            {/* Footer left */}
            <Card
                topBorder={false}
                rightBorder
                bottomBorder={false}
                leftBorder={false}
                rounded={false}
                className="flex h-full w-[264px] shrink-0 items-center p-3"
            >
                <Paragraph className="paragraph_tiny">BI Surface v{packageJson.version}</Paragraph>
            </Card>

            {/* Footer right */}
            <div className="flex-1 flex flex-row items-center justify-between gap-3 p-3">
                {/* Telemetry paragraph */}
                <Paragraph className="paragraph_tiny">
                    All telemetry is collected and processed locally.
                </Paragraph>

                {/* Statement paragraph */}
                <Paragraph className="paragraph_tiny">Explainable. Local. Transparent.</Paragraph>

                {/* Links */}
                <div className="flex flex-row items-center justify-end gap-9">
                    <div className="flex flex-row items-center gap-1">
                        <Paragraph className="paragraph_tiny">Icon</Paragraph>
                        <Paragraph className="paragraph_tiny">Docs</Paragraph>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <Paragraph className="paragraph_tiny">Icon</Paragraph>
                        <Paragraph className="paragraph_tiny">GitHub</Paragraph>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <Paragraph className="paragraph_tiny">Icon</Paragraph>
                        <Paragraph className="paragraph_tiny">Report issue</Paragraph>
                    </div>
                </div>
            </div>
        </Card>
    )
}
