"use client"

import { useLanguage } from "@/i18n/Language_Context"

import Paragraph from "@/components/ui/text/Paragraph"
import Section_Frame from "@/components/ui/frames/Section_Frame"

type Parent_Chain_Props = {
    className?: string
}

export default function Parent_Chain({ className = "" }: Parent_Chain_Props) {
    const { dictionary } = useLanguage()
    const copy = dictionary.processes.parentChain

    return (
        <Section_Frame title={copy.title} className={className} contentClassName="px-4 pb-4 pt-3">
            <Paragraph className="paragraph_small">{copy.placeholder}</Paragraph>
        </Section_Frame>
    )
}
