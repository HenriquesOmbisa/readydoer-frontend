"use client";

import React, { useState, useRef, useEffect } from "react";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  type: 'client' | 'freelancer';
}

interface Message {
  id: string;
  text: string;
  userId: string;
  timestamp: Date;
}

interface MessageGroup {
  date: Date;
  messages: Message[];
}

const currentUser: User = {
  id: 'user1',
  name: 'Você',
  avatar: '',
  type: 'client'
};

const freelancerUser: User = {
  id: 'user2',
  name: 'João Freelancer',
  avatar: '',
  type: 'freelancer'
};

export default function MessagesPage() {
  const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with demo data
  useEffect(() => {
    const demoMessages: Message[] = [
      {
        id: '1',
        text: 'Olá, como vai o projeto?',
        userId: freelancerUser.id,
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        text: 'Está indo bem, terminei a primeira fase!',
        userId: currentUser.id,
        timestamp: new Date(Date.now() - 1800000),
      }
    ];

    groupMessagesByDate(demoMessages);
  }, []);

  const groupMessagesByDate = (messages: Message[]) => {
    const grouped = messages.reduce((groups: Record<string, Message[]>, message) => {
      const dateStr = format(message.timestamp, 'yyyy-MM-dd');
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(message);
      return groups;
    }, {});

    const result = Object.keys(grouped).map(dateStr => ({
      date: parseISO(dateStr),
      messages: grouped[dateStr]
    })).sort((a, b) => a.date.getTime() - b.date.getTime());

    setMessageGroups(result);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageGroups]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      userId: currentUser.id,
      timestamp: new Date(),
    };

    const updatedMessages = [...(messageGroups.flatMap(group => group.messages) || []), newMsg];
    groupMessagesByDate(updatedMessages);
    
    setNewMessage('');
  };

  const formatDateHeader = (date: Date) => {
    if (isToday(date)) return 'Hoje';
    if (isYesterday(date)) return 'Ontem';
    return format(date, "PPPP", { locale: ptBR });
  };

  const getUserById = (id: string) => {
    return id === currentUser.id ? currentUser : freelancerUser;
  };

  return (
    <div className="flex h-msg bg-white">
      {/* Main content */}
      <div className="w-full flex-1 flex flex-col">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="w-full mx-auto">
            {messageGroups.length > 0 ? (
              messageGroups.map(group => (
                <div key={group.date.toString()} className="w-full mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">
                        {formatDateHeader(group.date)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full space-y-2">
                    {group.messages.map((message, index) => {
                      const user = getUserById(message.userId);
                      const isCurrentUser = user.id === currentUser.id;
                      const asTheSame = group.messages[index - 1]?.userId === user.id;
                      return (
                        <div
                          key={message.id}
                          className={`relative group w-full flex items-start gap-3 p-1 px-4 hover:bg-gray-50 rounded-md ${asTheSame && '-mt-3'}`}
                        >
                          {/* Avatar */}
                          {!asTheSame && (
                            <div className={`flex-shrink-0 pt-2`}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} />
                                <AvatarFallback className="bg-gray-600 text-white">{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>
                          )}
                          {/* Mensagem */}
                          <div className="flex-1 min-w-0">
                            {/* Header só se não for seguido */}
                            {!asTheSame && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-semibold ${isCurrentUser ? 'text-blue-600' : 'text-foreground'}`}>
                                  {user.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {format(message.timestamp, 'p', { locale: ptBR })}
                                </span>
                              </div>
                            )}
                            {/* Texto */}
                            <div className="flex items-center gap-3">
                              {asTheSame && (
                                <span className="w-8 opacity-0 duration-300 ease-in-out group-hover:opacity-100 text-xs text-gray-400">
                                  {format(message.timestamp, 'p', { locale: ptBR })}
                                </span>
                              )}
                              <p className="text-sm text-gray-700">{message.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-500">
                Nenhuma mensagem encontrada
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center">
              <input
                className="flex-1 border rounded-md px-3 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={sendMessage}
                disabled={!newMessage.trim()}
              >
                <SendHorizontal />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}