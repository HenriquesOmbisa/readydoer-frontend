'use client'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ChevronDown, ChevronUp, ChevronRight, Star, MessageSquare, Check, X, Clock, DollarSign, Calendar, FileText, FileArchive, FileImage, FileSpreadsheet } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'archived'

interface Freelancer {
  id: string
  name: string
  avatar: string
  rating: number
  online?: boolean
  email?: string
  phone?: string
  location?: string
  skills: string[]
}

interface Proposal {
  id: string
  freelancer: Freelancer
  project: string
  projectId: string
  budget: number
  deadline: number
  status: ProposalStatus
  message: string
  details?: string
  attachments?: { name: string; url: string }[]
  createdAt: Date
}

const initialProposals: Proposal[] = [
  {
    id: '1',
    freelancer: {
      id: 'freelancer1',
      name: 'Carlos Silva',
      avatar: '/avatars/1.jpg',
      rating: 4.9,
      online: true,
      email: 'carlos@email.com',
      phone: '(11) 99999-9999',
      location: 'São Paulo, SP',
      skills: ['UI/UX Design', 'Figma', 'Web Design']
    },
    project: 'Desenvolvimento de Site Institucional',
    projectId: 'proj1',
    budget: 6500,
    deadline: 30,
    status: 'pending',
    message: 'Tenho experiência com projetos similares e posso entregar dentro do prazo estimado.',
    details: 'Posso criar um design moderno e responsivo, com foco na experiência do usuário. Já trabalhei em mais de 15 projetos similares.',
    attachments: [
      { name: 'Portfolio.pdf', url: '#' },
      { name: 'Exemplo.fig', url: '#' }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: '2',
    freelancer: {
      id: 'freelancer2',
      name: 'Ana Oliveira',
      avatar: '/avatars/2.jpg',
      rating: 4.7,
      online: false,
      email: 'ana@email.com',
      phone: '(21) 98888-8888',
      location: 'Rio de Janeiro, RJ',
      skills: ['React', 'Next.js', 'TypeScript']
    },
    project: 'Desenvolvimento de Site Institucional',
    projectId: 'proj1',
    budget: 7200,
    deadline: 25,
    status: 'pending',
    message: 'Já desenvolvi 10 sites institucionais com ótimo feedback dos clientes.',
    details: 'Especialista em Next.js e TypeScript, posso garantir um código limpo e bem documentado.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
  },
  {
    id: '3',
    freelancer: {
      id: 'freelancer3',
      name: 'João Santos',
      avatar: '/avatars/3.jpg',
      rating: 4.8,
      online: true,
      email: 'joao@email.com',
      phone: '(31) 97777-7777',
      location: 'Belo Horizonte, MG',
      skills: ['WordPress', 'PHP', 'Elementor']
    },
    project: 'Loja Virtual E-commerce',
    projectId: 'proj2',
    budget: 9000,
    deadline: 45,
    status: 'pending',
    message: 'Especialista em e-commerce com mais de 20 lojas desenvolvidas.',
    details: 'Posso criar uma loja completa com WordPress + WooCommerce, incluindo integração com pagamentos e frete.',
    attachments: [
      { name: 'Projetos_Similares.pdf', url: '#' }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  }
]

const statusOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'accepted', label: 'Aceitas' },
  { value: 'rejected', label: 'Recusadas' }
]

const dateOptions = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: 'all', label: 'Todo o período' }
]

const quickMessages = [
  "Obrigado pela proposta! Vamos analisar com cuidado e retornamos em breve.",
  "Podemos agendar uma call para discutir os detalhes?",
  "Você tem disponibilidade para uma reunião esta semana?",
  "Infelizmente não poderei aceitar esta proposta no momento."
]

interface Filters {
  minBudget: number | null
  maxBudget: number | null
  maxDeadline: number | null
  minRating: number | null
  dateRange: string
  freelancerOnline: boolean | null
  projectId: string | null
}

export default function ClientProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [quickMessage, setQuickMessage] = useState('')
  const [showMessageInput, setShowMessageInput] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    minBudget: null,
    maxBudget: null,
    maxDeadline: null,
    minRating: null,
    dateRange: 'all',
    freelancerOnline: null,
    projectId: null
  })
  const [viewingProposal, setViewingProposal] = useState<Proposal | null>(null)

  // Calcula valores mínimos e máximos para os filtros
  const { minBudget, maxBudget, minDeadline, maxDeadline } = useMemo(() => {
    const budgets = proposals.map(proposal => proposal.budget)
    const deadlines = proposals.map(proposal => proposal.deadline)
    return {
      minBudget: Math.min(...budgets),
      maxBudget: Math.max(...budgets),
      minDeadline: Math.min(...deadlines),
      maxDeadline: Math.max(...deadlines)
    }
  }, [proposals])

  // Lista de projetos únicos para filtro
  const uniqueProjects = useMemo(() => {
    const projects = new Map<string, string>()
    proposals.forEach(proposal => {
      projects.set(proposal.projectId, proposal.project)
    })
    return Array.from(projects.entries()).map(([id, name]) => ({ id, name }))
  }, [proposals])

  // Filtra as propostas
  const filteredProposals = useMemo(() => {
    return proposals.filter(proposal => {
      const matchesSearch = 
        proposal.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.freelancer.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      
      const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter
      
      const matchesBudget = 
        (filters.minBudget === null || proposal.budget >= filters.minBudget) &&
        (filters.maxBudget === null || proposal.budget <= filters.maxBudget)
      
      const matchesDeadline = 
        filters.maxDeadline === null || proposal.deadline <= filters.maxDeadline
      
      const matchesRating = 
        filters.minRating === null || proposal.freelancer.rating >= filters.minRating
      
      const matchesDateRange = 
        filters.dateRange === 'all' || 
        (new Date().getTime() - proposal.createdAt.getTime()) <= parseInt(filters.dateRange) * 24 * 60 * 60 * 1000
      
      const matchesOnlineStatus = 
        filters.freelancerOnline === null || proposal.freelancer.online === filters.freelancerOnline
      
      const matchesProject = 
        filters.projectId === null || proposal.projectId === filters.projectId
      
      return (
        matchesSearch &&
        matchesStatus &&
        matchesBudget &&
        matchesDeadline &&
        matchesRating &&
        matchesDateRange &&
        matchesOnlineStatus &&
        matchesProject
      )
    })
  }, [proposals, searchTerm, statusFilter, filters])

  // Aceita uma proposta e rejeita as outras do mesmo projeto
  const handleAcceptProposal = (proposalId: string) => {
    setProposals(prevProposals => {
      return prevProposals.map(proposal => {
        // Encontra a proposta que está sendo aceita
        if (proposal.id === proposalId) {
          return { ...proposal, status: 'accepted' }
        }
        
        // Recusa todas as outras propostas do mesmo projeto
        const acceptedProposal = prevProposals.find(p => p.id === proposalId)
        if (proposal.projectId === acceptedProposal?.projectId) {
          return { ...proposal, status: 'rejected' }
        }
        
        return proposal
      })
    })
    
    toast.success('Proposta aceita com sucesso! As outras propostas para este projeto foram automaticamente recusadas.')
    setViewingProposal(null)
  }

  const handleRejectProposal = (proposalId: string) => {
    setProposals(prevProposals =>
      prevProposals.map(proposal =>
        proposal.id === proposalId ? { ...proposal, status: 'rejected' } : proposal
      )
    )
    toast.info('Proposta recusada.')
    setViewingProposal(null)
  }

  const handleArchiveProposal = (proposalId: string) => {
    setProposals(prevProposals =>
      prevProposals.map(proposal =>
        proposal.id === proposalId ? { ...proposal, status: 'archived' } : proposal
      )
    )
    toast('Proposta arquivada')
    setViewingProposal(null)
  }

  const handleSendQuickMessage = () => {
    if (!quickMessage.trim()) return
    toast.success('Mensagem enviada ao freelancer!', {
      description: quickMessage
    })
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
      freelancerOnline: null,
      projectId: null
    })
    setStatusFilter('all')
    setSearchTerm('')
    toast.info('Filtros resetados')
  }

  const applyFilters = () => {
    setShowFilters(false)
    toast('Filtros aplicados com sucesso!')
  }

  const pendingProposalsCount = proposals.filter(p => p.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Modal de Detalhes da Proposta */}
      <Dialog open={!!viewingProposal} onOpenChange={(open) => !open && setViewingProposal(null)}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          {viewingProposal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={viewingProposal.freelancer.avatar} />
                    <AvatarFallback>{viewingProposal.freelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      {viewingProposal.freelancer.name}
                      {viewingProposal.freelancer.online && (
                        <span className="block h-2 w-2 rounded-full bg-green-500" />
                      )}
                    </div>
                    <DialogDescription className="text-left">
                      {viewingProposal.project}
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Mensagem do Freelancer</h3>
                    <p className="text-muted-foreground">{viewingProposal.message}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Detalhes da Proposta</h3>
                    <p className="text-muted-foreground">
                      {viewingProposal.details || 'Nenhum detalhe adicional fornecido.'}
                    </p>
                  </div>

                  {viewingProposal.attachments && viewingProposal.attachments.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Anexos</h3>
                      <div className="space-y-2">
                        {viewingProposal.attachments.map((file, index) => (
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
                        <p className="font-medium">{formatCurrency(viewingProposal.budget)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Prazo</p>
                        <p className="font-medium">{viewingProposal.deadline} dias</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Recebido em</p>
                        <p className="font-medium">
                          {viewingProposal.createdAt.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Informações do Freelancer</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Habilidades</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {viewingProposal.freelancer.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{viewingProposal.freelancer.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefone</p>
                        <p className="font-medium">{viewingProposal.freelancer.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Localização</p>
                        <p className="font-medium">{viewingProposal.freelancer.location}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="font-medium">{viewingProposal.freelancer.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">({viewingProposal.freelancer.online ? 'Online' : 'Offline'})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => {
                        setSelectedProposal(viewingProposal.id)
                        setShowMessageInput(true)
                        setViewingProposal(null)
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Mensagem Rápida
                    </Button>
                    {viewingProposal.status === 'pending' ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectProposal(viewingProposal.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Recusar
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAcceptProposal(viewingProposal.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Aceitar
                        </Button>
                      </>
                    ) : viewingProposal.status === 'accepted' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleArchiveProposal(viewingProposal.id)}
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

      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold">Propostas Recebidas</h1>
        <p className="text-muted-foreground">
          Avalie as propostas dos freelancers para seus projetos
          {pendingProposalsCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {pendingProposalsCount} pendente{pendingProposalsCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar propostas..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <DropdownMenuItem onSelect={() => setStatusFilter('all')}>
                Todas as propostas
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {statusOptions.slice(1).map(option => (
                <DropdownMenuItem 
                  key={option.value} 
                  onSelect={() => setStatusFilter(option.value as ProposalStatus)}
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
                <label className="block text-sm font-medium">Status do Freelancer</label>
                <Select 
                  value={filters.freelancerOnline === null ? 'all' : filters.freelancerOnline ? 'online' : 'offline'}
                  onValueChange={(value) => handleFilterChange('freelancerOnline', value === 'all' ? null : value === 'online')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status do freelancer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="online">Online agora</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro por Projeto */}
              {uniqueProjects.length > 1 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Projeto</label>
                  <Select 
                    value={filters.projectId || 'all'}
                    onValueChange={(value) => handleFilterChange('projectId', value === 'all' ? null : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os projetos</SelectItem>
                      {uniqueProjects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
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

      {/* Lista de Propostas */}
      <div className="grid gap-4">
        {filteredProposals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Search className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Nenhuma proposta encontrada</p>
            <p className="text-muted-foreground text-center">
              {statusFilter === 'all' 
                ? "Não encontramos propostas correspondentes aos filtros aplicados."
                : `Não há propostas ${statusOptions.find(o => o.value === statusFilter)?.label?.toLowerCase()}.`}
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          filteredProposals.map((proposal) => (
            <Card 
              key={proposal.id} 
              className="hover:shadow-sm transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={proposal.freelancer.avatar} />
                        <AvatarFallback>{proposal.freelancer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {proposal.freelancer.online && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {proposal.freelancer.name}
                        <div className="flex items-center gap-1 text-sm text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          {proposal.freelancer.rating.toFixed(1)}
                        </div>
                      </CardTitle>
                      <p className="text-muted-foreground">{proposal.project}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(proposal.createdAt)}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      proposal.status === 'accepted' ? 'default' : 
                      proposal.status === 'rejected' ? 'destructive' : 'outline'
                    }
                  >
                    {proposal.status === 'accepted' ? 'Aceita' : 
                     proposal.status === 'rejected' ? 'Recusada' : 'Pendente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="line-clamp-2">{proposal.message}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{formatCurrency(proposal.budget)}</span>
                      <span className="text-muted-foreground">orçamento</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{proposal.deadline} dias</span>
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
                  onClick={() => setViewingProposal(proposal)}
                >
                  Ver detalhes <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {showMessageInput && selectedProposal === proposal.id ? (
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
                          setSelectedProposal(proposal.id)
                          setShowMessageInput(true)
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Mensagem
                      </Button>
                      {proposal.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRejectProposal(proposal.id)
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Recusar
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAcceptProposal(proposal.id)
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
      return <FileText className={`${iconClass} text-red-500`} />
    case 'doc':
    case 'docx':
      return <FileText className={`${iconClass} text-blue-500`} />
    case 'xls':
    case 'xlsx':
      return <FileSpreadsheet className={`${iconClass} text-green-500`} />
    case 'zip':
    case 'rar':
      return <FileArchive className={`${iconClass} text-yellow-500`} />
    case 'fig':
      return <FileImage className={`${iconClass} text-purple-500`} />
    default:
      return <FileText className={`${iconClass} text-gray-500`} />
  }
}