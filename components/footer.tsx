import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground flex space-x-2',
        className
      )}
      {...props}
    >
      <>
        래빗 라이브 AI 큐시트는 아직 실험 단계입니다. 부자연스럽거나 사실이 아닌 답변을 생성할
        수도 있습니다.
      </>
    </p>
  )
}
