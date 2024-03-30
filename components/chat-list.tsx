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
    <div className="mx-auto flex flex-col space-y-4 md:space-y-8 px-4 md:px-8 lg:px-16">
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
            className={`${index < messages.length - 1 && 'mb-10'}`}
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
