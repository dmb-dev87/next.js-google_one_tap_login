// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { ExternalLink } from '@/components/external-link'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconOpenAI, IconUser, IconCheck } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'
import useApp from '@/hooks/useApp'
import { useState, useEffect } from 'react'

export interface ChatMessageProps {
  message: Message,
  index: number,
}

export function ChatMessage({ message, index, ...props }: ChatMessageProps) {
  const { switchState } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 30000); // 30 seconds in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      {isLoading && index % 2 ? (<div className="px-4">Loading....</div>) :
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        
        {message.role === 'assistant' && switchState[index] === 'unchecked' &&
          <div className="px-4 w-[140px] items-center flex gap-1 border-t bg-background py-1 shadow-lg sm:rounded-xl sm:border md:py-2 md:mb-2 sm:text-sm">
          <IconCheck />
          <span>Search web </span>
          </div>
        }
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        {message.role === 'assistant' && switchState[index] === 'unchecked' &&
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
              <div className="text-gray-400">Sources:</div>
              <ExternalLink href="https://data.cityofnewyork.us">data.cityofnewyork.us</ExternalLink>
              <ExternalLink href="https://linkedin.com">linkedin.com</ExternalLink>
              <ExternalLink href="https://pinkbike.com">pinkbike.com</ExternalLink>
              <ExternalLink href="https://dictionary.com">dictionary.com</ExternalLink>
            </div>
        }
        <ChatMessageActions message={message} />
      </div>
    }
    </div>
  )
}
