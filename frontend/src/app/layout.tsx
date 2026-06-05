// frontend/src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


// layout.tsx
// layout.tsx
import { Montserrat } from "next/font/google";
const titleFont = Montserrat({ weight: "700", subsets: ["latin"] });

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vitamin Skincare',
  description: 'Unlock your skin natural beauty',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}