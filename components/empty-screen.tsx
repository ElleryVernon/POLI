import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: '내 제품에 대한 큐시트를 작성해줘.',
    message: `내 제품은 '드러머 원형 접시 플레이트 500ml'야. 장점은 '가벼우면서도 튼튼한 내구성', '좋은 가성비', '열에 강한 특수 재질' , '모던하고 깔끔한 디자인' 이고 고객리뷰는 '신혼 그릇 세트로 추천', '스크래치에 강한 내구성' 등이 있어. 주요 특징은 '겹겹히 쌓기 좋은 형태', '모던한 디자인', '음식 온도를 오래 유지' 등이 있어.`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          안녕하세요! 래빗라이브 큐시트 AI 입니다!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          도와드릴 일이 있다면 언제든지 말씀해주세요!
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
