'use client'
import { motion } from 'framer-motion'
import { 
  Briefcase, 
  FileText, 
  User, 
  ArrowUpRight, 
  Clock,
  DollarSign,
  Search,
  Plus,
  Zap,
  Star,
  Crown,
  BarChart2,
  Shield,
  Rocket,
  CreditCard,
  TrendingUp,
  Award,
  MessageSquare,
  Users,
  FileCheck,
  CheckCircle,
  AlertCircle,
  PieChart,
  Bell
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/use-user'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function DashboardPage() {
  const { isClient, user } = useUser();

  interface ProjectCard {
    title: string
    progress: number
    deadline: string
    budget: string
    status: 'Progress' | 'Paused' | 'Canceled'
    freelancer?: { name: string, picture: string, rating: number },
    priority: 'hight' | 'medium' | 'low',
    premiumOnly: boolean
  }
  
  // Simulando dados do usuário (substituir por chamada API real)
  const userData = {
    ...user,
    isPremium: false, // Alternar para testar versão free/premium
    membershipLevel: isClient ? 'Business' : 'Pro',
    nextBillingDate: '15/06/2023',
    projectsCompleted: 12,
    totalEarnings: 'R$ 28.750',
    responseRate: 92,
    responseTime: '2 horas',
    skills: ['UI/UX Design', 'Frontend', 'React'],
    rating: 4.9
  }

  // Dados para clientes
  const clientMetrics = [
    { title: 'Projetos Ativos', value: 3, icon: Briefcase, trend: 12, premium: false },
    { title: 'Propostas Recebidas', value: 8, icon: FileText, trend: 5, premium: false },
    { title: 'Freelancers Favoritos', value: 5, icon: User, trend: 2, premium: false },
    { title: 'Taxa de Sucesso', value: '92%', icon: CheckCircle, trend: 8, premium: true },
    { title: 'Economia Total', value: 'R$ 4.200', icon: DollarSign, trend: 15, premium: true },
    { title: 'Tempo Médio', value: '3.2 dias', icon: Clock, trend: -2, premium: true }
  ]

  // Dados para freelancers
  const freelancerMetrics = [
    { title: 'Propostas Enviadas', value: 7, icon: FileText, trend: 8, premium: false },
    { title: 'Trabalhos Ativos', value: 2, icon: Briefcase, trend: 1, premium: false },
    { title: 'Avaliação Média', value: 4.8, icon: Star, trend: 0.2, premium: false },
    { title: 'Taxa de Aceitação', value: '78%', icon: TrendingUp, trend: 12, premium: true },
    { title: 'Ganhos Mensais', value: 'R$ 6.400', icon: CreditCard, trend: 22, premium: true },
    { title: 'Clientes Recorrentes', value: 5, icon: Users, trend: 3, premium: true }
  ]

  const activeProjects: ProjectCard[] = [
    { 
      title: 'Site Responsivo', 
      progress: 65, 
      deadline: '2 dias', 
      budget: 'R$ 2.500',
      status: 'Progress',
      freelancer: { name: 'Ana Silva', rating: 4.9, picture: '' },
      priority: 'hight',
      premiumOnly: false
    },
    { 
      title: 'App Mobile', 
      progress: 30, 
      deadline: '7 dias', 
      budget: 'R$ 4.200',
      status: 'Paused',
      freelancer: { name: 'Carlos Mendes', rating: 4.7, picture: '' },
      priority: 'medium',
      premiumOnly: false
    },
    { 
      title: 'Dashboard Analytics', 
      progress: 10, 
      deadline: '14 dias', 
      budget: 'R$ 5.800',
      status: 'Canceled',
      freelancer: { name: 'Mariana Costa', rating: 5.0, picture: '' },
      priority: 'low',
      premiumOnly: true
    }
  ]

  const recommendations = [
    {
      title: 'Melhore seu perfil',
      description: 'Complete seu portfólio para aumentar suas chances em 40%',
      icon: User,
      action: 'Completar agora',
      premium: false
    },
    {
      title: 'Certificação verificada',
      description: 'Obtenha nossa certificação e destaque-se',
      icon: Award,
      action: 'Saiba mais',
      premium: false
    }
  ]

  const notifications = [
    { id: 1, title: 'Nova proposta recebida', time: '2 min atrás', read: false, premium: false },
    { id: 2, title: 'Seu projeto foi selecionado', time: '1 hora atrás', read: false, premium: false },
    //{ id: 4, title: 'Freelancer favorito disponível', time: '2 dias atrás', read: true, premium: true }
  ]

  return (
    <div className="space-y-6 p-1 lg:p-6">
      {/* Welcome Banner com status premium */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-6 ${
          userData.isPremium
            ? 'bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-indigo-500/20'
            : 'bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20'
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Olá, {user?.name || 'usuário'}!
                {userData.isPremium && (
                  <Badge variant="premium" className="gap-1">
                    <Crown className="h-3 w-3" />
                    {userData.membershipLevel}
                  </Badge>
                )}
              </h1>
            </div>
            <p className="text-muted-foreground mt-1">
              {isClient 
                ? userData.isPremium
                  ? 'Aproveite seus benefícios exclusivos como cliente Business'
                  : 'Atualize para acessar recursos premium e melhorar seus resultados'
                : userData.isPremium
                  ? 'Você está aproveitando todos os benefícios do plano Pro'
                  : 'Atualize para receber mais propostas e melhorar seu perfil'}
            </p>
            
            {!userData.isPremium && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="default" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Fazer Upgrade
                </Button>
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Ver Benefícios
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-1">
            {userData.isPremium ? (
              <>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/50">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Premium Ativo
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Próximo vencimento: {userData.nextBillingDate}
                </p>
              </>
            ) : (
              <Badge variant="outline">
                <AlertCircle className="h-3 w-3 mr-1" />
                Plano Free
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      {/* Seção principal */}
      <motion.div className="space-y-6">
        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {(isClient ? clientMetrics : freelancerMetrics)
            .filter(metric => userData.isPremium || !metric.premium)
            .map((metric, i) => (
              <Card key={i} className="p-5 hover:shadow-sm transition-shadow group">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      {metric.premium && (
                        <Badge variant="outline" className="h-5 text-xs">
                          PREMIUM
                        </Badge>
                      )}
                    </div>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    userData.isPremium 
                      ? 'bg-indigo-500/10 group-hover:bg-indigo-500/20' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    <metric.icon className={`h-5 w-5 ${
                      userData.isPremium ? 'text-indigo-500' : 'text-primary'
                    }`} />
                  </div>
                </div>
                <div className={`flex items-center mt-4 text-sm ${
                  metric.trend >= 0 ? 'text-emerald-500' : 'text-amber-500'
                }`}>
                  <ArrowUpRight className={`h-3 w-3 mr-1 ${
                    metric.trend < 0 ? 'transform rotate-180' : ''
                  }`} />
                  {Math.abs(metric.trend)}% {metric.trend >= 0 ? 'aumento' : 'redução'} na última semana
                </div>
              </Card>
            ))}
        </motion.div>

        {/* Projects/Jobs Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {isClient ? 'Projetos em Andamento' : 'Trabalhos Ativos'}
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todos
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeProjects
              .filter(project => userData.isPremium || !project.premiumOnly)
              .map((project, i) => (
                <Card key={i} className="p-5 group hover:shadow-sm transition-shadow">
                  <div className="flex flex-col md:flex-col gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{project.title}</h3>
                        {project.premiumOnly && (
                          <Badge variant="outline" className="h-5 text-xs">
                            PREMIUM
                          </Badge>
                        )}
                        {project.priority === 'hight' && (
                        <Badge variant="destructive" className="text-xs font-bold tgap-1">
                          <AlertCircle className="h-4 w-4" strokeWidth={3.2}/>
                          Urgente
                        </Badge>
                      )}
                      </div>
        
                      <div className="flex flex-wrap flex-col gap-2 mt-0 text-sm text-muted-foreground">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {project.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {project.budget}
                          </span>
                        </div>
                        {isClient && (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={project.freelancer?.picture} />
                              <AvatarFallback className='font-bold bg-black text-white text-xs'>{project.freelancer?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="font-medium text-sm ">{project.freelancer?.name}</p>
                          </div>
                        )}
                        <Badge className={project.status ==='Progress' ? `bg-green-500 text-white` : project.status === 'Paused' ? `bg-yellow-500 text-white` : `bg-red-500 text-white`}>
                          {project.status}
                        </Badge>
                      </div>
        
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress
                          value={project.progress}
                          className={`h-2 bg-gray-100 [&>div]:bg-blue-500`}
                        />
                      </div>
                    </div>
        
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <Button variant="outline" size="sm">
                        {isClient ? 'Ver Detalhes' : 'Acompanhar'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </motion.div>

        {userData.isPremium && (
            <div className="">

              {/* Recomendações e Notificações */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid gap-4 md:grid-cols-2"
              >
                {/* Recomendações */}
                <Card className="p-5">
                  <h3 className="font-medium flex items-center gap-2 mb-4">
                    <Rocket className="h-4 w-4 text-primary" />
                    Recomendações para você
                  </h3>
                  <div className="space-y-4">
                    {recommendations
                      .filter(rec => userData.isPremium || !rec.premium)
                      .map((rec, i) => (
                        <div key={i} className="flex gap-3">
                          <div className={`p-2 rounded-lg mt-1 ${
                            userData.isPremium
                              ? 'bg-indigo-500/10'
                              : 'bg-primary/10'
                          }`}>
                            <rec.icon className={`h-4 w-4 ${
                              userData.isPremium ? 'text-indigo-500' : 'text-primary'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                            <Button variant="link" size="sm" className="h-6 px-0 text-sm mt-1">
                              {rec.action} →
                            </Button>
                          </div>
                          {rec.premium && (
                            <Badge variant="outline" className="h-5 text-xs">
                              PREMIUM
                            </Badge>
                          )}
                        </div>
                      ))}
                  </div>
                </Card>
                {/* Notificações */}
                <Card className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      Notificações
                    </h3>
                    <div className="flex items-center gap-2">
                      <Switch id="notifications" checked={true} />
                      <Label htmlFor="notifications">Ativar</Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {notifications
                      .filter(notif => userData.isPremium || !notif.premium)
                      .map((notif) => (
                        <div
                          key={notif.id}
                          className={`flex gap-3 p-2 rounded-lg ${
                            !notif.read ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className={`p-2 rounded-lg mt-1 ${
                            userData.isPremium
                              ? 'bg-indigo-500/10'
                              : 'bg-primary/10'
                          }`}>
                            <Bell className={`h-4 w-4 ${
                              userData.isPremium ? 'text-indigo-500' : 'text-primary'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{notif.title}</h4>
                              {notif.premium && (
                                <Badge variant="outline" className="h-5 text-xs">
                                  PREMIUM
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          )}
                        </div>
                      ))}
                  </div>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid gap-4 md:grid-cols-2"
              >
                <Card className={`p-5 ${
                  userData.isPremium
                    ? 'bg-gradient-to-br from-indigo-500/5 to-indigo-500/10 border-indigo-500/20'
                    : 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'
                }`}>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      userData.isPremium ? 'bg-indigo-500/10' : 'bg-primary/10'
                    }`}>
                      <Search className={`h-5 w-5 ${
                        userData.isPremium ? 'text-indigo-500' : 'text-primary'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {isClient ? 'Encontre Freelancers' : 'Descubra Projetos'}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isClient
                          ? 'Os melhores talentos para seu projeto'
                          : 'Trabalhos que combinam com suas habilidades'}
                      </p>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-2"
                      disabled={!userData.isPremium && isClient}
                    >
                      <Plus className="h-4 w-4" />
                      {!userData.isPremium && isClient ? 'Upgrade necessário' : 'Explorar'}
                    </Button>
                  </div>
                </Card>
                <Card className="p-5 bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-500/10">
                      <Zap className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Destaque seu Perfil</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isClient
                          ? 'Seus projetos aparecem primeiro para os melhores freelancers'
                          : 'Aumente sua visibilidade e receba mais oportunidades'}
                      </p>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-2 bg-amber-500 hover:bg-amber-600"
                    >
                      {userData.isPremium ? 'Gerenciar' : 'Upgrade'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  )
}