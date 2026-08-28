"use client"

import { useEffect, useRef, type ReactNode } from "react"

import Lenis from "lenis"

type MenuOverlayScrollLockDetail = {
    locked: boolean
}

type MenuOverlayScrollLockEvent = CustomEvent<MenuOverlayScrollLockDetail>

type Lenis_Provider_Props = {
    children: ReactNode
}

export default function Lenis_Provider({ children }: Lenis_Provider_Props) {
    const wrapperRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const wrapper = wrapperRef.current
        const content = contentRef.current

        if (!wrapper || !content) {
            return
        }

        const lenis = new Lenis({
            wrapper,
            content,
            smoothWheel: true,
        })

        let animationFrameId: number

        const handleMenuScrollLock = (event: Event) => {
            const customEvent = event as MenuOverlayScrollLockEvent

            if (customEvent.detail?.locked) {
                lenis.stop()
            } else {
                lenis.start()
            }
        }

        const raf = (time: number) => {
            lenis.raf(time)
            animationFrameId = requestAnimationFrame(raf)
        }

        window.addEventListener("menu-overlay-scroll-lock", handleMenuScrollLock)

        animationFrameId = requestAnimationFrame(raf)

        return () => {
            window.removeEventListener("menu-overlay-scroll-lock", handleMenuScrollLock)

            cancelAnimationFrame(animationFrameId)

            lenis.destroy()
        }
    }, [])

    return (
        <main
            ref={wrapperRef}
            className="fixed top-16 right-0 bottom-12 left-[264px] overflow-x-hidden overflow-y-auto"
        >
            <div ref={contentRef}>{children}</div>
        </main>
    )
}
