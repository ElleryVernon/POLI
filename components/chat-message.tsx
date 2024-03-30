// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'
import { GoDependabot } from 'react-icons/go'
import { RefObject } from 'react'

export interface ChatMessageProps {
  message: Message | { content: string; role: string }
  isEnd: boolean
  userMessageRef: RefObject<HTMLDivElement>
}

export function ChatMessage({
  message,
  isEnd,
  userMessageRef,
  ...props
}: ChatMessageProps) {
  const userHeight = userMessageRef.current?.offsetHeight || 0 + 384

  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      style={{
        minHeight:
          isEnd && message.role === 'assistant'
            ? `calc(100vh - ${userHeight + 336}px)`
            : undefined
      }}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full mb-3 border',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? (
          <IconUser />
        ) : (
          <GoDependabot className="h-4 w-4" fill="currentColor" />
        )}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden px-5 flex flex-col w-full">
        {isEnd &&
        message.role === 'assistant' &&
        message.content.trim() === '' ? (
          <div className="flex flex-col space-y-2">
            <div className="w-full h-5 bg-gray-400 animate-pulse mt-[5px] rounded-sm"></div>
            <div className="w-full h-5 bg-gray-400 animate-pulse mt-[6px] rounded-sm"></div>
            <div className="w-full h-5 bg-gray-400 animate-pulse mt-[6px] rounded-sm"></div>
          </div>
        ) : (
          <>
            <MemoizedReactMarkdown
              className="prose break-words prose-p:leading-relaxed prose-pre:p-0 text-[16px] text-black"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>
                },
                code({ node, inline, className, children, ...props }) {
                  if (children.length) {
                    if (children[0] == '▍') {
                      return (
                        <span className="mt-1 cursor-default animate-pulse">
                          ▍
                        </span>
                      )
                    }
                    children[0] = (children[0] as string).replace('`▍`', '▍')
                  }
                  const match = /language-(\w+)/.exec(className || '')
                  if (inline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                  return (
                    <CodeBlock
                      key={Math.random()}
                      language={(match && match[1]) || ''}
                      value={String(children).replace(/\n$/, '')}
                      {...props}
                    />
                  )
                }
              }}
            >
              {message.content}
            </MemoizedReactMarkdown>
            <ChatMessageActions message={message} />
          </>
        )}
      </div>
    </div>
  )
}
