'use client'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ChevronDown, ChevronUp, MessageSquare, Clock, DollarSign, Calendar, FileText, X, Edit, RefreshCw, Check, MoreVertical, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'

type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'expired' | 'negotiation' | 'cancelled'

interface Proposal {
  id: string
  project: string
  client: {
    name: string
    avatar: string
    rating: number
    email: string
    phone: string
  }
  budget: number
  status: ProposalStatus
  sentDate: Date
  deadline: number // dias
  description: string
  attachments?: { name: string; url: string }[]
  negotiationHistory?: {
    date: Date
    message: string
    sender: 'client' | 'freelancer'
  }[]
  lastUpdate?: Date
}

const proposals: Proposal[] = [
  {
    id: '1',
    project: 'Desenvolvimento de E-commerce',
    client: {
      name: 'Fashion Store',
      avatar: '/clients/1.jpg',
      rating: 4.5,
      email: 'contato@fashionstore.com',
      phone: '(11) 99999-9999'
    },
    budget: 8500,
    status: 'pending',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
    deadline: 30,
    description: 'Desenvolvimento completo de loja virtual com integração a gateways de pagamento e ERP. Inclui design responsivo e painel administrativo.',
    attachments: [
      { name: 'Especificações.pdf', url: '#' },
      { name: 'Wireframes.fig', url: '#' }
    ]
  },
  {
    id: '2',
    project: 'App de Gestão Financeira',
    client: {
      name: 'Fintech Solutions',
      avatar: '/clients/2.jpg',
      rating: 4.8,
      email: 'contato@fintech.com',
      phone: '(21) 98888-8888'
    },
    budget: 12000,
    status: 'accepted',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 dias atrás
    deadline: 45,
    description: 'Aplicativo mobile para gestão financeira pessoal com sincronização em nuvem, relatórios personalizados e categorização automática de gastos.',
    lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    negotiationHistory: [
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        message: 'Podemos aumentar o prazo para 60 dias?',
        sender: 'client'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        message: 'Concordo com o aumento de prazo, mas mantendo o valor original.',
        sender: 'freelancer'
      }
    ]
  },
  {
    id: '3',
    project: 'Redesign de Website',
    client: {
      name: 'Agência Digital',
      avatar: '/clients/3.jpg',
      rating: 4.2,
      email: 'contato@agenciadigital.com',
      phone: '(31) 97777-7777'
    },
    budget: 5200,
    status: 'rejected',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 dias atrás
    deadline: 20,
    description: 'Redesign completo do website institucional com foco em conversão, incluindo nova arquitetura de informação e elementos interativos.',
    lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 dias atrás
  },
  {
    id: '4',
    project: 'Sistema de Agendamento',
    client: {
      name: 'Clínica Médica',
      avatar: '/clients/4.jpg',
      rating: 4.7,
      email: 'contato@clinicamedica.com',
      phone: '(41) 96666-6666'
    },
    budget: 6800,
    status: 'negotiation',
    sentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
    deadline: 25,
    description: 'Sistema de agendamento online integrado ao prontuário eletrônico, com lembretes por SMS e confirmação automática.',
    lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 horas atrás
    negotiationHistory: [
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        message: 'Gostaria de incluir também um módulo de telemedicina no projeto.',
        sender: 'client'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 12),
        message: 'Podemos incluir o módulo por um adicional de R$ 2.000,00. O que acha?',
        sender: 'freelancer'
      }
    ]
  }
]

const statusOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'accepted', label: 'Aceitas' },
  { value: 'rejected', label: 'Recusadas' },
  { value: 'negotiation', label: 'Em Negociação' },
  { value: 'expired', label: 'Expiradas' },
  { value: 'cancelled', label: 'Canceladas' }
]

const dateOptions = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 3 meses' },
  { value: 'all', label: 'Todo o período' }
]

interface Filters {
  status: ProposalStatus | 'all'
  minBudget: number | null
  maxBudget: number | null
  dateRange: string
  searchTerm: string
}

export default function FreelancerProposalsPage() {
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    minBudget: null,
    maxBudget: null,
    dateRange: 'all',
    searchTerm: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [negotiationMessage, setNegotiationMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredProposals = useMemo(() => {
    return proposals.filter(proposal => {
      const matchesSearch = 
        proposal.project.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        proposal.client.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        proposal.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      
      const matchesStatus = filters.status === 'all' || proposal.status === filters.status
      
      const matchesBudget = 
        (filters.minBudget === null || proposal.budget >= filters.minBudget) &&
        (filters.maxBudget === null || proposal.budget <= filters.maxBudget)
      
      const matchesDateRange = 
        filters.dateRange === 'all' || 
        (new Date().getTime() - proposal.sentDate.getTime()) <= parseInt(filters.dateRange) * 24 * 60 * 60 * 1000
      
      return matchesSearch && matchesStatus && matchesBudget && matchesDateRange
    })
  }, [proposals, filters])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatRelativeDate = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Hoje'
    if (diffInDays === 1) return 'Ontem'
    return `${diffInDays} dias atrás`
  }

  const handleFilterChange = (field: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      status: 'all',
      minBudget: null,
      maxBudget: null,
      dateRange: 'all',
      searchTerm: ''
    })
  }

  const cancelProposal = (id: string) => {
    // Em uma aplicação real, aqui seria uma chamada à API
    toast.success('Proposta cancelada com sucesso!')
  }

  const sendNegotiationMessage = () => {
    if (!negotiationMessage.trim()) return
    
    setIsSubmitting(true)
    // Simulando envio assíncrono
    setTimeout(() => {
      toast.success('Mensagem enviada para o cliente!')
      setNegotiationMessage('')
      setIsSubmitting(false)
      setSelectedProposal(null)
    }, 1000)
  }

  const getStatusColor = (status: ProposalStatus) => {
    switch (status) {
      case 'accepted': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      case 'pending': return 'bg-yellow-500'
      case 'negotiation': return 'bg-blue-500'
      case 'expired': return 'bg-gray-500'
      case 'cancelled': return 'bg-gray-400'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Modal de Detalhes */}
      <Dialog open={!!selectedProposal} onOpenChange={(open) => !open && setSelectedProposal(null)}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedProposal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl">{selectedProposal.project}</h2>
                    <DialogDescription className="text-base">
                      Para: {selectedProposal.client.name}
                    </DialogDescription>
                  </div>
                  <Badge 
                    variant={
                      selectedProposal.status === 'accepted' ? 'default' : 
                      selectedProposal.status === 'rejected' ? 'destructive' : 
                      selectedProposal.status === 'negotiation' ? 'secondary' : 'outline'
                    }
                  >
                    {selectedProposal.status === 'accepted' ? 'Aceita' : 
                     selectedProposal.status === 'rejected' ? 'Recusada' : 
                     selectedProposal.status === 'pending' ? 'Pendente' :
                     selectedProposal.status === 'negotiation' ? 'Em Negociação' :
                     selectedProposal.status === 'expired' ? 'Expirada' : 'Cancelada'}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Descrição da Proposta</h3>
                    <p className="text-muted-foreground">{selectedProposal.description}</p>
                  </div>

                  {selectedProposal.attachments && selectedProposal.attachments.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Anexos</h3>
                      <div className="space-y-2">
                        {selectedProposal.attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <FileText className="h-5 w-5 text-muted-foreground" />
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

                  {selectedProposal.negotiationHistory && selectedProposal.negotiationHistory.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Histórico de Negociação</h3>
                      <div className="space-y-4">
                        {selectedProposal.negotiationHistory.map((item, index) => (
                          <div key={index} className={`p-3 rounded-lg ${item.sender === 'client' ? 'bg-muted/50' : 'bg-primary/10'}`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-medium">
                                {item.sender === 'client' ? selectedProposal.client.name : 'Você'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(item.date)}
                              </span>
                            </div>
                            <p className="text-sm">{item.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProposal.status === 'negotiation' && (
                    <div>
                      <h3 className="font-medium mb-2">Responder Negociação</h3>
                      <Textarea
                        placeholder="Digite sua mensagem de negociação..."
                        value={negotiationMessage}
                        onChange={(e) => setNegotiationMessage(e.target.value)}
                        className="min-h-[100px] mb-2"
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedProposal(null)}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          onClick={sendNegotiationMessage}
                          disabled={!negotiationMessage.trim() || isSubmitting}
                        >
                          {isSubmitting ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            'Enviar Mensagem'
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Detalhes da Proposta</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Valor</p>
                          <p className="font-medium">{formatCurrency(selectedProposal.budget)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Prazo</p>
                          <p className="font-medium">{selectedProposal.deadline} dias</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Enviada em</p>
                          <p className="font-medium">{formatDate(selectedProposal.sentDate)}</p>
                        </div>
                      </div>

                      {selectedProposal.lastUpdate && (
                        <div className="flex items-center gap-3">
                          <RefreshCw className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Última atualização</p>
                            <p className="font-medium">{formatRelativeDate(selectedProposal.lastUpdate)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Informações do Cliente</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedProposal.client.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefone</p>
                        <p className="font-medium">{selectedProposal.client.phone}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="font-medium">{selectedProposal.client.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Mensagem
                    </Button>
                    {selectedProposal.status === 'pending' && (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          cancelProposal(selectedProposal.id)
                          setSelectedProposal(null)
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar Proposta
                      </Button>
                    )}
                    {selectedProposal.status === 'negotiation' && (
                      <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Revisar Proposta
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Conteúdo Principal */}
      <div>
        <h1 className="text-2xl font-bold">Propostas Enviadas</h1>
        <p className="text-muted-foreground">
          Acompanhe o status das propostas que você enviou
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar propostas..." 
              className="pl-10" 
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {statusOptions.map(option => (
                <DropdownMenuItem 
                  key={option.value} 
                  onSelect={() => handleFilterChange('status', option.value as ProposalStatus | 'all')}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Faixa de Valor</label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Mínimo" 
                    type="number" 
                    value={filters.minBudget || ''}
                    onChange={(e) => handleFilterChange('minBudget', e.target.value ? Number(e.target.value) : null)}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input 
                    placeholder="Máximo" 
                    type="number" 
                    value={filters.maxBudget || ''}
                    onChange={(e) => handleFilterChange('maxBudget', e.target.value ? Number(e.target.value) : null)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Período</label>
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
            </div>

            <div className="flex justify-between gap-2 pt-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={resetFilters}
              >
                Limpar filtros
              </Button>
              <Button 
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">
            {filteredProposals.length} {filteredProposals.length === 1 ? 'proposta encontrada' : 'propostas encontradas'}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <div className="flex gap-1">
              {statusOptions.slice(1).map(option => (
                <div 
                  key={option.value} 
                  className={`h-2 w-4 rounded-full ${getStatusColor(option.value as ProposalStatus)}`}
                  title={option.label}
                />
              ))}
            </div>
          </div>
        </div>

        {filteredProposals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Search className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Nenhuma proposta encontrada</p>
            <p className="text-muted-foreground text-center">
              {filters.status === 'all' 
                ? "Não encontramos propostas correspondentes aos filtros aplicados."
                : `Não há propostas ${statusOptions.find(o => o.value === filters.status)?.label?.toLowerCase()}.`}
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProposals.map((proposal) => (
              <Card 
                key={proposal.id} 
                className="hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => setSelectedProposal(proposal)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{proposal.project}</CardTitle>
                      <p className="text-muted-foreground">Para: {proposal.client.name}</p>
                    </div>
                    <Badge 
                      variant={
                        proposal.status === 'accepted' ? 'default' : 
                        proposal.status === 'rejected' ? 'destructive' : 
                        proposal.status === 'negotiation' ? 'secondary' : 'outline'
                      }
                    >
                      {proposal.status === 'accepted' ? 'Aceita' : 
                       proposal.status === 'rejected' ? 'Recusada' : 
                       proposal.status === 'pending' ? 'Pendente' :
                       proposal.status === 'negotiation' ? 'Em Negociação' :
                       proposal.status === 'expired' ? 'Expirada' : 'Cancelada'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{formatCurrency(proposal.budget)}</span>
                      <span className="text-muted-foreground">orçamento</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{proposal.deadline} dias</span>
                      <span className="text-muted-foreground">prazo</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Enviada em</span>
                      <span className="font-medium">{formatDate(proposal.sentDate)}</span>
                    </div>
                    {proposal.lastUpdate && (
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Atualizada</span>
                        <span className="font-medium">{formatRelativeDate(proposal.lastUpdate)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-muted-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProposal(proposal)
                    }}
                  >
                    Ver detalhes
                  </Button>
                  
                  {proposal.status === 'pending' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            cancelProposal(proposal.id)
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancelar Proposta
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}