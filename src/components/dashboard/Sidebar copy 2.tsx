"use client"
import { 
  Briefcase, 
  FileText, 
  MessageSquare,
  Settings,
  Plus,
  Bell,
  Mail,
  Search,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  LayoutDashboard,
  Heart,
  ChevronLeft,
  Star,
  Handshake,
  ShoppingBag,
  ClipboardList,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useUser } from "@/hooks/use-user"
import React from "react"
import { motion } from "framer-motion"

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOnline, setIsOnline] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const { isClient, toggleRole } = useUser()

  // Verifica conexão
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Itens dinâmicos baseados no tipo de usuário
  const CLIENT_ITEMS = [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard className="w-4 h-4" />, 
      href: "/dashboard",
      badge: null
    },
    { 
      name: "Meus Projetos", 
      icon: <Briefcase className="w-4 h-4" />, 
      href: "/dashboard/client/projects",
      badge: <Badge variant="default" className="ml-auto">3</Badge>
    },
    { 
      name: "Propostas", 
      icon: <FileText className="w-4 h-4" />, 
      href: "/dashboard/client/proposals",
      badge: <Badge variant="destructive" className="ml-auto">5</Badge>
    },
    { 
      name: "Freelancers Favoritos", 
      icon: <Heart className="w-4 h-4 text-red-500" />, 
      href: "/saved",
      badge: null
    },
    { 
      name: "Reviews", 
      icon: <Star className="w-4 h-4" />, 
      href: "/dashboard/client/reviews",
      badge: <Badge variant="default" className="ml-auto">2</Badge>
    },
  ]

  const FREELANCER_ITEMS = [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard className="w-4 h-4" />, 
      href: "/dashboard",
      badge: null
    },
    { 
      name: "Orders", 
      icon: <ShoppingBag className="w-4 h-4" />, 
      href: "/dashboard/freelancer/orders",
      badge: null
    },
    { 
      name: "Projects", 
      icon: <ClipboardList className="w-4 h-4" />, 
      href: "/dashboard/freelancer/projects",
      badge: <Badge variant="default" className="ml-auto">2</Badge>
    },
    { 
      name: "Portfólio", 
      icon: <BookOpen className="w-4 h-4" />, 
      href: "/dashboard/portfolio",
      badge: null
    },
    { 
      name: "Proposals", 
      icon: <FileText className="w-4 h-4" />, 
      href: "/dashboard/freelancer/proposals",
      badge: <Badge variant="default" className="ml-auto">2</Badge>
    },
    { 
      name: "Reviews", 
      icon: <Star className="w-4 h-4" />, 
      href: "/dashboard/freelancer/reviews",
      badge: <Badge variant="default" className="ml-auto">2</Badge>
    },
  ]

  const COMMON_ITEMS = [
    /*{ 
      name: "Mensagens", 
      icon: <MessageSquare className="w-4 h-4" />, 
      href: "/dashboard/messages",
      badge: <Badge variant="default" className="ml-auto">12</Badge>
    },*/
    { 
      name: "Configurações", 
      icon: <Settings className="w-4 h-4" />, 
      href: "/dashboard/settings",
      badge: null
    },
  ]


  const quickActions = isClient 
    ? [
        { name: "Novo Projeto", icon: <Plus className="w-4 h-4" />, href: "/projects/new" },
        { name: "Buscar Freelancers", icon: <Search className="w-4 h-4" />, href: "/find" },
      ]
    : [
        { name: "Procurar Projetos", icon: <Search className="w-4 h-4" />, href: "/find-jobs" },
        { name: "Atualizar Portfólio", icon: <Plus className="w-4 h-4" />, href: "/portfolio/edit" },
      ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderMenuItem = (item: any) => (
    <Link
      key={item.href}
      href={item.href}
      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
        pathname === item.href
          ? 'bg-primary/10 text-primary font-medium'
          : 'hover:bg-muted'
      }`}
    >
      {item.icon}
      {!collapsed && <span>{item.name}</span>}
      {item.badge && !collapsed && item.badge}
    </Link>
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCollapsedIcon = (item: any) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={item.href} className="p-2 flex justify-center hover:bg-muted rounded-md">
          {item.icon}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{item.name}</p>
        {item.badge && React.cloneElement(item.badge, { className: 'ml-1' })}
      </TooltipContent>
    </Tooltip>
  )

  return (
    <aside className={`${collapsed ? 'w-[60px]' : 'w-[250px]'} bg-background border-r flex flex-col h-screen transition-all duration-300 sticky top-0`}>
      {/* Cabeçalho */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          {collapsed ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(false)}
              className="mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 select-none">
                  <div className="relative w-8 h-8">
                    <div className="hexagon bg-gradient-to-br from-blue-500 to-indigo-700">
                      <Handshake className="w-4 h-4 text-white" strokeWidth={2.2} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Button>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 select-none">
                  <div className="relative w-8 h-8">
                    <div className="hexagon bg-gradient-to-br from-blue-500 to-indigo-700">
                      <Handshake className="w-4 h-4 text-white" strokeWidth={2.2} />
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600"></span>Ready<span className="font-light">Doer</span>
                  </span>
                </div>
              </motion.div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setCollapsed(true)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Notificações */}
        <div className={`flex ${collapsed ? 'flex-col gap-2' : 'gap-2'} mb-2`}>
          {collapsed ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={'/dashbord/notifications'}>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="w-4 h-4" />
                      <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[8px]">3</Badge>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Notificações</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={'/dashbord/messages'}>
                    <Button variant="outline" size="icon" className="relative">
                      <Mail className="w-4 h-4" />
                      <Badge variant="default" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[8px]">5</Badge>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Mensagens</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <Button variant="outline" className="relative flex-1">
                <Bell className="w-4 h-4 mr-2" />
                Notificações
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              <Button variant="outline" className="relative flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Mensagens
                <Badge variant="default" className="ml-2">5</Badge>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Menu principal */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Ações rápidas */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Ações Rápidas
            </h3>
          )}
          <div className={`space-y-1 ${collapsed ? 'flex flex-col items-center' : ''}`}>
            {quickActions.map((action) => 
              collapsed ? renderCollapsedIcon(action) : (
                <Button 
                  key={action.href}
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  asChild
                >
                  <Link href={action.href}>
                    {action.icon}
                    {action.name}
                  </Link>
                </Button>
              )
            )}
          </div>
        </div>
        {/* Menu Principal */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Menu Principal
            </h3>
          )}
          <nav className={`space-y-1 ${collapsed ? 'flex flex-col items-center' : ''}`}>
            {(isClient ? CLIENT_ITEMS : FREELANCER_ITEMS).map((item) => 
              collapsed ? renderCollapsedIcon(item) : renderMenuItem(item)
            )}
          </nav>
        </div>


        {/* Itens Comuns */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Geral
            </h3>
          )}
          <nav className={`space-y-1 ${collapsed ? 'flex flex-col items-center' : ''}`}>
            {COMMON_ITEMS.map((item) => 
              collapsed ? renderCollapsedIcon(item) : renderMenuItem(item)
            )}
          </nav>
        </div>
      </div>

      {/* Rodapé com usuário */}
      <div className="p-4 border-t">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/user-avatar.jpg" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isClient ? 'Cliente' : 'Freelancer'}</p>
                <p className="text-muted-foreground">user@readydoer.com</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  {isOnline ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isOnline ? 'Online' : 'Offline'}</p>
              </TooltipContent>
            </Tooltip>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                toggleRole();
                setTheme(theme === "dark" ? "light" : "dark")
              }}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/user-avatar.jpg" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">
                {isClient ? 'Cliente' : 'Freelancer'} • {isOnline ? (
                  <span className="text-green-500">Online</span>
                ) : (
                  <span className="text-red-500">Offline</span>
                )}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}