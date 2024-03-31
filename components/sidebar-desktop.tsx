// sidebar-desktop.tsx
import { Sidebar } from '@/components/sidebar'
import { auth } from '@/auth'
import { ChatHistory } from '@/components/chat-history'

export async function SidebarDesktop() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  return (
    <Sidebar className="fixed inset-y-0 left-0 z-30 w-[250px] bg-muted duration-500 ease-in-out transform transition-transform -translate-x-full data-[state=open]:translate-x-0 hidden lg:flex lg:w-[250px]">
      <ChatHistory userId={session.user.id} />
    </Sidebar>
  )
}
