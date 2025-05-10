'use client'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ChevronDown, MessageSquare, Check, X, Star, ChevronUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'archived'

interface Client {
  name: string
  avatar: string
  rating: number
  online?: boolean
}

interface Order {
  id: string
  client: Client
  project: string
  budget: number // Alterado para number para facilitar filtros
  deadline: number // Alterado para number (dias)
  status: OrderStatus
  message: string
  createdAt: Date
}

const initialOrders: Order[] = [
  {
    id: '1',
    client: {
      name: 'Acme Inc',
      avatar: '/clients/1.jpg',
      rating: 4.8,
      online: true
    },
    project: 'Desenvolvimento de Landing Page',
    budget: 3500,
    deadline: 15,
    status: 'pending',
    message: 'Gostamos do seu portfólio e gostaríamos de discutir este projeto.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 horas atrás
  },
  {
    id: '2',
    client: {
      name: 'Startup XYZ',
      avatar: '/clients/2.jpg',
      rating: 4.5,
      online: false
    },
    project: 'Design de Interface Mobile',
    budget: 2800,
    deadline: 10,
    status: 'accepted',
    message: 'Precisamos de um designer para nosso novo aplicativo.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 dia atrás
  },
  {
    id: '3',
    client: {
      name: 'Tech Solutions',
      avatar: '/clients/3.jpg',
      rating: 4.9,
      online: true
    },
    project: 'Sistema de Gerenciamento',
    budget: 8200,
    deadline: 30,
    status: 'pending',
    message: 'Temos um projeto complexo que parece se alinhar com suas habilidades.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 horas atrás
  },
  {
    id: '4',
    client: {
      name: 'Design Masters',
      avatar: '/clients/4.jpg',
      rating: 4.2,
      online: false
    },
    project: 'Redesign de Logo',
    budget: 1200,
    deadline: 7,
    status: 'pending',
    message: 'Precisamos atualizar nossa identidade visual.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 dias atrás
  },
  {
    id: '5',
    client: {
      name: 'Digital Agency',
      avatar: '/clients/5.jpg',
      rating: 4.7,
      online: true
    },
    project: 'Campanha de Marketing',
    budget: 5500,
    deadline: 20,
    status: 'rejected',
    message: 'Buscamos um profissional para nossa nova campanha.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 dias atrás
  }
]

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'accepted', label: 'Aceitos' },
  { value: 'rejected', label: 'Recusados' },
  { value: 'archived', label: 'Arquivados' }
]

const dateOptions = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: 'all', label: 'Todo o período' }
]

const quickMessages = [
  "Obrigado pelo interesse! Vamos analisar sua proposta e retornamos em breve.",
  "Podemos agendar uma call para discutir os detalhes?",
  "Esse projeto parece interessante! Você tem um briefing mais detalhado?",
  "Infelizmente não poderei aceitar esse projeto no momento."
]

interface Filters {
  minBudget: number | null
  maxBudget: number | null
  maxDeadline: number | null
  minRating: number | null
  dateRange: string
  clientOnline: boolean | null
}

export default function FreelancerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [quickMessage, setQuickMessage] = useState('')
  const [showMessageInput, setShowMessageInput] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    minBudget: null,
    maxBudget: null,
    maxDeadline: null,
    minRating: null,
    dateRange: 'all',
    clientOnline: null
  })

  // Calcula os valores mínimos e máximos para os filtros
  const { minBudget, maxBudget, minDeadline, maxDeadline } = useMemo(() => {
    const budgets = orders.map(order => order.budget)
    const deadlines = orders.map(order => order.deadline)
    return {
      minBudget: Math.min(...budgets),
      maxBudget: Math.max(...budgets),
      minDeadline: Math.min(...deadlines),
      maxDeadline: Math.max(...deadlines)
    }
  }, [orders])

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Filtro de busca
      const matchesSearch = 
        order.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.message.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Filtro de status
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      
      // Filtros avançados
      const matchesBudget = 
        (filters.minBudget === null || order.budget >= filters.minBudget) &&
        (filters.maxBudget === null || order.budget <= filters.maxBudget)
      
      const matchesDeadline = 
        filters.maxDeadline === null || order.deadline <= filters.maxDeadline
      
      const matchesRating = 
        filters.minRating === null || order.client.rating >= filters.minRating
      
      const matchesDateRange = 
        filters.dateRange === 'all' || 
        (new Date().getTime() - order.createdAt.getTime()) <= parseInt(filters.dateRange) * 24 * 60 * 60 * 1000
      
      const matchesOnlineStatus = 
        filters.clientOnline === null || order.client.online === filters.clientOnline
      
      return (
        matchesSearch &&
        matchesStatus &&
        matchesBudget &&
        matchesDeadline &&
        matchesRating &&
        matchesDateRange &&
        matchesOnlineStatus
      )
    })
  }, [orders, searchTerm, statusFilter, filters])

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ))
    toast.success('Pedido aceito com sucesso!')
  }

  const handleRejectOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ))
    toast.error('Pedido recusado')
  }

  const handleArchiveOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'archived' } : order
    ))
    toast('Pedido arquivado')
  }

  const handleSendQuickMessage = () => {
    if (!quickMessage.trim()) return
    toast.success('Mensagem enviada ao cliente!')
    setQuickMessage('')
    setShowMessageInput(false)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'} atrás`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'} atrás`
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const handleFilterChange = (field: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      minBudget: null,
      maxBudget: null,
      maxDeadline: null,
      minRating: null,
      dateRange: 'all',
      clientOnline: null
    })
    setStatusFilter('all')
    setSearchTerm('')
  }

  const applyFilters = () => {
    setShowFilters(false)
    toast('Filtros aplicados com sucesso!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pedidos de Serviço</h1>
        <p className="text-muted-foreground">
          Solicitações recebidas diretamente do seu portfólio
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar pedidos..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onSelect={() => setStatusFilter('all')}>
                Todos os pedidos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {statusOptions.slice(1).map(option => (
                <DropdownMenuItem 
                  key={option.value} 
                  onSelect={() => setStatusFilter(option.value as OrderStatus)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {showFilters && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filtro de Orçamento */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Orçamento</label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Mínimo" 
                    type="number" 
                    value={filters.minBudget || ''}
                    onChange={(e) => handleFilterChange('minBudget', e.target.value ? Number(e.target.value) : null)}
                    min={0}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input 
                    placeholder="Máximo" 
                    type="number" 
                    value={filters.maxBudget || ''}
                    onChange={(e) => handleFilterChange('maxBudget', e.target.value ? Number(e.target.value) : null)}
                    min={0}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatCurrency(minBudget)}</span>
                  <span>{formatCurrency(maxBudget)}</span>
                </div>
              </div>

              {/* Filtro de Prazo */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Prazo máximo (dias)</label>
                <Input 
                  type="number" 
                  placeholder="Número de dias"
                  value={filters.maxDeadline || ''}
                  onChange={(e) => handleFilterChange('maxDeadline', e.target.value ? Number(e.target.value) : null)}
                  min={1}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>1 dia</span>
                  <span>{maxDeadline} dias</span>
                </div>
              </div>

              {/* Filtro de Avaliação */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Avaliação mínima</label>
                <Slider 
                  defaultValue={[0]}
                  max={5}
                  min={0}
                  step={0.1}
                  value={[filters.minRating || 0]}
                  onValueChange={(value) => handleFilterChange('minRating', value[0])}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span className="flex items-center gap-1">
                    {filters.minRating?.toFixed(1) || 'Qualquer'}
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  </span>
                  <span>5</span>
                </div>
              </div>

              {/* Filtro de Data */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Período</label>
                <Select 
                  value={filters.dateRange}
                  onValueChange={(value) => handleFilterChange('dateRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro de Status Online */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Status do Cliente</label>
                <Select 
                  value={filters.clientOnline === null ? 'all' : filters.clientOnline ? 'online' : 'offline'}
                  onValueChange={(value) => handleFilterChange('clientOnline', value === 'all' ? null : value === 'online')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status do cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="online">Online agora</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between gap-2 pt-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={resetFilters}
              >
                Limpar todos
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  size="sm"
                  onClick={applyFilters}
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </div>
        )}

        <Button 
          variant="ghost" 
          size="sm" 
          className="w-fit gap-2" 
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Ocultar filtros avançados
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Mostrar filtros avançados
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Search className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Nenhum pedido encontrado</p>
            <p className="text-muted-foreground text-center">
              {statusFilter === 'all' 
                ? "Não encontramos pedidos correspondentes aos filtros aplicados."
                : `Não há pedidos ${statusOptions.find(o => o.value === statusFilter)?.label?.toLowerCase()}.`}
            </p>
            <Button 
              variant="outline" 
              onClick={resetFilters}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={order.client.avatar} />
                        <AvatarFallback>{order.client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {order.client.online && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {order.client.name}
                        <div className="flex items-center gap-1 text-sm text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          {order.client.rating.toFixed(1)}
                        </div>
                      </CardTitle>
                      <p className="text-muted-foreground">{order.project}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      order.status === 'accepted' ? 'default' : 
                      order.status === 'rejected' ? 'destructive' : 'outline'
                    }
                    className={`${order.status === 'accepted' && `bg-green-600`}`}
                  >
                    {order.status === 'accepted' ? 'Aceito' : 
                     order.status === 'rejected' ? 'Recusado' : 
                     order.status === 'archived' ? 'Arquivado' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>{order.message}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{formatCurrency(order.budget)}</span>
                      <span className="text-muted-foreground">orçamento</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{order.deadline} dias</span>
                      <span className="text-muted-foreground">prazo</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-end gap-2">
                {showMessageInput && selectedOrder === order.id ? (
                  <div className="w-full space-y-2">
                    <Textarea
                      placeholder="Digite sua mensagem rápida..."
                      value={quickMessage}
                      onChange={(e) => setQuickMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex flex-wrap gap-2">
                      {quickMessages.map((msg, i) => (
                        <Button 
                          key={i} 
                          variant="outline" 
                          size="sm"
                          onClick={() => setQuickMessage(msg)}
                        >
                          {msg.substring(0, 20)}...
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setShowMessageInput(false)
                          setQuickMessage('')
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleSendQuickMessage}
                        disabled={!quickMessage.trim()}
                      >
                        Enviar Mensagem
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => {
                        setSelectedOrder(order.id)
                        setShowMessageInput(true)
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Mensagem Rápida
                    </Button>
                    {order.status === 'pending' ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectOrder(order.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Recusar
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Aceitar
                        </Button>
                      </>
                    ) : order.status === 'accepted' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleArchiveOrder(order.id)}
                      >
                        Arquivar
                      </Button>
                    ) : null}
                  </>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}