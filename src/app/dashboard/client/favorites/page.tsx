'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ChevronDown, Star, Heart } from 'lucide-react'

const favorites = [
  {
    id: '1',
    name: 'Carlos Silva',
    avatar: '/avatars/1.jpg',
    title: 'UI/UX Designer',
    rating: 4.9,
    skills: ['Figma', 'Adobe XD', 'Prototipagem'],
    projects: 24,
    rate: 'R$ 100/h'
  },
  {
    id: '2',
    name: 'Ana Oliveira',
    avatar: '/avatars/2.jpg',
    title: 'Desenvolvedora Front-end',
    rating: 4.7,
    skills: ['React', 'TypeScript', 'Next.js'],
    projects: 18,
    rate: 'R$ 120/h'
  }
]

export default function ClientFavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Freelancers Favoritos</h1>
        <p className="text-muted-foreground">
          Seus profissionais favoritos para futuros projetos
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar freelancers..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {favorites.map((freelancer) => (
          <Card key={freelancer.id} className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={freelancer.avatar} />
                    <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{freelancer.name}</CardTitle>
                    <p className="text-muted-foreground">{freelancer.title}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    {freelancer.rating}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {freelancer.projects} projetos concluídos
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {freelancer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{freelancer.rate}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Mensagem
                    </Button>
                    <Button size="sm">
                      Contratar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}