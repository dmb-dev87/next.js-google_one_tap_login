import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop, IconInfo } from '@/components/ui/icons'
import { Switch } from '@/components/ui/switch'
import { FooterText } from '@/components/footer'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useState } from 'react'
import useApp from '@/hooks/useApp'

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
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  const { switchOn, setSwitchOn, switchState, setSwitchState, messagesLength} = useApp();
  
  const handleSwitchOnClick = (e: any) => {
    // console.log('messagesLenght', messagesLength)
    // console.log('switchstate', switchState)
    setSwitchOn(e.target.dataset.state === 'unchecked')

    if(messagesLength >= switchState.length) {
      const newSwitchState = switchState
      newSwitchState[messagesLength+1] = e.target.dataset.state
      setSwitchState(newSwitchState)
    }
  }
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="px-8 w-[250px] items-center flex gap-4 border-t bg-background py-2 shadow-lg sm:rounded-xl sm:border md:py-4 md:mb-2 sm:text-sm">
          <span>Search web </span>
          <Switch onClick={handleSwitchOnClick}></Switch>
          <Tooltip>
            <TooltipTrigger className='sm:m-0'>
                <IconInfo />
            </TooltipTrigger>
            <TooltipContent className='w-[300px]'>When enabled, the model will try to complement its answer with information queried from the web</TooltipContent>
          </Tooltip>
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
