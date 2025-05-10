'use client'
import { useState } from 'react'
import { 
  ArrowUpRight, 
  BarChart2, 
  CheckCheck, 
  DollarSign, 
  Download, 
  FileText, 
  Filter, 
  Globe, 
  Loader2,
  Settings2,
  Sparkles,
  Trophy,
  User,
  Zap
} from 'lucide-react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Progress } from '@/components/ui/progress'
import { useUser } from '@/hooks/use-user'
import dynamic from 'next/dynamic'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

// Carregamento dinâmico para gráficos pesados (melhor performance)
const DynamicLineChart = dynamic(() => import('@/components/dashboard/analytics/line-chart'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" /></div>
})

const DynamicBarChart = dynamic(() => import('@/components/dashboard/analytics/bar-chart'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" /></div>
})

const DynamicPieChart = dynamic(() => import('@/components/dashboard/analytics/pie-chart'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" /></div>
})

const DynamicGeoChart = dynamic(() => import('@/components/dashboard/analytics/geo-chart'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" /></div>
})

export default function AnalyticsPage() {
  const { isClient } = useUser()
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() })
  const [metric, setMetric] = useState('performance')
  const [isPremium, setIsPremium] = useState(true) // Simulação - substitua por lógica real

  // Dados mockados (substitua por API)
  const stats = {
    views: { current: 1245, change: 12 },
    proposals: { current: 28, change: 5 },
    conversions: { current: isClient ? 8 : 3, change: isClient ? 3 : 1 },
    earnings: { current: isClient ? 0 : 5240, change: isClient ? 0 : 18 }
  }

  const topItems = isClient 
    ? [
        { name: 'Projeto Mobile App', value: 1245 },
        { name: 'Site Corporativo', value: 892 },
        { name: 'Sistema ERP', value: 567 }
      ]
    : [
        { name: 'UI/UX Design', value: 78 },
        { name: 'Desenvolvimento Frontend', value: 65 },
        { name: 'Consultoria', value: 42 }
      ]

  return (
    <div className="space-y-6">
      {/* Cabeçalho e Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart2 className="text-primary" />
            Analytics {isPremium && <Badge variant="premium" className="gap-1"><Sparkles className="h-3 w-3" /> Premium</Badge>}
          </h1>
          <p className="text-muted-foreground">
            {isClient 
              ? 'Desempenho dos seus projetos e engajamento' 
              : 'Seu desempenho e oportunidades na plataforma'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Métrica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">Desempenho</SelectItem>
              <SelectItem value="engagement">Engajamento</SelectItem>
              <SelectItem value="earnings" disabled={isClient}>Lucros</SelectItem>
              {isPremium && <SelectItem value="predictive">Análise Preditiva</SelectItem>}
            </SelectContent>
          </Select>
          
          <DateRangePicker 
            onUpdate={(range) => setDateRange(range)}
            className="w-full md:w-[250px]"
          />
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Upgrade Banner (para usuários free) */}
      {!isPremium && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Analytics Premium
                </h3>
                <p className="text-sm text-muted-foreground">
                  Desbloqueie relatórios avançados, previsões e exportação completa
                </p>
              </div>
              <Button variant="default" className="gap-2">
                Upgrade agora
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Visualizações" 
          value={stats.views.current} 
          change={stats.views.change} 
          icon={<Globe className="h-5 w-5" />}
        />
        <StatCard 
          title={isClient ? "Propostas Recebidas" : "Propostas Enviadas"} 
          value={stats.proposals.current} 
          change={stats.proposals.change} 
          icon={<FileText className="h-5 w-5" />}
        />
        <StatCard 
          title={isClient ? "Contratações" : "Projetos Aceitos"} 
          value={stats.conversions.current} 
          change={stats.conversions.change} 
          icon={<CheckCheck className="h-5 w-5" />}
        />
        {!isClient && (
          <StatCard 
            title="Ganhos Estimados" 
            value={stats.earnings.current} 
            change={stats.earnings.change} 
            icon={<DollarSign className="h-5 w-5" />}
            isCurrency
          />
        )}
      </div>

      {/* Gráficos Principais */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Desempenho Mensal</span>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <DynamicLineChart isClient={isClient} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <DynamicPieChart data={topItems} />
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <span>Top 3 {isClient ? 'projetos' : 'habilidades'}</span>
            <span>{dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}</span>
          </CardFooter>
        </Card>
      </div>

      {/* Segunda Linha de Gráficos */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Engajamento</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <DynamicBarChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Localização {isClient ? 'dos Freelancers' : 'dos Clientes'}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Settings2 className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                {isPremium ? (
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Download className="h-4 w-4 mr-2" />
                    Dados
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Upgrade
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {isPremium ? (
              <DynamicGeoChart />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                <Globe className="h-10 w-10 text-primary mb-4" />
                <h4 className="font-medium mb-2">Mapa de Localização Premium</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Visualize a distribuição geográfica completa com o plano Premium
                </p>
                <Button variant="default" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Desbloquear
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rankings e Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            {isClient ? 'Top Freelancers' : 'Seu Desempenho'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isClient ? (
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="font-medium text-muted-foreground w-6">#{item}</span>
                  <Avatar>
                    <AvatarImage src={`/avatars/${item}.jpg`} />
                    <AvatarFallback>F{item}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">Freelancer {item}</h4>
                    <p className="text-sm text-muted-foreground">UI/UX Designer • 4.9⭐</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item * 12} projetos</p>
                    <p className="text-sm text-muted-foreground">{item * 85}% aceitação</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Contatar
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Sua Posição
                </h4>
                <div className="text-3xl font-bold">Top 8%</div>
                <p className="text-sm text-muted-foreground">
                  Melhor que 92% dos {isClient ? 'clientes' : 'freelancers'}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-primary" />
                  Taxa de Aceitação
                </h4>
                <div className="text-3xl font-bold">78%</div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                  Recomendações
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <span>•</span> Melhore seu portfólio
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span> Reduza o tempo de resposta
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span> Adicione mais habilidades
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Componente de Estatística Reutilizável
function StatCard({ title, value, change, icon, isCurrency = false }: {
  title: string
  value: number
  change: number
  icon: React.ReactNode
  isCurrency?: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="p-2 rounded-lg bg-primary/10">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isCurrency ? `R$ ${value.toLocaleString()}` : value.toLocaleString()}
        </div>
        <div className={`flex items-center text-sm mt-1 ${
          change >= 0 ? 'text-emerald-500' : 'text-red-500'
        }`}>
          <ArrowUpRight className={`h-4 w-4 mr-1 ${
            change < 0 ? 'transform rotate-180' : ''
          }`} />
          {Math.abs(change)}% em relação ao período anterior
        </div>
      </CardContent>
    </Card>
  )
}