"use client"

import {
    heading_1_variant,
    heading_2_variant,
    heading_3_variant,
    heading_4_variant,
    heading_5_variant,
    heading_6_variant,
} from "@/animations/Text_Variants"
import { useEffect } from "react"
import type { AnimatedTextProps, HeadingTag } from "@/types/text"
import { animate, motion as m, useMotionValue, usePresence, type Variants } from "motion/react"

type HeadingProps = AnimatedTextProps & {
    as?: HeadingTag
}

const variantsMap = {
    h1: heading_1_variant,
    h2: heading_2_variant,
    h3: heading_3_variant,
    h4: heading_4_variant,
    h5: heading_5_variant,
    h6: heading_6_variant,
}

const motionHeadingMap = {
    h1: m.h1,
    h2: m.h2,
    h3: m.h3,
    h4: m.h4,
    h5: m.h5,
    h6: m.h6,
}

export default function Heading({ as = "h2", id, text, children, className }: HeadingProps) {
    const [isPresent, safeToRemove] = usePresence()

    const entryOpacity = useMotionValue(0)

    const variants = variantsMap[as]
    const Tag = motionHeadingMap[as]

    const content = children ?? text

    useEffect(() => {
        const transition = variants.visible.transition

        const controls = animate(entryOpacity, 1, {
            duration: transition.duration,
            delay: transition.delay,
            ease: transition.ease,
        })

        return () => controls.stop()
    }, [entryOpacity, variants])

    useEffect(() => {
        if (isPresent) {
            return
        }

        const exitDuration = 0.22

        const controls = animate(entryOpacity, 0, {
            duration: exitDuration,
            ease: [0.4, 0, 1, 1],
        })

        const timeoutId = window.setTimeout(() => {
            safeToRemove?.()
        }, exitDuration * 1000)

        return () => {
            controls.stop()
            window.clearTimeout(timeoutId)
        }
    }, [isPresent, entryOpacity, safeToRemove])

    const yVariant: Variants = {
        hidden: {
            y: variants.hidden.y,
        },

        visible: {
            y: variants.visible.y,
            transition: variants.visible.transition,
        },

        exit: {
            y: variants.hidden.y,
            transition: {
                duration: 0.24,
                ease: [0.4, 0, 1, 1],
            },
        },
    }

    if (content === undefined || content === null) {
        return null
    }

    return (
        <Tag
            id={id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={yVariant}
            className={className}
            style={{ opacity: entryOpacity }}
            suppressHydrationWarning
        >
            {content}
        </Tag>
    )
}
