import type { Metadata } from 'next'
import { gluten } from '@/app/ui/fonts'

export const metadata: Metadata = {
  title: {
    template: '%s | Todo List App',
    default: 'Todo List App',
  },
  description: 'An application to write down simple tasks, built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${gluten.className} antialiased`}>{children}</body>
    </html>
  )
}
