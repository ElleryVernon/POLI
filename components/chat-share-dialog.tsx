'use client'

import * as React from 'react'
import Link from 'next/link'
import { type DialogProps } from '@radix-ui/react-dialog'
import { toast } from 'react-hot-toast'

import { ServerActionResult, type Chat } from '@/lib/types'
import { cn } from '@/lib/utils'
import { badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { IconSpinner } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'

interface ChatShareDialogProps extends DialogProps {
  chat: Pick<Chat, 'id' | 'title' | 'messages'>
  shareChat: (id: string) => ServerActionResult<Chat>
  onCopy: () => void
}

export function ChatShareDialog({
  chat,
  shareChat,
  onCopy,
  ...props
}: ChatShareDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isSharePending, startShareTransition] = React.useTransition()

  const copyShareLink = React.useCallback(
    async (chat: Chat) => {
      if (!chat.sharePath) {
        return toast.error('Could not copy share link to clipboard')
      }

      const url = new URL(window.location.href)
      url.pathname = chat.sharePath
      copyToClipboard(url.toString())
      onCopy()
      toast.success('링크가 클립보드에 복사되었습니다.', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize: '14px'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      })
    },
    [copyToClipboard, onCopy]
  )

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>링크로 채팅 공유하기</DialogTitle>
          <DialogDescription>
            누구든지 URL로 채팅에 접근할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-1 text-sm border rounded-md">
          <div className="font-medium">{chat.title}</div>
          <div className="text-muted-foreground">
            {chat.messages.length} 메세지
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={isSharePending}
            onClick={() => {
              // @ts-ignore
              startShareTransition(async () => {
                const result = await shareChat(chat.id)

                if (result && 'error' in result) {
                  toast.error(result.error)
                  return
                }

                copyShareLink(result)
              })
            }}
          >
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                복사 중...
              </>
            ) : (
              <>링크 복사</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
