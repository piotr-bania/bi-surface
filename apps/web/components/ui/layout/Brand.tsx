"use client"

import { useLanguage } from "@/i18n/Language_Context"

import Heading from "@/components/ui/text/Heading"
import Paragraph from "@/components/ui/text/Paragraph"

type BrandProps = {
    className?: string
}

export default function Brand({ className }: BrandProps) {
    const { dictionary } = useLanguage()

    return (
        <div className={`flex flex-col ${className}`}>
            <Heading
                as="h1"
                className="display_font normal-case leading-none accent_color"
                text="BI Surface"
            />

            <Paragraph
                text={dictionary.common.brand.tagline}
                className="paragraph_tiny primary_color leading-none"
            />
        </div>
    )
}
