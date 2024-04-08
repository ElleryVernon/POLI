import { UseChatHelpers } from 'ai/react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ButtonScrollToBottom } from './button-scroll-to-bottom'
import { FooterText } from './footer'
import { useState } from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { usePathname, useRouter } from 'next/navigation'

export interface EmptyScreenProps
  extends Pick<UseChatHelpers, 'append' | 'setInput'> {
  id?: string
}

const exampleMessages = [
  {
    title: '만능 진술서 도우미',
    paragraph: '진술서 편하게 작성하고 싶은데 도와줘.',
    message: `진술서 편하게 작성하고 싶은데 도와줘`,
    svgPath: '/icons/icon-pen-default.svg'
  },
  {
    title: '나만의 방안 가이드',
    paragraph: '내 사건에 적절한 대처 방안을 알려줘.',
    message: `내 사건에 적절한 대처 방안을 알려줘.`,
    svgPath: '/icons/icon-check-default.svg'
  },
  {
    title: '유능한 사례 · 판례 콜렉터',
    paragraph: '내 사건과 유사한 판례가 있어?',
    message: `내 사건과 유사한 판례가 있어?`,
    svgPath: '/icons/icon-box-default.svg'
  }
]

export function EmptyScreen({ setInput, append, id }: EmptyScreenProps) {
  const { isSidebarOpen, isLoading: sidebarLoading } = useSidebar()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleButtonClick = (index: number, message: string) => {
    if (index === selectedIndex) {
      return setSelectedIndex(null)
    }
    setSelectedIndex(index)
    setInput(message)
    setIsModalOpen(true)
  }

  const handleStartClick = () => {
    setIsModalOpen(true)
  }

  const [textareaValue, setTextareaValue] = useState('')
  const [locationText, setLocationText] = useState('')
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  // const [selectedDate, setSelectedDate] = useState<Date | Date[] | undefined>(
  //   undefined
  // )
  const [selectedTime, setSelectedTime] = useState('09:00')

  const times = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minute}`
  })

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length > 1000) {
      return setTextareaValue(event.target.value.slice(0, 1000))
    }
    setTextareaValue(event.target.value)
  }
  const locationTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 50) {
      return setLocationText(event.target.value.slice(0, 50))
    }
    setLocationText(event.target.value)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 md:pl-[72px]">
        <div className="rounded-xl p-8">
          {!isModalOpen ? (
            <>
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
              <p className="text-lg leading-normal text-neutral-800 font-[400]">
                사이버범죄 대처의 모든 것{' '}
                <span className="font-bold">POLI</span> 에게 물어보세요.
              </p>
              <p className="leading-normal text-lg text-neutral-800 font-[400] mb-28">
                대처 상담부터 진술서 작성까지 한 번에 이루어집니다.
              </p>
              <div className="flex mt-2 space-x-5">
                {exampleMessages.map((message, index) => (
                  <Button
                    key={index}
                    variant="link"
                    className={`h-auto px-5 py-8 rounded-[20px] text-base flex flex-col max-w-[200px] items-start text-start border-[1px] hover:no-underline ${
                      selectedIndex === index
                        ? 'bg-[#DDE3EA]'
                        : 'bg-[#F0F4F8] hover:bg-[#DDE3EA]'
                    }`}
                    onClick={() => handleButtonClick(index, message.message)}
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
            </>
          ) : (
            <div className="flex flex-col items-center px-4 md:pr-[120px] mt-12">
              <div className="space-y-8">
                <div className="flex items-center">
                  <Image
                    src={'/icons/logo-large.svg'}
                    alt={'Service Logo'}
                    width={28}
                    height={28}
                    className="mr-2 mb-[2px]"
                  />
                  <h3 className="font-bold text-2xl">
                    상담을 시작하기에 앞서, 사건에 대한 정보를 입력해 주세요.
                  </h3>
                </div>
                <div>
                  <div className="flex">
                    <h3 className="pr-1 font-bold">피해 장소 |</h3>
                    <p>
                      어디에서 피해를 겪으셨나요? 피해를 당하신 SNS, 혹은 사이트
                      명을 입력해 주세요.
                    </p>
                  </div>
                  <input
                    type="text"
                    value={locationText}
                    onChange={locationTextChange}
                    placeholder="ex) 당근마켓, 중고나라"
                    className="bg-gray-100 p-2 px-4 focus:outline-none rounded-lg border border-gray-300 mt-3 font-semibold"
                  />
                </div>
                {/* <div>
                  <div className="flex">
                    <h3 className="pr-1 font-bold">피해 일자 |</h3>
                    <p>언제 피해를 겪으셨나요? 날짜와 시간을 선택해 주세요.</p>
                  </div>
                  <div className="flex space-x-4 mt-3">
                    <Calendar
                      value={selectedDate}
                      onChange={setSelectedDate}
                      className="bg-gray-100 rounded-lg border border-gray-300 font-semibold"
                    />
                    <Select.Root
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                    >
                      <Select.Trigger className="bg-gray-100 p-2 px-4 rounded-lg border border-gray-300 font-semibold w-[180px] flex items-center justify-between">
                        <Select.Value placeholder="시간 선택" />
                        <Select.Icon>
                          <ChevronDownIcon />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-lg shadow-lg p-2">
                          <Select.Viewport>
                            <Select.Group>
                              <Select.Label className="text-gray-500 font-semibold mb-2">
                                시간
                              </Select.Label>
                              {times.map(time => (
                                <Select.Item
                                  key={time}
                                  value={time}
                                  className="px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                                >
                                  <Select.ItemText>{time}</Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.Group>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                </div> */}
                <div>
                  <div className="flex">
                    <h3 className="pr-1 font-bold">피해 상세 상황 |</h3>
                    <p>어떤 상황이고 어떤 부분이 고민되는지 설명해 주세요.</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <textarea
                      cols={40}
                      rows={5}
                      className="bg-gray-100 p-2 px-4 focus:outline-none rounded-lg border border-gray-300 mt-3 font-semibold w-full h-40"
                      placeholder="일자, 시간, 피해 상황등을 자세히 적어주세요"
                      style={{ resize: 'none' }}
                      value={textareaValue}
                      onChange={handleTextareaChange}
                    />
                    <p className="text-sm text-gray-400 font-semibold mt-0.5">
                      {textareaValue.length}/1000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 w-full animate-in ease-in-out  peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] transition-[margin] duration-500 bg-white',
          isSidebarOpen && !sidebarLoading ? 'lg:ml-[120px]' : 'ml-0'
        )}
      >
        <ButtonScrollToBottom />
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="px-4 py-2 space-y-4 sm:rounded-t-xl md:py-4">
            {!isModalOpen ? (
              <Button
                className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow sm:border sm:px-1 h-14 shadow-none rounded-full bg-[#4E84EF] hover:bg-[#4E84EF] hover:brightness-90 transition-all font-[700]"
                onClick={handleStartClick}
              >
                시작하기
              </Button>
            ) : (
              <Button
                disabled={!locationText.length || !textareaValue.length}
                className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow sm:border sm:px-1 h-14 shadow-none rounded-full bg-[#4E84EF] hover:bg-[#4E84EF] hover:brightness-90 transition-all font-[700]"
                onClick={async () => {
                  await append({
                    id,
                    content: `${
                      exampleMessages[selectedIndex || 1].message
                    }\n###사건정보:\n피해장소: ${locationText}\n피해상황: ${textareaValue}###`,
                    role: 'user'
                  })
                }}
              >
                상담시작
              </Button>
            )}

            <FooterText className="hidden sm:block" />
          </div>
        </div>
      </div>
    </>
  )
}
