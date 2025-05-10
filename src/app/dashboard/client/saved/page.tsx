'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ChevronDown, Bookmark, Briefcase, Star } from 'lucide-react'

const savedItems = [
  {
    id: '1',
    type: 'freelancer',
    name: 'Carlos Silva',
    title: 'UI/UX Designer',
    skills: ['Figma', 'Adobe XD', 'Prototipagem'],
    rating: 4.9
  },
  {
    id: '2',
    type: 'project',
    title: 'Template para SaaS',
    description: 'Design completo para dashboard SaaS moderno',
    skills: ['UI Design', 'Figma', 'Design System'],
    budget: 'R$ 3.000 - R$ 5.000'
  }
]

export default function ClientSavedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Itens Salvos</h1>
        <p className="text-muted-foreground">
          Freelancers e projetos que você salvou para referência futura
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar itens salvos..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {savedItems.map((item) => (
          <Card key={item.id} className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {item.type === 'freelancer' ? (
                    <Bookmark className="h-5 w-5 text-primary" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-primary" />
                  )}
                  <CardTitle>{item.type === 'freelancer' ? item.name : item.title}</CardTitle>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-5 w-5 fill-primary text-primary" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {item.type === 'freelancer' ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      {item.rating}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.title}
                    </span>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{item.description}</p>
                )}
                <div className="flex flex-wrap gap-1">
                  {item.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {item.type === 'project' && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{item.budget}</span>
                    <span className="text-muted-foreground">orçamento estimado</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}