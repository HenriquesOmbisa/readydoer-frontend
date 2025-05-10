'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Filter, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    id: '1',
    title: 'Desenvolvimento de Site Institucional',
    description: 'Precisamos de um site responsivo para nossa empresa com catálogo de produtos.',
    status: 'active',
    proposals: 5,
    budget: 'R$ 5.000 - R$ 8.000',
    createdAt: '15/05/2023'
  },
  {
    id: '2',
    title: 'App Mobile para Delivery',
    description: 'Desenvolvimento de aplicativo iOS e Android para plataforma de delivery de comida.',
    status: 'draft',
    proposals: 0,
    budget: 'R$ 15.000 - R$ 25.000',
    createdAt: '10/05/2023'
  },
  {
    id: '3',
    title: 'Design de Logotipo',
    description: 'Criação de identidade visual para nova marca de roupas.',
    status: 'completed',
    proposals: 12,
    budget: 'R$ 1.500 - R$ 3.000',
    createdAt: '01/05/2023'
  }
]

export default function ClientProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Meus Projetos</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe seus projetos publicados
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/client/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar projetos..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  {project.title}
                  <Badge variant={project.status === 'active' ? 'default' : project.status === 'completed' ? 'secondary' : 'outline'}>
                    {project.status === 'active' ? 'Ativo' : project.status === 'completed' ? 'Concluído' : 'Rascunho'}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{project.proposals}</span>
                  <span className="text-muted-foreground">propostas</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{project.budget}</span>
                  <span className="text-muted-foreground">orçamento</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Criado em</span>
                  <span className="font-medium">{project.createdAt}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/client/projects/${project.id}`}>
                  Detalhes
                </Link>
              </Button>
              {project.status === 'active' && (
                <Button asChild>
                  <Link href={`/dashboard/client/projects/${project.id}/proposals`}>
                    Ver Propostas
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}