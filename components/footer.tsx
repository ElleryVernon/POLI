import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-[11px] leading-normal text-muted-foreground flex space-x-2 text-neutral-500',
        className
      )}
      {...props}
    >
      <>
        폴리가 제공한 법률상담에 대해 어떠한 민사, 형사상의 책임도 지지
        않습니다. <br />
        답변 내용은 참고자료로만 사용하시기 바라며 최종 결정에는 반드시 변호사의
        조력을 받아야 합니다.
      </>
    </p>
  )
}
