import type { ReactNode } from "react"
import type { Transition } from "motion/react"

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type AnimatedTextProps = {
    id?: string
    text?: ReactNode
    children?: ReactNode
    className?: string
}

export type TextVariantState = {
    opacity: number
    y: number
    transition?: Transition
}

export type TextVariant = {
    hidden: TextVariantState
    visible: TextVariantState & {
        transition: Transition
    }
    exit?: TextVariantState
}
