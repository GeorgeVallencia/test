import localFont from "next/font/local"
import "./globals.css"

const satoshi = localFont({
  src: "../../public/fonts/satoshi /Fonts/WEB/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>{children}</body>
    </html>
  )
}