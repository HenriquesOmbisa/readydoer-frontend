/* Freelancers */

export type FreelancerCardType = {
  id: string
  picture: string
  name: string
  title: string
  skills: string[]
  availability: 'available' | 'limited' | 'unavailable'
  rating: number
  rate: string
  tasks: string[]
  location?: string
}



/* Project */

export type ProjectCardType = {
  id: string
  title: string
  description: string
  deliverables?: string[]
  budget: number
  skills?: string[]
  createdAt: string
}

/* Task */
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
}

/* Phase */
export interface Phase {
  id: number;
  title: string;
  description: string;
  status: 'planned' | 'in_progress' | 'completed' | 'blocked';
  taskCount: number;
  startDate: string;
  deadline: string;
  tasks: Task[];
}