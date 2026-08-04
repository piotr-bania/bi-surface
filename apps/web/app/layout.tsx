import "./globals.css"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true}>{children}</body>
        </html>
    )
}
