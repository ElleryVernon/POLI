'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'

import { IconSidebar } from '@/components/ui/icons'
import Image from 'next/image'

interface SidebarMobileProps {
  children: React.ReactNode
}

export function SidebarMobile({ children }: SidebarMobileProps) {
  return (
    <div className="flex">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="-ml-2 flex h-9 w-9 p-0 lg:hidden">
            <IconSidebar className="h-6 w-6" />
            <span className="sr-only">토글 사이드바</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
          <Sidebar className="flex">{children}</Sidebar>
        </SheetContent>
      </Sheet>
      <div className="flex lg:hidden items-center ml-2">
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
  )
}
