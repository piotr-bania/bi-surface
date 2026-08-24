import "./globals.css"
import "./globals.scss"

import { Language_Provider } from "@/i18n/Language_Context"
import { Agent_Connection_Provider } from "@/components/system/Agent_Connection_Context"

import Topbar from "@/components/layout/topbar/Topbar"
import Footer from "@/components/layout/footer/Footer"
import Sidebar from "@/components/layout/sidebar/Sidebar"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" data-theme="dark" suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true}>
                <Language_Provider>
                    <Agent_Connection_Provider>
                        <Topbar />
                        <Sidebar />
                        {children}
                        <Footer />
                    </Agent_Connection_Provider>
                </Language_Provider>
            </body>
        </html>
    )
}
