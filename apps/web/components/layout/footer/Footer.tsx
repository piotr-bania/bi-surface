"use client"

import { useLanguage } from "@/i18n/Language_Context"
import { PiBookOpenTextDuotone, PiGithubLogoDuotone, PiInfoDuotone } from "react-icons/pi"

import Card from "@/components/ui/cards/Card"
import Paragraph from "@/components/ui/text/Paragraph"

export default function Footer() {
    const { dictionary } = useLanguage()

    const copy = dictionary.common.footer

    return (
        <Card
            topBorder
            rightBorder={false}
            bottomBorder={false}
            leftBorder={false}
            rounded={false}
            className="fixed bottom-0 left-[264px] z-50 flex h-12 w-[calc(100%-264px)] items-center gap-0! p-0!"
        >
            <div className="flex flex-1 flex-row items-center justify-between gap-3 p-3">
                {/* Telemetry paragraph */}
                <Paragraph className="paragraph_tiny">{copy.telemetry}</Paragraph>

                {/* Statement paragraph */}
                <Paragraph className="paragraph_tiny">{copy.statement}</Paragraph>

                {/* Links */}
                <div className="flex flex-row items-center justify-end gap-9">
                    <a
                        href="https://github.com/piotr-bania/bi-surface"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row items-center gap-1 hover:opacity-80 transition-all"
                    >
                        <PiBookOpenTextDuotone aria-label="GitHub" className="size-4 info" />
                        <Paragraph className="paragraph_tiny">{copy.docs}</Paragraph>
                    </a>

                    <a className="flex flex-row items-center gap-1 hover:opacity-80 transition-all">
                        <PiGithubLogoDuotone aria-label="GitHub" className="size-4 info" />
                        <Paragraph className="paragraph_tiny">{copy.github}</Paragraph>
                    </a>

                    <a className="flex flex-row items-center gap-1 hover:opacity-80 transition-all">
                        <PiInfoDuotone aria-label="Info" className="size-4 info" />
                        <Paragraph className="paragraph_tiny">{copy.reportIssue}</Paragraph>
                    </a>
                </div>
            </div>
        </Card>
    )
}
