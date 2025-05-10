export type Review = {
  id: number
  reviewer: Client | Freelancer
  reviewed: Client | Freelancer
  comment: string
  rate: number
}

export type Process = {
  id: number
  title: string
  description: string
}

export type Service = {
  id: number
  title: string
  description: string
  solutions: string []
  price: number
}

export type Client = {
  id: string
  picture: string
  cover: string
  name: string
  company?: string
  role?: string
  location: string
  projects: Project[]
  reviews: Review[]
  messages: Message[]
}

export type Freelancer = {
  id: string
  picture: string
  cover: string
  name: string
  title: string
  skills: string[]
  availability: 'available' | 'limited' | 'unavailable'
  reviews: Review[]
  about: string
  processes: Process[]
  services: Service[]
  location?: string
  responseTime?: string
  joinedDate?: string
}

export type Task = {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'finished'
  assignedTo: string
  dueDate: string
  priority: 'high' | 'low' | 'medium' | 'critical'
}

export type Phase = {
  id: string
  title: string
  status: 'not-started' | 'in-progress' | 'finished'
  startDate: string
  endDate: string
  progress: number
  tasks: Task[]
}

export type File = {
  id: string
  name: string
  type: string
  uploaded: string
  size: string
}

export type Message = {
  sender: Client | Freelancer
  receiver: Client | Freelancer
  date: string
  subject: string
  message: string
}

export type Project = {
  id: string
  title: string
  cover?: string
  client: Client
  freelancer: Freelancer
  status: 'Active' | 'Pendent' | 'Paused' | 'Canceled' | 'Not started'
  budget: number
  createdAt: string
  deadline: string
  startDate: string
  description: string
  deliverables?: string[]
  progress: number
  phases: Phase[]
  files: File[]
  messages: Message[]

}

export const mockClients: Client[] = [
  {
    id: "client_1",
    picture: "",
    cover: "",
    name: "John McFee",
    company: "McFee",
    role: "CEO",
    location: "USA, California",
    projects: [],
    reviews: [],
    messages: []
  }
]

export const mockFreelancers: Freelancer[] = [
  {
    id: "freelancer_1",
    picture: "",
    cover: "",
    name: "Henriques Ombisa",
    title: "Full Stack dev - DevOps.",
    skills: ["C++", "Go", "NodeJS", "ReactJS", "NextJS", "TailwindCSS"],
    availability: "available",
    reviews: [],
    about: "",
    processes: [],
    services: [],
    location: "Angola, Luanda",
    responseTime: "under 2h",
    joinedDate: "2024-04-14"
  }
]

const clientJonh = mockClients.filter(client=> client.name === "John McFee");
const freelancerHenriques = mockFreelancers.filter(freelancer=> freelancer.name === "Henriques Ombisa");

const messages = [
  {
    sender: clientJonh[0],
    receiver: freelancerHenriques[0],
    date: "2023-10-26",
    subject: "Reunião de kickoff",
    message: "Olá, gostaria de agendar uma reunião de kickoff para discutirmos os detalhes do projeto."
  },
  {
    sender: freelancerHenriques[0],
    receiver: clientJonh[0],
    date: "2023-10-27",
    subject: "Reunião de kickoff",
    message: "Claro, estou disponível na próxima terça-feira às 10h. O que acha?"
  },
  {
    sender: clientJonh[0],
    receiver: freelancerHenriques[0],
    date: "2023-10-28",
    subject: "Reunião de kickoff",
    message: "Perfeito! Vou enviar o link da reunião."
  },
  {
    sender: freelancerHenriques[0],
    receiver: clientJonh[0],
    date: "2023-10-29",
    subject: "Reunião de kickoff",
    message: "Ótimo! Estou ansioso para a reunião."
  },
  {
    sender: clientJonh[0],
    receiver: freelancerHenriques[0],
    date: "2023-10-30",
    subject: "Reunião de kickoff",
    message: "Só para confirmar, a reunião será na terça-feira às 10h, certo?"
  },
]

export const mockedProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    cover: "",
    client: clientJonh[0],
    freelancer: freelancerHenriques[0],
    status: 'Active',
    budget: 2500,
    createdAt: '2023-10-26',
    deadline: '2023-12-15',
    startDate: '2023-11-01',
    deliverables: [],
    progress: 65,
    description: 'Redesign completo do website corporativo com foco em UX e performance',
    phases: [
      {
        id: '1-1',
        title: 'Descoberta e Planejamento',
        status: 'finished',
        startDate: '2023-11-01',
        endDate: '2023-11-07',
        progress: 100,
        tasks: [
          {
            id: '1-1-1',
            title: 'Reunião de kickoff',
            description: '',
            status: 'in-progress',
            assignedTo: 'Você',
            dueDate: '2023-11-02',
            priority: 'high'
          },
          {
            id: '1-1-2',
            title: 'Análise de requisitos',
            description: '',
            status: 'todo',
            assignedTo: 'Você',
            dueDate: '2023-11-05',
            priority: 'low'
          },
          {
            id: '1-1-3',
            title: 'Cronograma do projeto',
            description: '',
            status: 'todo',
            assignedTo: 'Você',
            dueDate: '2023-11-07',
            priority: 'medium'
          }
        ]
      },
      {
        id: '1-2',
        title: 'Design UI/UX',
        status: 'in-progress',
        startDate: '2023-11-08',
        endDate: '2023-11-20',
        progress: 75,
        tasks: [
          {
            id: '1-2-1',
            title: 'Wireframes',
            description: '',
            status: 'finished',
            assignedTo: 'Você',
            dueDate: '2023-11-10',
            priority: 'high'
          },
          {
            id: '1-2-2',
            title: 'Design de alta fidelidade',
            description: 'Aguardando feedback do cliente sobre cores',
            status: 'in-progress',
            assignedTo: 'Você',
            dueDate: '2023-11-17',
            priority: 'high',
          },
          {
            id: '1-2-3',
            title: 'Prototipagem interativa',
            description: '',
            status: 'todo',
            assignedTo: 'Você',
            dueDate: '2023-11-20',
            priority: 'medium'
          }
        ]
      },
      {
        id: '1-3',
        title: 'Desenvolvimento Frontend',
        status: 'not-started',
        startDate: '2023-11-21',
        endDate: '2023-12-05',
        progress: 0,
        tasks: [
          {
            id: '1-3-1',
            title: 'Implementação do layout',
            description: '',
            status: 'todo',
            assignedTo: 'Você',
            dueDate: '2023-11-28',
            priority: 'high'
          },
          {
            id: '1-3-2',
            title: 'Integração com API',
            description: '',
            status: 'todo',
            assignedTo: 'Você',
            dueDate: '2023-12-03',
            priority: 'high'
          }
        ]
      }
    ],
    files: [
      {
        id: '1-1',
        name: 'Briefing do Projeto',
        type: 'pdf',
        uploaded: '2023-11-01',
        size: '2.4 MB'
      },
      {
        id: '1-2',
        name: 'Contrato Assinado',
        type: 'pdf',
        uploaded: '2023-11-02',
        size: '1.8 MB'
      }
    ],
    messages: messages,
  },
]