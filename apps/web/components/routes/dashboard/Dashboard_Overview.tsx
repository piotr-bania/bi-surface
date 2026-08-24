"use client"

import type { ReactNode } from "react"

import { useLanguage } from "@/i18n/Language_Context"

import Heading from "@/components/ui/text/Heading"
import Paragraph from "@/components/ui/text/Paragraph"

type Dashboard_Overview_Props = {
    children: ReactNode
    className?: string
}

export default function Dashboard_Overview({ children, className = "" }: Dashboard_Overview_Props) {
    const { dictionary } = useLanguage()

    const copy = dictionary.dashboard

    return (
        <div className={`col-span-12 flex min-h-0 flex-col gap-3 ${className}`}>
            <header className="flex flex-row items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <Heading as="h3" className="primary_color">
                        {copy.page.title}
                    </Heading>

                    <Paragraph className="paragraph_small">{copy.page.description}</Paragraph>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="button_font primary_color primary_border_color w-fit border px-4 py-2 uppercase">
                        {copy.page.localDataOnly}
                    </span>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-3">{children}</div>
        </div>
    )
}
