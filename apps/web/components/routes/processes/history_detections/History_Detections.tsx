"use client"

import { useLanguage } from "@/i18n/Language_Context"

import Paragraph from "@/components/ui/text/Paragraph"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type History_Detections_Props = {
    className?: string
}

export default function History_Detections({ className = "" }: History_Detections_Props) {
    const { dictionary } = useLanguage()
    const copy = dictionary.processes.historyDetections

    return (
        <Section_Frame title={copy.title} className={className} contentClassName="px-4 pb-4 pt-3">
            <Paragraph className="paragraph_small">{copy.placeholder}</Paragraph>
        </Section_Frame>
    )
}
