
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from './ui/sheet';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Bot, User, Loader2, SendHorizontal, Sparkles } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const welcomeMessage: Message = {
  role: 'assistant',
  content: "Hi there! I'm an AI assistant. Feel free to ask me anything about Prajwal's skills, experience, or projects.",
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat({ question: input });
      const assistantMessage: Message = { role: 'assistant', content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from the assistant. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary via-primary/80 to-accent/80 text-primary-foreground animate-pulse"
          aria-label="Open AI Chat"
        >
          <Sparkles className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>AI Assistant</SheetTitle>
          <SheetDescription>
            Ask me anything about this portfolio!
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            <div className="space-y-6 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-9 w-9 border-2 border-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5"/>
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-sm rounded-2xl px-4 py-3 text-sm shadow-md',
                      message.role === 'user'
                        ? 'rounded-br-lg bg-primary text-primary-foreground'
                        : 'rounded-bl-lg bg-secondary'
                    )}
                  >
                    <p>{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                     <Avatar className="h-9 w-9 border-2 border-muted-foreground">
                      <AvatarFallback>
                        <User className="h-5 w-5"/>
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-9 w-9 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                       <Bot className="h-5 w-5"/>
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-xs rounded-2xl px-4 py-3 text-sm rounded-bl-none bg-muted shadow-md">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <SheetFooter>
          <form onSubmit={handleSendMessage} className="flex w-full gap-2 pt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my projects..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading} className="bg-accent hover:bg-accent/90">
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
