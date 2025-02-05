'use client'

import Link from 'next/link'
import * as React from 'react'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { IconNextChat, IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { ChatHistory } from './chat-history'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { Session } from 'next-auth/types'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export async function UserOrLogin({ session }: { session: Session | null }) {
  const { isSidebarOpen, isLoading } = useSidebar()
  return (
    <div className="flex items-between transition-all duration-500">
      {session?.user ? (
        <div>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <div className="flex items-center">
            <div
              className={cn(
                session?.user && isSidebarOpen && !isLoading
                  ? 'hidden'
                  : 'block mr-3'
              )}
            >
              <SidebarToggle />
            </div>
            <div className="hidden md:flex items-center">
              <Image
                src={'/icons/logo.svg'}
                alt={'Service Logo'}
                width={24}
                height={24}
                className="mr-1"
              />
              <h1 className="font-extrabold text-xl text-neutral-700">POLI</h1>
            </div>
          </div>
        </div>
      ) : (
        <Link href="/" target="\_blank" rel="nofollow">
          <IconNextChat className="w-6 h-6 mr-2" inverted />
        </Link>
      )}
      <div className="flex items-center">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/sign-in?callbackUrl=/">로그인</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

const MemoizedUserOrLogin = React.memo(UserOrLogin, (prevProps, nextProps) => {
  return prevProps.session === nextProps.session
})

export function Header({ session }: { session: Session | null }) {
  const { isSidebarOpen, isLoading } = useSidebar()
  return (
    <header
      className={cn(
        'fixed top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 transition-[margin] bg-white',
        session?.user && isSidebarOpen && !isLoading
          ? 'ml-0 lg:ml-[250px] transition-none'
          : 'ml-0'
      )}
    >
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <MemoizedUserOrLogin session={session} />
        </React.Suspense>
      </div>
    </header>
  )
}

export const MemoizedHeader = React.memo(Header, (prevProps, nextProps) => {
  return prevProps.session === nextProps.session
})
