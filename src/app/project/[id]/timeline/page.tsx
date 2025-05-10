// app/project/timeline/page.tsx
import { Phase } from "@/types/types";
import TimelineMain from "@/components/project/id/timeline/TimelineMain";


// Mock data - Agora pode ser substituído por uma chamada API
const getPhases = async (): Promise<Phase[]> => {
  // Na prática, você faria uma chamada API aqui:
  // const res = await fetch('https://api.example.com/phases');
  // return res.json();
  
  return [
    {
      id: 1,
      title: "Prototipo da dashboard",
      description: "Desenvolvimento do protótipo no Figma",
      status: "completed",
      taskCount: 3,
      startDate: "2025-04-10",
      deadline: "2025-04-22",
      tasks: [
        {
          id: 1,
          title: "Criar wireframes",
          description: "Desenhar as telas básicas da aplicação",
          status: "completed",
          priority: "high",
          deadline: "2025-04-12"
        },
        // ... outros tasks
      ]
    },
    // ... outras phases
  ];
};

export default async function ProjectTimelinePage() {
  const phases = await getPhases();
  const progress = Math.round(
    (phases.filter(phase => phase.status === "completed").length / 
    phases.length) * 100);

  return (
    <TimelineMain phases={phases} progress={progress} />
  );
}