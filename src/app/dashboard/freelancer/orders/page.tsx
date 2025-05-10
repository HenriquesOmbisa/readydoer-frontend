'use client'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ChevronDown, MessageSquare, Check, X, Star, ChevronUp, ChevronRight, Clock, DollarSign, Calendar } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'archived'

interface Client {
  name: string
  avatar: string
  rating: number
  online?: boolean
  email?: string
  phone?: string
  location?: string
}

interface Order {
  id: string
  client: Client
  project: string
  budget: number
  deadline: number
  status: OrderStatus
  message: string
  createdAt: Date
  details?: string
  attachments?: { name: string; url: string }[]
}

const initialOrders: Order[] = [
  {
    id: '1',
    client: {
      name: 'Acme Inc',
      avatar: '/clients/1.jpg',
      rating: 4.8,
      online: true,
      email: 'contato@acme.com',
      phone: '(11) 99999-9999',
      location: 'São Paulo, SP'
    },
    project: 'Desenvolvimento de Landing Page',
    budget: 3500,
    deadline: 15,
    status: 'pending',
    message: 'Gostamos do seu portfólio e gostaríamos de discutir este projeto.',
    details: 'Precisamos de uma landing page para nosso novo produto. Deve incluir formulário de contato, seção de features e depoimentos. Temos o design pronto no Figma.',
    attachments: [
      { name: 'Briefing.pdf', url: '#' },
      { name: 'Wireframes.fig', url: '#' }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: '2',
    client: {
      name: 'Startup XYZ',
      avatar: '/clients/2.jpg',
      rating: 4.5,
      online: false,
      email: 'contato@startupxyz.com',
      phone: '(21) 98888-8888',
      location: 'Rio de Janeiro, RJ'
    },
    project: 'Design de Interface Mobile',
    budget: 2800,
    deadline: 10,
    status: 'accepted',
    message: 'Precisamos de um designer para nosso novo aplicativo.',
    details: 'Aplicativo de delivery de comida. Precisamos das telas principais: home, busca, carrinho e perfil. Seguir nosso style guide.',
    attachments: [
      { name: 'Style Guide.pdf', url: '#' }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: '3',
    client: {
      name: 'Tech Solutions',
      avatar: '/clients/3.jpg',
      rating: 4.9,
      online: true,
      email: 'contato@techsolutions.com',
      phone: '(31) 97777-7777',
      location: 'Belo Horizonte, MG'
    },
    project: 'Sistema de Gerenciamento',
    budget: 8200,
    deadline: 30,
    status: 'pending',
    message: 'Temos um projeto complexo que parece se alinhar com suas habilidades.',
    details: 'Sistema completo de gerenciamento de estoque com integração ERP. Backend em Node.js e frontend em React.',
    attachments: [
      { name: 'Requisitos.docx', url: '#' },
      { name: 'Diagramas.zip', url: '#' }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
  }
]

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'accepted', label: 'Aceitos' },
  { value: 'rejected', label: 'Recusados' }
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
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)

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
      const matchesSearch = 
        order.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.message.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      
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

  const openOrderDetails = (order: Order) => {
    setViewingOrder(order)
  }

  return (
    <div className="space-y-6">
      {/* Modal de Detalhes */}
      <Dialog open={!!viewingOrder} onOpenChange={(open) => !open && setViewingOrder(null)}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          {viewingOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={viewingOrder.client.avatar} />
                    <AvatarFallback>{viewingOrder.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      {viewingOrder.client.name}
                      {viewingOrder.client.online && (
                        <span className="block h-2 w-2 rounded-full bg-green-500" />
                      )}
                    </div>
                    <DialogDescription className="text-left">
                      {viewingOrder.project}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Mensagem do Cliente</h3>
                    <p className="text-muted-foreground">{viewingOrder.message}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Detalhes do Projeto</h3>
                    <p className="text-muted-foreground">
                      {viewingOrder.details || 'Nenhum detalhe adicional fornecido.'}
                    </p>
                  </div>

                  {viewingOrder.attachments && viewingOrder.attachments.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Anexos</h3>
                      <div className="space-y-2">
                        {viewingOrder.attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <FileIcon extension={file.name.split('.').pop() || ''} />
                            <a 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm hover:underline"
                            >
                              {file.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Orçamento</p>
                        <p className="font-medium">{formatCurrency(viewingOrder.budget)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Prazo</p>
                        <p className="font-medium">{viewingOrder.deadline} dias</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Recebido em</p>
                        <p className="font-medium">
                          {viewingOrder.createdAt.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Informações do Cliente</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{viewingOrder.client.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefone</p>
                        <p className="font-medium">{viewingOrder.client.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Localização</p>
                        <p className="font-medium">{viewingOrder.client.location}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="font-medium">{viewingOrder.client.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">({viewingOrder.client.online ? 'Online' : 'Offline'})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => {
                        setSelectedOrder(viewingOrder.id)
                        setShowMessageInput(true)
                        setViewingOrder(null)
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Mensagem Rápida
                    </Button>
                    {viewingOrder.status === 'pending' ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            handleRejectOrder(viewingOrder.id)
                            setViewingOrder(null)
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Recusar
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            handleAcceptOrder(viewingOrder.id)
                            setViewingOrder(null)
                          }}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Aceitar
                        </Button>
                      </>
                    ) : viewingOrder.status === 'accepted' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          handleArchiveOrder(viewingOrder.id)
                          setViewingOrder(null)
                        }}
                      >
                        Arquivar
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Conteúdo Principal */}
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
            <Button variant="outline" onClick={resetFilters}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card 
              key={order.id} 
              className="hover:shadow-sm transition-shadow"
            >
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
                  >
                    {order.status === 'accepted' ? 'Aceito' : 
                     order.status === 'rejected' ? 'Recusado' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="line-clamp-2">{order.message}</p>
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
              <CardFooter className="flex flex-wrap justify-between items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 text-muted-foreground cursor-pointer"
                  onClick={() => openOrderDetails(order)}
                >
                  Ver detalhes <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {showMessageInput && selectedOrder === order.id ? (
                    <div className="absolute right-4 bottom-4 z-10 bg-background p-4 rounded-lg shadow-lg border w-96">
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
                    </div>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedOrder(order.id)
                          setShowMessageInput(true)
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Mensagem
                      </Button>
                      {order.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRejectOrder(order.id)
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Recusar
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAcceptOrder(order.id)
                            }}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Aceitar
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

// Componente auxiliar para ícones de arquivo
function FileIcon({ extension }: { extension: string }) {
  const iconClass = "h-5 w-5"
  
  switch (extension.toLowerCase()) {
    case 'pdf':
      return <FileTextIcon className={`${iconClass} text-red-500`} />
    case 'doc':
    case 'docx':
      return <FileTextIcon className={`${iconClass} text-blue-500`} />
    case 'xls':
    case 'xlsx':
      return <FileSpreadsheetIcon className={`${iconClass} text-green-500`} />
    case 'zip':
    case 'rar':
      return <FileArchiveIcon className={`${iconClass} text-yellow-500`} />
    case 'fig':
      return <FileImageIcon className={`${iconClass} text-purple-500`} />
    default:
      return <FileTextIcon className={`${iconClass} text-gray-500`} />
  }
}

// Ícones fictícios - substitua pelos reais do seu projeto
function FileTextIcon({ className }: { className: string }) {
  return <div className={className}>📄</div>
}
function FileSpreadsheetIcon({ className }: { className: string }) {
  return <div className={className}>📊</div>
}
function FileArchiveIcon({ className }: { className: string }) {
  return <div className={className}>🗄️</div>
}
function FileImageIcon({ className }: { className: string }) {
  return <div className={className}>🖼️</div>
}