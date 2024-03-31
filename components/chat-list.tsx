'use client'
import { type Message } from 'ai'
import { ChatMessage } from '@/components/chat-message'
import { useRef } from 'react'

export interface ChatList {
  messages: (Message | { content: string; role: string })[]
}

export function ChatList({ messages }: ChatList) {
  const userMessageRef = useRef<HTMLDivElement>(null)
  const assistantMessageRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative mx-auto max-w-2xl space-y-4 md:space-y-10 mt-14">
      {messages.map((message, index) => {
        const isEnd = index === messages.length - 1
        return (
          <div
            key={index}
            ref={
              message.role === 'user' &&
              (isEnd || index === messages.length - 2)
                ? userMessageRef
                : assistantMessageRef
            }
            className={`${index < messages.length - 1 && 'mb-12'}`}
          >
            <ChatMessage
              message={message}
              isEnd={isEnd}
              userMessageRef={userMessageRef}
            />
          </div>
        )
      })}
    </div>
  )
}
