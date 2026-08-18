"use client"

import { useEffect } from "react"
import type { AnimatedTextProps } from "@/types/text"
import { paragraph_variant } from "@/animations/Text_Variants"
import { animate, motion as m, useMotionValue, type Variants } from "motion/react"

export default function Paragraph({ text, children, className }: AnimatedTextProps) {
    const entryOpacity = useMotionValue(0)
    const content = children ?? text

    useEffect(() => {
        const transition = paragraph_variant.visible.transition
        const controls = animate(entryOpacity, 1, {
            duration: transition.duration,
            delay: transition.delay,
            ease: transition.ease,
        })

        return () => controls.stop()
    }, [entryOpacity])

    const yVariant: Variants = {
        hidden: {
            y: paragraph_variant.hidden.y,
        },

        visible: {
            y: paragraph_variant.visible.y,
            transition: paragraph_variant.visible.transition,
        },
    }

    if (content === undefined || content === null) {
        return null
    }

    return (
        <m.p
            initial="hidden"
            animate="visible"
            variants={yVariant}
            className={className}
            style={{ opacity: entryOpacity }}
        >
            {content}
        </m.p>
    )
}
