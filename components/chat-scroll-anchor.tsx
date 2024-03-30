'use client'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { Message } from 'ai'
interface ChatScrollAnchorProps {
  messages: (
    | Message
    | {
        content: string
        role: string
      }
  )[]
}
export function ChatScrollAnchor({ messages }: ChatScrollAnchorProps) {
  const isAtBottom = useAtBottom()
  const { ref, entry } = useInView({
    delay: 100,
    rootMargin: '0px 0px -150px 0px'
  })

  React.useEffect(() => {
    if (isAtBottom) {
      entry?.target.scrollIntoView({ block: 'start' })
    }
  }, [messages.length])

  return <div ref={ref} className="h-px w-full" />
}
