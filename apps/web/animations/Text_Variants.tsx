import type { Variants } from "motion/react"
import type { TextVariant } from "@/types/text"

const EASE_SYSTEM: [number, number, number, number] = [0.2, 0, 0, 1]
const EASE_EXIT: [number, number, number, number] = [0.4, 0, 1, 1]

export const heading_1_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 4,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.18,
            ease: EASE_SYSTEM,
            delay: 0.04,
        },
    },
}

export const heading_2_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 3,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.16,
            ease: EASE_SYSTEM,
            delay: 0.06,
        },
    },
}

export const heading_3_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 3,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.15,
            ease: EASE_SYSTEM,
            delay: 0.08,
        },
    },
}

export const heading_4_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 2,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.14,
            ease: EASE_SYSTEM,
            delay: 0.1,
        },
    },
}

export const heading_5_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 2,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.13,
            ease: EASE_SYSTEM,
            delay: 0.12,
        },
    },
}

export const heading_6_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 1,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.12,
            ease: EASE_SYSTEM,
            delay: 0.14,
        },
    },
}

export const paragraph_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 2,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.14,
            ease: EASE_SYSTEM,
            delay: 0.1,
        },
    },
}

export const corner_sentence_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 1,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.12,
            ease: EASE_SYSTEM,
            delay: 0.08,
        },
    },
}

export const list_container_variant: Variants = {
    hidden: {},

    visible: {
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.025,
        },
    },

    exit: {
        transition: {
            staggerChildren: 0.015,
            staggerDirection: -1,
        },
    },
}

export const label_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 1,
    },

    visible: {
        opacity: 0.65,
        y: 0,

        transition: {
            duration: 0.12,
            ease: EASE_SYSTEM,
        },
    },

    exit: {
        opacity: 0,
        y: 0,

        transition: {
            duration: 0.08,
            ease: EASE_EXIT,
        },
    },
}

export const link_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 2,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.13,
            ease: EASE_SYSTEM,
        },
    },

    exit: {
        opacity: 0,
        y: 0,

        transition: {
            duration: 0.08,
            ease: EASE_EXIT,
        },
    },
}

export const level_link_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 1,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.12,
            ease: EASE_SYSTEM,
        },
    },

    exit: {
        opacity: 0,
        y: 0,

        transition: {
            duration: 0.08,
            ease: EASE_EXIT,
        },
    },
}

export const nav_container_variant: Variants = {
    hidden: {},

    visible: {
        transition: {
            delayChildren: 0.04,
            staggerChildren: 0.035,
        },
    },

    exit: {
        transition: {
            staggerChildren: 0.02,
            staggerDirection: -1,
        },
    },
}

export const nav_link_variant: TextVariant = {
    hidden: {
        opacity: 0,
        y: 1,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.12,
            ease: EASE_SYSTEM,
        },
    },

    exit: {
        opacity: 0,
        y: 0,

        transition: {
            duration: 0.08,
            ease: EASE_EXIT,
        },
    },
}
