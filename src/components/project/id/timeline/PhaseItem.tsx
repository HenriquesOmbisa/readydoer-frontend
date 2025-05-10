// components/project/PhaseItem.tsx
'use client';

import { Phase } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function PhaseItem({ phase }: { phase: Phase }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative border-l-2 border-indigo-200 pl-6 pb-8">
      <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-2 border-2 border-white shadow-md" />
      
      <div 
        className="bg-white p-4 rounded-lg shadow-none hover:shadow-none transition-shadow cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div>
            <time className="text-xs font-medium text-gray-500">
              {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.deadline).toLocaleDateString()}
            </time>
            <h3 className="mt-1 text-lg font-semibold text-gray-800">
              {phase.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {phase.description}
            </p>
            
            <div className="flex gap-2 mt-3">
              <span className={`text-xs px-2 py-1 rounded-full ${
                phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                phase.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {phase.status === 'completed' ? 'Concluído' :
                 phase.status === 'in_progress' ? 'Em progresso' : 'Planejado'}
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                {phase.taskCount} tarefas
              </span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-indigo-500">
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium mb-3">Tarefas</h4>
            <div className="space-y-3">
              {phase.tasks.map(task => (
                <div key={task.id} className="p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between">
                    <h5 className="font-medium">{task.title}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority === 'high' ? 'Alta' : 
                       task.priority === 'medium' ? 'Média' : 'Baixa'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${
                      task.status === 'completed' ? 'text-green-600' :
                      task.status === 'in_progress' ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {task.status === 'completed' ? 'Concluído' :
                       task.status === 'in_progress' ? 'Em progresso' : 'Pendente'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Prazo: {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}