import { Toaster } from 'react-hot-toast'
import localFont from 'next/font/local'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header, MemoizedHeader } from '@/components/header'
import { auth } from '@/auth'

const wanted = localFont({
  src: [
    {
      path: 'fonts/WantedSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal'
    },
    {
      path: 'fonts/WantedSans-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: 'fonts/WantedSans-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: 'fonts/WantedSans-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: 'fonts/WantedSans-Regular.ttf',
      weight: '400',
      style: 'normal'
    }
  ]
})

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'TOG.AI',
    template: `%s - TOG.AI`
  },
  description: 'TOG.AI',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased', wanted.className)}>
        <Toaster />
        <Providers
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {/* @ts-ignore */}
            <MemoizedHeader session={session} />
            <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
