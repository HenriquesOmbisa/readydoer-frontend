'use client'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Filter, ChevronDown, ChevronUp, Star, Calendar, MessageSquare, Frown, Meh, Smile, Laugh, X, CheckCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface Review {
  id: string
  client: {
    name: string
    avatar: string
    company?: string
    location?: string
  }
  project: string
  rating: number
  comment: string
  date: Date
  wouldRecommend: boolean
  skills: string[]
}

const reviews: Review[] = [
  {
    id: '1',
    client: {
      name: 'Acme Inc',
      avatar: '/clients/1.jpg',
      company: 'Acme Corporation',
      location: 'São Paulo, SP'
    },
    project: 'Desenvolvimento de Landing Page',
    rating: 5,
    comment: 'Excelente trabalho! Entregou antes do prazo com qualidade superior. O freelancer foi muito profissional e atencioso com todos os detalhes do projeto. Superou nossas expectativas em todos os aspectos.',
    date: new Date('2023-05-15'),
    wouldRecommend: true,
    skills: ['React', 'UI/UX', 'Responsividade']
  },
  {
    id: '2',
    client: {
      name: 'Startup XYZ',
      avatar: '/clients/2.jpg',
      company: 'XYZ Tecnologia',
      location: 'Rio de Janeiro, RJ'
    },
    project: 'Design de Interface Mobile',
    rating: 4,
    comment: 'Bom profissional, mas houve alguns atrasos na comunicação. O trabalho final foi de boa qualidade, porém precisamos de mais ajustes do que o esperado. Entregou dentro do prazo combinado.',
    date: new Date('2023-05-10'),
    wouldRecommend: true,
    skills: ['Figma', 'Prototipagem', 'UI Design']
  },
  {
    id: '3',
    client: {
      name: 'Tech Solutions',
      avatar: '/clients/3.jpg',
      company: 'Tech Solutions Ltda',
      location: 'Belo Horizonte, MG'
    },
    project: 'Sistema de Gerenciamento',
    rating: 5,
    comment: 'Simplesmente incrível! Contrataria novamente sem pensar duas vezes. Resolveu problemas complexos com soluções elegantes e eficientes. Comunicação excelente em todas as etapas do projeto.',
    date: new Date('2023-04-28'),
    wouldRecommend: true,
    skills: ['Node.js', 'TypeScript', 'Arquitetura']
  },
  {
    id: '4',
    client: {
      name: 'Design Masters',
      avatar: '/clients/4.jpg',
      company: 'Design Masters Studio',
      location: 'Curitiba, PR'
    },
    project: 'Redesign de Branding',
    rating: 3,
    comment: 'O trabalho foi satisfatório, mas o processo poderia ter sido mais eficiente. Algumas entregas parciais não atingiram nossas expectativas, mas a versão final ficou boa. Prazo foi cumprido.',
    date: new Date('2023-04-15'),
    wouldRecommend: false,
    skills: ['Branding', 'Identidade Visual']
  },
  {
    id: '5',
    client: {
      name: 'Digital Agency',
      avatar: '/clients/5.jpg',
      company: 'Digital One',
      location: 'Porto Alegre, RS'
    },
    project: 'Campanha de Marketing',
    rating: 5,
    comment: 'Melhor freelancer que já contratamos! Resultados acima da média e extremamente proativo. Nos ajudou a alcançar metas que pareciam impossíveis. Já estamos planejando novos projetos juntos.',
    date: new Date('2023-03-22'),
    wouldRecommend: true,
    skills: ['Marketing Digital', 'SEO', 'Anúncios']
  }
]

const ratingOptions = [
  { value: 'all', label: 'Todas' },
  { value: '5', label: '5 estrelas' },
  { value: '4', label: '4 estrelas' },
  { value: '3', label: '3 estrelas' },
  { value: '2', label: '2 estrelas' },
  { value: '1', label: '1 estrela' }
]

const dateOptions = [
  { value: 'all', label: 'Todo período' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 3 meses' },
  { value: '365', label: 'Último ano' }
]

const skillOptions = [
  'React', 'UI/UX', 'Responsividade', 'Figma', 'Prototipagem', 
  'UI Design', 'Node.js', 'TypeScript', 'Arquitetura', 
  'Branding', 'Identidade Visual', 'Marketing Digital', 'SEO', 'Anúncios'
]

export default function FreelancerReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [skillFilter, setSkillFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedReview, setExpandedReview] = useState<string | null>(null)

  // Métricas calculadas
  const averageRating = useMemo(() => {
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }, [])

  const recommendationRate = useMemo(() => {
    const recommended = reviews.filter(review => review.wouldRecommend).length
    return Math.round((recommended / reviews.length) * 100)
  }, [])

  const ratingDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map(stars => ({
      stars,
      count: reviews.filter(r => r.rating === stars).length,
      percentage: Math.round((reviews.filter(r => r.rating === stars).length / reviews.length * 100))
    }))
  }, [])

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch = 
        review.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter)
      
      const matchesDate = 
        dateFilter === 'all' || 
        (new Date().getTime() - review.date.getTime()) <= parseInt(dateFilter) * 24 * 60 * 60 * 1000
      
      const matchesSkill = skillFilter === 'all' || review.skills.includes(skillFilter)
      
      return matchesSearch && matchesRating && matchesDate && matchesSkill
    })
  }, [searchTerm, ratingFilter, dateFilter, skillFilter])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const toggleExpandReview = (id: string) => {
    setExpandedReview(expandedReview === id ? null : id)
  }

  const getRatingIcon = (rating: number) => {
    switch (rating) {
      case 1: return <Frown className="h-5 w-5 text-red-500" />
      case 2: return <Frown className="h-5 w-5 text-orange-500" />
      case 3: return <Meh className="h-5 w-5 text-yellow-500" />
      case 4: return <Smile className="h-5 w-5 text-lime-500" />
      case 5: return <Laugh className="h-5 w-5 text-green-500" />
      default: return <Star className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Avaliações</h1>
        <p className="text-muted-foreground">
          Feedback dos clientes sobre seu trabalho
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avaliação Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{averageRating}</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(Number(averageRating)) ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Recomendação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recommendationRate}%</div>
            <Progress value={recommendationRate} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Distribuição de Avaliações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex w-10">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <Progress value={item.percentage} className="h-2 flex-1" />
                <span className="text-sm text-muted-foreground w-10 text-right">{item.percentage}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar avaliações..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Star className="h-4 w-4" />
                Avaliação
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {ratingOptions.map(option => (
                <DropdownMenuItem 
                  key={option.value} 
                  onSelect={() => setRatingFilter(option.value)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Período</label>
                <Select 
                  value={dateFilter}
                  onValueChange={setDateFilter}
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

              <div>
                <label className="block text-sm font-medium mb-1">Habilidade</label>
                <Select 
                  value={skillFilter}
                  onValueChange={setSkillFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas habilidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas habilidades</SelectItem>
                    {skillOptions.map(skill => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lista de Avaliações */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">
            {filteredReviews.length} {filteredReviews.length === 1 ? 'avaliação encontrada' : 'avaliações encontradas'}
          </h3>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <MessageSquare className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Nenhuma avaliação encontrada</p>
            <p className="text-muted-foreground text-center">
              {ratingFilter === 'all' 
                ? "Não encontramos avaliações correspondentes aos filtros aplicados."
                : `Não há avaliações ${ratingOptions.find(o => o.value === ratingFilter)?.label?.toLowerCase()}.`}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-sm transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.client.avatar} />
                        <AvatarFallback>{review.client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{review.client.name}</CardTitle>
                        <p className="text-muted-foreground">{review.project}</p>
                        {review.client.company && (
                          <p className="text-sm text-muted-foreground">{review.client.company}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {getRatingIcon(review.rating)}
                      <span className="font-medium">{review.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  
                  <div className={`${expandedReview === review.id ? '' : 'line-clamp-3'}`}>
                    <p>{review.comment}</p>
                  </div>
                  
                  {review.comment.length > 200 && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 text-sm"
                      onClick={() => toggleExpandReview(review.id)}
                    >
                      {expandedReview === review.id ? 'Mostrar menos' : 'Mostrar mais'}
                    </Button>
                  )}

                  {review.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {review.skills.map(skill => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                    {review.wouldRecommend ? (
                      <>
                        <CheckCheck className="h-4 w-4 text-green-500" />
                        <span>O cliente recomenda este freelancer</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-500" />
                        <span>O cliente não recomenda este freelancer</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}