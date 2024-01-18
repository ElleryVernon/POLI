import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: '자기 소개 해줘',
    message: `자기 소개 할 수 있어??`
  },
  {
    heading: '게임 좋아해?',
    message: '너 게임 좋아해?'
  },
  {
    heading: '독도에 대해 어떻게 생각해?',
    message: `독도에 대해 알아?`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">안녕! 라디안이야!</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          나에게 궁금한 점이 있다면 언제든지 질문해줘!
        </p>
        <p className="leading-normal text-muted-foreground">
          아래 같은 주제로 대화를 시작해보는건 어떄?
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
