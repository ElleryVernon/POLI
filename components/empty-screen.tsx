import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import Image from 'next/image'

const exampleMessages = [
  {
    title: '만능 진술서 도우미',
    paragraph: '진술서 편하게 작성하고 싶은데 도와줘.',
    message: `로맨스 스캠에 대해 자세히 알려주세요.`,
    svgPath: '/icons/icon-pen-default.svg'
  },
  {
    title: '나만의 방안 가이드',
    paragraph: '내 사건에 적절한 대처 방안을 알려줘.',
    message: `사이버 범죄의 신고 절차에 대해 자세히 알려주세요.`,
    svgPath: '/icons/icon-check-default.svg'
  },
  {
    title: '유능한 사례 · 판례 콜렉터',
    paragraph: '내 사건과 유사한 판례가 있어?',
    message: `사이버 범죄의 신고 절차에 대해 자세히 알려주세요.`,
    svgPath: '/icons/icon-box-default.svg'
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-4xl px-4 md:pl-[72px]">
      <div className="rounded-xl p-8">
        <div className="flex items-center">
          <Image
            src={'/icons/logo-large.svg'}
            alt={'Service Logo'}
            width={52}
            height={52}
            className="mb-5 mt-24 mr-4"
          />
          <h1 className="mb-5 text-6xl font-bold mt-24">POLI</h1>
        </div>
        <p className="text-lg leading-normal text-muted-foreground text-neutral-800 font-[400]">
          사이버범죄 대처의 모든 것 <span className="font-bold">POLI</span>
          에게 물어보세요.
        </p>
        <p className="leading-normal text-lg text-muted-foreground text-neutral-800 font-[400] mb-28">
          대처 상담부터 진술서 작성까지 한 번에 이루어집니다.
        </p>
        <div className="flex mt-2 space-x-5">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto px-5 py-8 rounded-[20px] text-base flex flex-col max-w-[200px] items-start text-start bg-[#F0F4F8] hover:bg-[#DDE3EA] border-[1px] hover:no-underline"
              onClick={() => setInput(message.message)}
            >
              <Image
                src={message.svgPath}
                alt={message.title}
                width={40}
                height={40}
              />
              <p className="text-[13px] text-neutral-700 text-start mt-6">
                {message.title}
              </p>
              <p className="font-semibold text-[15px] mt-1">
                {message.paragraph}
              </p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
