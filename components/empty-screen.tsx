import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: '로맨스 스캠이 뭔가요?',
    message: `로맨스 스캠에 대해 자세히 알려주세요.`
  },
  {
    heading: '사이버 범죄의 신고 절차는 어떻게 이루어지나요?',
    message: `사이버 범죄의 신고 절차에 대해 자세히 알려주세요.`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-xl border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          안녕하세요! 경찰청 사이버범죄 피해자 지원 AI 폴리입니다. 
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          궁금하거나 도와드릴 부분이 있다면 언제든지 말씀해주세요!
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
