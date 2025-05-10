'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Plus, Trash2, Edit, Bell, Check, Clock, KanbanSquare } from 'lucide-react'
import { format, isBefore, isAfter, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Sidebar from '@/components/project/Sidebar'
import Navbar from '@/components/project/navbar'

type Phase = {
  id: string
  title: string
  description: string
  progress: number
  startDate: Date
  deadline: Date
}

type Task = {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
  phaseId: string
  dueDate?: Date
}

type Note = {
  id: string
  title: string
  content: string
  reminderDate?: Date
  relatedPhaseId?: string
  relatedTaskId?: string
  createdAt: Date
}

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.projectId as string

  const [activeTab, setActiveTab] = useState('phases')
  const [phases, setPhases] = useState<Phase[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null)
  const [isPhaseDialogOpen, setIsPhaseDialogOpen] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string } | null>(null)
  
  const [currentPhase, setCurrentPhase] = useState<Partial<Phase>>({
    title: '',
    description: '',
    progress: 0,
    startDate: new Date(),
    deadline: addDays(new Date(), 7),
  })

  const [currentTask, setCurrentTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    phaseId: selectedPhase?.id || '',
  })

  const [currentNote, setCurrentNote] = useState<Partial<Note>>({
    title: '',
    content: '',
  })

  // Load sample data (in a real app, this would come from an API)
  useEffect(() => {
    const samplePhases: Phase[] = [
      {
        id: '1',
        title: 'Planejamento',
        description: 'Definir escopo e requisitos do projeto',
        progress: 30,
        startDate: new Date(2023, 5, 1),
        deadline: new Date(2023, 5, 15),
      },
      {
        id: '2',
        title: 'Desenvolvimento',
        description: 'Implementar as funcionalidades principais',
        progress: 10,
        startDate: new Date(2023, 5, 16),
        deadline: new Date(2023, 6, 15),
      },
      {
        id: '3',
        title: 'Testes',
        description: 'Realizar testes de qualidade e usabilidade',
        progress: 0,
        startDate: new Date(2023, 6, 16),
        deadline: new Date(2023, 6, 30),
      },
    ]

    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Definir escopo',
        description: 'Documentar todos os requisitos do projeto',
        priority: 'high',
        status: 'todo',
        phaseId: '1',
      },
      {
        id: '2',
        title: 'Criar wireframes',
        description: 'Desenhar protótipos das telas principais',
        priority: 'medium',
        status: 'in-progress',
        phaseId: '1',
      },
      {
        id: '3',
        title: 'Configurar ambiente',
        description: 'Preparar ambiente de desenvolvimento',
        priority: 'high',
        status: 'done',
        phaseId: '1',
      },
      {
        id: '4',
        title: 'Implementar API',
        description: 'Desenvolver endpoints da API',
        priority: 'high',
        status: 'todo',
        phaseId: '2',
      },
    ]

    const sampleNotes: Note[] = [
      {
        id: '1',
        title: 'Reunião com cliente',
        content: 'Discutir mudanças nos requisitos na próxima semana',
        reminderDate: addDays(new Date(), 2),
        relatedPhaseId: '1',
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Ideias para UI',
        content: 'Considerar usar paleta de cores azul e branco',
        createdAt: new Date(),
      },
    ]

    setPhases(samplePhases)
    setTasks(sampleTasks)
    setNotes(sampleNotes)
  }, [])

  // Check for reminders
  useEffect(() => {
    const now = new Date()
    const upcomingReminders = notes.filter(
      note => note.reminderDate && isBefore(note.reminderDate, addDays(now, 1)) && isAfter(note.reminderDate, now)
    )

    if (upcomingReminders.length > 0) {
      upcomingReminders.forEach(note => {
        alert(`Lembrete: ${note.title}\n\n${note.content}`)
      })
    }
  }, [notes])

  const handlePhaseSubmit = () => {
    if (!currentPhase.title) return

    if (selectedPhase) {
      // Edit existing phase
      setPhases(phases.map(phase =>
        phase.id === selectedPhase.id ? { ...phase, ...currentPhase } as Phase : phase
      ))
    } else {
      // Add new phase
      const newPhase: Phase = {
        id: Date.now().toString(),
        title: currentPhase.title,
        description: currentPhase.description || '',
        progress: currentPhase.progress || 0,
        startDate: currentPhase.startDate || new Date(),
        deadline: currentPhase.deadline || addDays(new Date(), 7),
      }
      setPhases([...phases, newPhase])
    }

    setIsPhaseDialogOpen(false)
    setSelectedPhase(null)
    setCurrentPhase({
      title: '',
      description: '',
      progress: 0,
      startDate: new Date(),
      deadline: addDays(new Date(), 7),
    })
  }

  const handleTaskSubmit = () => {
    if (!currentTask.title || !currentTask.phaseId) return

    if (currentTask.id) {
      // Edit existing task
      setTasks(tasks.map(task =>
        task.id === currentTask.id ? { ...task, ...currentTask } as Task : task
      ))
    } else {
      // Add new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: currentTask.title,
        description: currentTask.description || '',
        priority: currentTask.priority || 'medium',
        status: currentTask.status || 'todo',
        phaseId: currentTask.phaseId,
      }
      setTasks([...tasks, newTask])
    }

    setIsTaskDialogOpen(false)
    setCurrentTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      phaseId: selectedPhase?.id || '',
    })
  }

  const handleNoteSubmit = () => {
    if (!currentNote.title) return

    if (currentNote.id) {
      // Edit existing note
      setNotes(notes.map(note =>
        note.id === currentNote.id ? { ...note, ...currentNote } as Note : note
      ))
    } else {
      // Add new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: currentNote.title,
        content: currentNote.content || '',
        reminderDate: currentNote.reminderDate,
        relatedPhaseId: currentNote.relatedPhaseId,
        relatedTaskId: currentNote.relatedTaskId,
        createdAt: new Date(),
      }
      setNotes([...notes, newNote])
    }

    setIsNoteDialogOpen(false)
    setCurrentNote({
      title: '',
      content: '',
    })
  }

  const handleDelete = () => {
    if (!itemToDelete) return

    if (itemToDelete.type === 'phase') {
      setPhases(phases.filter(phase => phase.id !== itemToDelete.id))
      setTasks(tasks.filter(task => task.phaseId !== itemToDelete.id))
    } else if (itemToDelete.type === 'task') {
      setTasks(tasks.filter(task => task.id !== itemToDelete.id))
    } else if (itemToDelete.type === 'note') {
      setNotes(notes.filter(note => note.id !== itemToDelete.id))
    }

    setIsDeleteConfirmOpen(false)
    setItemToDelete(null)
  }

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const updatedTasks = [...tasks]
    const taskIndex = updatedTasks.findIndex(task => task.id === draggableId)
    
    if (taskIndex !== -1) {
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: destination.droppableId as 'todo' | 'in-progress' | 'done'
      }
      setTasks(updatedTasks)
    }
  }

  const getPhaseTasks = (phaseId: string) => {
    return tasks.filter(task => task.phaseId === phaseId)
  }

  const getTaskCountByStatus = (phaseId: string, status: string) => {
    return tasks.filter(task => task.phaseId === phaseId && task.status === status).length
  }

  const calculatePhaseProgress = (phaseId: string) => {
    const phaseTasks = getPhaseTasks(phaseId)
    if (phaseTasks.length === 0) return 0
    
    const doneTasks = phaseTasks.filter(task => task.status === 'done').length
    return Math.round((doneTasks / phaseTasks.length) * 100)
  }

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 pb-10 grid grid-cols-1 gap-8 lg:grid-cols-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="lg:col-span-3 mt-8 p-8 flex flex-col space-y-0 rounded-md shadow-sm bg-white"
      >
        <Card className="border-0 gap-2 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <KanbanSquare className="w-5 h-5 text-green-500" />
              Project Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="phases" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="phases" onClick={() => setActiveTab('phases')}>
                Phases
                </TabsTrigger>
                <TabsTrigger value="notes" onClick={() => setActiveTab('notes')}>
                  Anotações
                </TabsTrigger>
              </TabsList>
              <TabsContent value="phases">
                {!selectedPhase ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold"></h2>
                      <Button onClick={() => {
                        setSelectedPhase(null)
                        setIsPhaseDialogOpen(true)
                      }}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Phase
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {phases.map(phase => (
                        <motion.div
                          key={phase.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card className="cursor-pointer" onClick={() => setSelectedPhase(phase)}>
                            <CardHeader>
                              <CardTitle>{phase.title}</CardTitle>
                              <CardDescription>{phase.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progresso</span>
                                  <span>{calculatePhaseProgress(phase.id)}%</span>
                                </div>
                                <Progress value={calculatePhaseProgress(phase.id)} />
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">Início</p>
                                  <p>{format(phase.startDate, 'dd/MM/yyyy', { locale: ptBR })}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Prazo</p>
                                  <p>{format(phase.deadline, 'dd/MM/yyyy', { locale: ptBR })}</p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <div className="flex space-x-2">
                                <Badge variant="outline">
                                  {getPhaseTasks(phase.id).length} tarefas
                                </Badge>
                                <Badge variant="outline" className={getStatusColor('done')}>
                                  {getTaskCountByStatus(phase.id, 'done')} concluídas
                                </Badge>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedPhase(phase)
                                    setIsPhaseDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setItemToDelete({ type: 'phase', id: phase.id })
                                    setIsDeleteConfirmOpen(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedPhase(null)}
                        className="flex items-center"
                      >
                        ← Voltar para fases
                      </Button>
                      <div className="flex space-x-4">
                        <Button
                          onClick={() => {
                            setCurrentPhase(selectedPhase)
                            setIsPhaseDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Fase
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            setItemToDelete({ type: 'phase', id: selectedPhase.id })
                            setIsDeleteConfirmOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir Fase
                        </Button>
                      </div>
                    </div>
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-2">{selectedPhase.title}</h2>
                      <p className="text-muted-foreground mb-4">{selectedPhase.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardDescription>Total de Tarefas</CardDescription>
                            <CardTitle>{getPhaseTasks(selectedPhase.id).length}</CardTitle>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardDescription>Concluídas</CardDescription>
                            <CardTitle>{getTaskCountByStatus(selectedPhase.id, 'done')}</CardTitle>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardDescription>Taxa de Conclusão</CardDescription>
                            <CardTitle>{calculatePhaseProgress(selectedPhase.id)}%</CardTitle>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardDescription>Em Atraso</CardDescription>
                            <CardTitle>
                              {tasks.filter(task =>
                                task.phaseId === selectedPhase.id &&
                                task.dueDate &&
                                isBefore(task.dueDate, new Date()) &&
                                task.status !== 'done'
                              ).length}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Tarefas</h3>
                        <Button
                          onClick={() => {
                            setCurrentTask({
                              title: '',
                              description: '',
                              priority: 'medium',
                              status: 'todo',
                              phaseId: selectedPhase.id,
                            })
                            setIsTaskDialogOpen(true)
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Nova Tarefa
                        </Button>
                      </div>
                      <DragDropContext onDragEnd={onDragEnd}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {['todo', 'in-progress', 'done'].map((status) => (
                            <Droppable key={status} droppableId={status}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="bg-gray-50 rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium">
                                      {status === 'todo' && 'A Fazer'}
                                      {status === 'in-progress' && 'Em Andamento'}
                                      {status === 'done' && 'Concluídas'}
                                    </h4>
                                    <Badge>
                                      {tasks.filter(t => t.phaseId === selectedPhase.id && t.status === status).length}
                                    </Badge>
                                  </div>
                                  <div className="space-y-3">
                                    {tasks
                                      .filter(task => task.phaseId === selectedPhase.id && task.status === status)
                                      .map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className="bg-white rounded-lg shadow-sm p-4 border"
                                            >
                                              <div className="flex justify-between items-start">
                                                <h5 className="font-medium mb-1">{task.title}</h5>
                                                <Badge className={getPriorityColor(task.priority)}>
                                                  {task.priority === 'high' && 'Alta'}
                                                  {task.priority === 'medium' && 'Média'}
                                                  {task.priority === 'low' && 'Baixa'}
                                                </Badge>
                                              </div>
                                              <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                                              <div className="flex justify-between items-center">
                                                {task.dueDate && (
                                                  <div className="flex items-center text-sm text-muted-foreground">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {format(task.dueDate, 'dd/MM/yyyy')}
                                                  </div>
                                                )}
                                                <div className="flex space-x-2">
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                      setCurrentTask(task)
                                                      setIsTaskDialogOpen(true)
                                                    }}
                                                  >
                                                    <Edit className="h-4 w-4" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                      setItemToDelete({ type: 'task', id: task.id })
                                                      setIsDeleteConfirmOpen(true)
                                                    }}
                                                  >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}
                                    {provided.placeholder}
                                  </div>
                                </div>
                              )}
                            </Droppable>
                          ))}
                        </div>
                      </DragDropContext>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="notes">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Anotações e Lembretes</h2>
                    <Button onClick={() => setIsNoteDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Anotação
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map(note => (
                      <Card key={note.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>{note.title}</CardTitle>
                            {note.reminderDate && (
                              <Badge variant="outline" className="flex items-center">
                                <Bell className="h-4 w-4 mr-1" />
                                {format(note.reminderDate, 'dd/MM/yyyy HH:mm')}
                              </Badge>
                            )}
                          </div>
                          {note.relatedPhaseId && (
                            <CardDescription>
                              Relacionada à fase: {phases.find(p => p.id === note.relatedPhaseId)?.title}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="whitespace-pre-line">{note.content}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <p className="text-sm text-muted-foreground">
                            Criada em: {format(note.createdAt, 'dd/MM/yyyy HH:mm')}
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setCurrentNote(note)
                                setIsNoteDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setItemToDelete({ type: 'note', id: note.id })
                                setIsDeleteConfirmOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            {/* Phase Dialog */}
            <Dialog open={isPhaseDialogOpen} onOpenChange={setIsPhaseDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedPhase ? 'Editar Fase' : 'Nova Fase'}</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes da fase do projeto
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título</label>
                    <Input
                      value={currentPhase.title}
                      onChange={(e) => setCurrentPhase({ ...currentPhase, title: e.target.value })}
                      placeholder="Nome da fase"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <Textarea
                      value={currentPhase.description}
                      onChange={(e) => setCurrentPhase({ ...currentPhase, description: e.target.value })}
                      placeholder="Descreva o objetivo desta fase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Data de Início</label>
                      <div className="relative">
                        <Calendar
                          mode="single"
                          selected={currentPhase.startDate}
                          onSelect={(date) => date && setCurrentPhase({ ...currentPhase, startDate: date })}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Prazo Final</label>
                      <div className="relative">
                        <Calendar
                          mode="single"
                          selected={currentPhase.deadline}
                          onSelect={(date) => date && setCurrentPhase({ ...currentPhase, deadline: date })}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handlePhaseSubmit}>
                    {selectedPhase ? 'Salvar Alterações' : 'Criar Fase'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Task Dialog */}
            <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{currentTask.id ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes da tarefa
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título</label>
                    <Input
                      value={currentTask.title}
                      onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                      placeholder="Nome da tarefa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <Textarea
                      value={currentTask.description}
                      onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                      placeholder="Descreva a tarefa em detalhes"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Prioridade</label>
                      <Select
                        value={currentTask.priority}
                        onValueChange={(value) => setCurrentTask({ ...currentTask, priority: value as 'low' | 'medium' | 'high' })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baixa</SelectItem>
                          <SelectItem value="medium">Média</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <Select
                        value={currentTask.status}
                        onValueChange={(value) => setCurrentTask({ ...currentTask, status: value as 'todo' | 'in-progress' | 'done' })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">A Fazer</SelectItem>
                          <SelectItem value="in-progress">Em Andamento</SelectItem>
                          <SelectItem value="done">Concluída</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Prazo (opcional)</label>
                    <div className="relative">
                      <Calendar
                        mode="single"
                        selected={currentTask.dueDate}
                        onSelect={(date) => setCurrentTask({ ...currentTask, dueDate: date })}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleTaskSubmit}>
                    {currentTask.id ? 'Salvar Alterações' : 'Criar Tarefa'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Note Dialog */}
            <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{currentNote.id ? 'Editar Anotação' : 'Nova Anotação'}</DialogTitle>
                  <DialogDescription>
                    Adicione uma anotação ou lembrete para o projeto
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título</label>
                    <Input
                      value={currentNote.title}
                      onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                      placeholder="Título da anotação"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Conteúdo</label>
                    <Textarea
                      value={currentNote.content}
                      onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                      placeholder="Escreva sua anotação aqui..."
                      rows={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Lembrete (opcional)</label>
                    <div className="relative">
                      <Calendar
                        mode="single"
                        selected={currentNote.reminderDate}
                        onSelect={(date) => setCurrentNote({ ...currentNote, reminderDate: date })}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Relacionar à Fase (opcional)</label>
                      <Select
                        value={currentNote.relatedPhaseId}
                        onValueChange={(value) => setCurrentNote({ ...currentNote, relatedPhaseId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma fase" />
                        </SelectTrigger>
                        <SelectContent>
                          {phases.map(phase => (
                            <SelectItem key={phase.id} value={phase.id}>{phase.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Relacionar à Tarefa (opcional)</label>
                      <Select
                        value={currentNote.relatedTaskId}
                        onValueChange={(value) => setCurrentNote({ ...currentNote, relatedTaskId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma tarefa" />
                        </SelectTrigger>
                        <SelectContent>
                          {tasks.map(task => (
                            <SelectItem key={task.id} value={task.id}>{task.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleNoteSubmit}>
                    {currentNote.id ? 'Salvar Alterações' : 'Criar Anotação'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. {itemToDelete?.type === 'phase' && 'Todas as tarefas relacionadas também serão excluídas.'}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}