'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ChevronDown, ChevronUp, Clock, CheckCheck, FileText, Calendar, DollarSign, CircleSlash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'

type ProjectStatus = 'active' | 'completed' | 'paused' | 'all'

interface Project {
  id: string
  title: string
  client: string
  progress: number
  deadline: string
  daysRemaining?: number
  budget: number
  status: 'active' | 'completed' | 'paused'
  startDate: Date
  category: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Desenvolvimento de E-commerce',
    client: 'Fashion Store',
    progress: 65,
    deadline: '15/08/2023',
    daysRemaining: 15,
    budget: 8500,
    status: 'active',
    startDate: new Date('2023-06-01'),
    category: 'Desenvolvimento Web'
  },
  {
    id: '2',
    title: 'App de Gestão Financeira',
    client: 'Fintech Solutions',
    progress: 30,
    deadline: '30/09/2023',
    daysRemaining: 30,
    budget: 12000,
    status: 'active',
    startDate: new Date('2023-07-15'),
    category: 'Desenvolvimento Mobile'
  },
  {
    id: '3',
    title: 'Redesign de Website',
    client: 'Agência Digital',
    progress: 100,
    deadline: '01/07/2023',
    budget: 5200,
    status: 'completed',
    startDate: new Date('2023-05-01'),
    category: 'Design'
  },
  {
    id: '4',
    title: 'Sistema de Agendamento',
    client: 'Clínica Médica',
    progress: 45,
    deadline: '20/09/2023',
    daysRemaining: 45,
    budget: 6800,
    status: 'active',
    startDate: new Date('2023-06-10'),
    category: 'Desenvolvimento Web'
  },
  {
    id: '5',
    title: 'Campanha de Marketing Digital',
    client: 'Startup Tech',
    progress: 80,
    deadline: '10/08/2023',
    daysRemaining: 10,
    budget: 9500,
    status: 'active',
    startDate: new Date('2023-05-20'),
    category: 'Marketing'
  },
  {
    id: '6',
    title: 'Consultoria em UX',
    client: 'Empresa X',
    progress: 100,
    deadline: '15/06/2023',
    budget: 3500,
    status: 'completed',
    startDate: new Date('2023-04-01'),
    category: 'Design'
  },
  {
    id: '7',
    title: 'Integração de API',
    client: 'SaaS Platform',
    progress: 0,
    deadline: '30/10/2023',
    daysRemaining: 90,
    budget: 4200,
    status: 'paused',
    startDate: new Date('2023-08-01'),
    category: 'Desenvolvimento Web'
  }
]

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'completed', label: 'Concluídos' },
  { value: 'paused', label: 'Pausados' }
]

const categoryOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'Desenvolvimento Web', label: 'Desenvolvimento Web' },
  { value: 'Desenvolvimento Mobile', label: 'Desenvolvimento Mobile' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' }
]

const timeRangeOptions = [
  { value: 'all', label: 'Todo período' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 3 meses' },
  { value: '365', label: 'Último ano' }
]

export default function FreelancerProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [timeRangeFilter, setTimeRangeFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 20000])

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter
      
      const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter
      
      const matchesBudget = 
        project.budget >= budgetRange[0] && 
        project.budget <= budgetRange[1]
      
      const matchesTimeRange = 
        timeRangeFilter === 'all' ||
        (new Date().getTime() - project.startDate.getTime()) <= parseInt(timeRangeFilter) * 24 * 60 * 60 * 1000
      
      return matchesSearch && matchesStatus && matchesCategory && matchesBudget && matchesTimeRange
    })
  }, [searchTerm, statusFilter, categoryFilter, timeRangeFilter, budgetRange])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/')
    return new Date(`${year}-${month}-${day}`).toLocaleDateString('pt-BR')
  }

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'active': return <Badge variant="default">Em andamento</Badge>
      case 'completed': return <Badge variant="secondary">Concluído</Badge>
      case 'paused': return <Badge variant="outline">Pausado</Badge>
      default: return <Badge>Desconhecido</Badge>
    }
  }

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setCategoryFilter('all')
    setTimeRangeFilter('all')
    setBudgetRange([0, 20000])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meus Projetos</h1>
        <p className="text-muted-foreground">
          Projetos em andamento e concluídos
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar projetos..." 
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
              {statusOptions.map(option => (
                <DropdownMenuItem 
                  key={option.value} 
                  onSelect={() => setStatusFilter(option.value as ProjectStatus)}
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
            {showFilters ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <Select 
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Período</label>
                <Select 
                  value={timeRangeFilter}
                  onValueChange={setTimeRangeFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRangeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Faixa de Orçamento</label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Mínimo" 
                    type="number" 
                    value={budgetRange[0]}
                    onChange={(e) => setBudgetRange([Number(e.target.value), budgetRange[1]])}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input 
                    placeholder="Máximo" 
                    type="number" 
                    value={budgetRange[1]}
                    onChange={(e) => setBudgetRange([budgetRange[0], Number(e.target.value)])}
                  />
                </div>
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
            {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
          </h3>
          <div className="text-sm text-muted-foreground">
            Ordenar por: <span className="font-medium">Mais recente</span>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <CircleSlash className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Nenhum projeto encontrado</p>
            <p className="text-muted-foreground text-center">
              {statusFilter === 'all' 
                ? "Não encontramos projetos correspondentes aos filtros aplicados."
                : `Não há projetos ${statusOptions.find(o => o.value === statusFilter)?.label?.toLowerCase()}.`}
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-sm transition-shadow h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                      <p className="text-muted-foreground line-clamp-1">Cliente: {project.client}</p>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Orçamento</span>
                      </div>
                      <p className="font-medium">{formatCurrency(project.budget)}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Prazo</span>
                      </div>
                      <p className="font-medium">{formatDate(project.deadline)}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        {project.status === 'completed' ? (
                          <CheckCheck className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                        <span>Status</span>
                      </div>
                      <p className="font-medium">
                        {project.status === 'completed' 
                          ? 'Concluído' 
                          : project.daysRemaining 
                            ? `${project.daysRemaining} dias restantes` 
                            : 'Em andamento'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>Categoria</span>
                      </div>
                      <p className="font-medium line-clamp-1">{project.category}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <Link href={`/project/${project.id}`}>
                      <FileText className="h-4 w-4" />
                      Detalhes
                    </Link>
                  </Button>
                  {project.status !== 'completed' && (
                    <Button size="sm" asChild>
                      <Link href={`/project/${project.id}`}>
                        {project.status === 'paused' ? 'Retomar' : 'Atualizar'}
                      </Link>
                    </Button>
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