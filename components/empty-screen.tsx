import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: '요한복음 3장 16절 말씀은 어떤 내용인가요?',
    message: `요한복음 3장 16절 말씀은 어떤 내용인가요?`
  },
  {
    heading: '오늘의 말씀을 추천해주세요.',
    message: `오늘의 말씀을 추천해주세요.`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-xl border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          안녕하세요! TOG.AI 입니다!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          성경에 대해 궁금한 점이 있다면 언제든지 말씀해주세요!
        </p>
        <p className="leading-normal text-muted-foreground">
          아래 같은 주제로 대화를 시작해보는건 어떤가요?
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
