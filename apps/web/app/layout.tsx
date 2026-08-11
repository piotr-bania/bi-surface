import "./globals.css"
import "./globals.scss"

import Topbar from "@/components/ui/layout/Topbar"
import Sidebar from "@/components/ui/layout/Sidebar"
import { Agent_Connection_Provider } from "@/components/system/Agent_Connection_Context"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" data-theme="dark" suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true}>
                <Agent_Connection_Provider>
                    <Sidebar />
                    <Topbar />
                    {children}
                </Agent_Connection_Provider>
            </body>
        </html>
    )
}
