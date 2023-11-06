import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import useApp from '@/hooks/useApp'

export interface ChatListProps {
  isLoading: boolean,
  messages: Message[]
}

export function ChatList({ isLoading, messages }: ChatListProps) {
  const {messagesLength, switchState, setSwitchState, setMessagesLength, switchOn} = useApp()
  if (!messages.length) {
    return <></>
  } else {
    if(switchOn) {
      console.log('messagesLenght', messagesLength)
      console.log('switchstate', switchState)
      if(messagesLength >= switchState.length) {
        const newSwitchState = switchState
        newSwitchState[messagesLength+1] = 'unchecked'
        setSwitchState(newSwitchState)
      }
    }
    setMessagesLength(messages.length);
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} index={index}/>
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
      {
        isLoading && 
        <div>
          <ChatMessage 
            index={-1}
            message={
              {id: '1',
              createdAt: new Date(),
              content: '...',
              role: 'assistant'
            }
          } />
          <Separator className="my-4 md:my-8" />
        </div>
        }
    </div>
  )
}
