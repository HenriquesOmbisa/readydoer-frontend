'use client'
import { motion } from 'framer-motion'
import { 
  Search, 
  ChevronDown, 
  MoreHorizontal, 
  Send,
  Paperclip,
  Smile,
  CircleUser,
  CheckCheck,
  ArrowLeft,
  MessageSquare
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useUser } from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

// Dados mockados (substitua por API)
const conversations = [
  {
    id: '1',
    user: {
      name: 'Carlos Freelancer',
      avatar: '/avatars/1.jpg',
      role: 'UI/UX Designer',
      online: true
    },
    lastMessage: 'Aceito o projeto! Podemos começar na segunda.',
    time: '10:30 AM',
    unread: 0
  },
  {
    id: '2',
    user: {
      name: 'Ana Client',
      avatar: '/avatars/2.jpg',
      role: 'Tech Startup',
      online: false
    },
    lastMessage: 'Precisamos ajustar o orçamento...',
    time: 'Ontem',
    unread: 2
  },
  {
    id: '3',
    user: {
      name: 'Pedro Dev',
      avatar: '/avatars/3.jpg',
      role: 'Full-Stack Developer',
      online: true
    },
    lastMessage: 'Enviei a versão atualizada do projeto',
    time: 'Terça',
    unread: 0
  }
]

const messages = [
  { id: '1', sender: 'them', text: 'Olá, gostei do seu portfólio!', time: '10:00 AM' },
  { id: '2', sender: 'them', text: 'Temos um projeto que parece perfeito para você', time: '10:02 AM' },
  { id: '3', sender: 'me', text: 'Obrigado! Qual é o projeto?', time: '10:05 AM', read: true },
  { id: '4', sender: 'them', text: 'Precisamos de um designer para nosso novo app mobile', time: '10:30 AM' },
  { id: '5', sender: 'me', text: 'Interessante! Posso ver os detalhes?', time: '10:32 AM', read: false }
]

export default function MessagesPage() {
  const { isClient } = useUser()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Lógica para enviar mensagem
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Lista de conversas (sidebar) */}
      <motion.div 
        initial={{ x: selectedConversation ? -300 : 0 }}
        animate={{ x: selectedConversation ? -300 : 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className={cn(
          "w-full md:w-80 border-r absolute md:relative z-10 bg-background h-full",
          selectedConversation && 'shadow-lg'
        )}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold flex items-center justify-between">
            Mensagens
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar conversas..." className="pl-10" />
          </div>
        </div>

        <ScrollArea className="h-[calc(100%-110px)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={cn(
                "flex items-center gap-3 p-4 border-b hover:bg-accent/50 cursor-pointer transition-colors",
                selectedConversation === conversation.id && "bg-accent"
              )}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={conversation.user.avatar} />
                  <AvatarFallback>
                    {conversation.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {conversation.user.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium truncate">{conversation.user.name}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread > 0 && (
                <Badge variant="default" className="ml-auto">
                  {conversation.unread}
                </Badge>
              )}
            </div>
          ))}
        </ScrollArea>
      </motion.div>

      {/* Área de conversa */}
      <div className="flex-1 flex flex-col h-full bg-background">
        {selectedConversation ? (
          <>
            {/* Cabeçalho da conversa */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src={conversations[0].user.avatar} />
                  <AvatarFallback>
                    {conversations[0].user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{conversations[0].user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {conversations[0].user.role}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            {/* Mensagens */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex max-w-[80%]",
                      message.sender === 'me' ? "ml-auto justify-end" : "mr-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-2 rounded-2xl",
                        message.sender === 'me'
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-accent rounded-tl-none"
                      )}
                    >
                      <p>{message.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">
                          {message.time}
                        </span>
                        {message.sender === 'me' && (
                          <CheckCheck
                            className={cn(
                              "h-3 w-3",
                              message.read ? "text-blue-400" : "text-muted-foreground"
                            )}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input de mensagem */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button 
                  variant="default" 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center p-8"
          >
            <div className="bg-accent p-6 rounded-full mb-4">
              <MessageSquare className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {isClient ? 'Converse com freelancers' : 'Responda aos clientes'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isClient
                ? 'Envie mensagens diretas para os profissionais que você deseja contratar'
                : 'Negocie detalhes do projeto e tire dúvidas com seus clientes'}
            </p>
            <Button variant="default" className="gap-2">
              <Search className="h-4 w-4" />
              {isClient ? 'Buscar Freelancers' : 'Procurar Projetos'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}