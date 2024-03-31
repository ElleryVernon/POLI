import * as React from 'react'
import { type UseChatHelpers } from 'ai/react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  title?: string
}

export function ChatStartButton() {
  //   id,
  //   title,
  //   isLoading,
  //   stop,
  //   append,
  //   reload,
  //   input,
  //   setInput,
  //   messages
  // : ChatPanelProps
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out  peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="px-4 py-2 space-y-4 sm:rounded-t-xl md:py-4">
          <Button className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow sm:border sm:px-1 h-14 shadow-none rounded-full bg-[#4E84EF] hover:bg-[#4E84EF] hover:brightness-90 transition-all font-[700]">
            시작하기
          </Button>
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
