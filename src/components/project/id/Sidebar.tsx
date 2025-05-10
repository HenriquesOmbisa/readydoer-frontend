"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Check, Code, Layout, Palette, Send, Smartphone, Zap, Clock, Archive } from "lucide-react";
import { JSX } from "react";
import { BsLightningCharge, BsPaletteFill } from "react-icons/bs";
import { FaRocket } from "react-icons/fa";
import { FiCalendar, FiDollarSign } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";

const ProjectStatus = ({ status }: { status: string }) => {
  const statusConfig = {
    public: {
      icon: <FaRocket className="w-4 h-4" />,
      text: 'Aberto para propostas',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    private: {
      icon: <GiProgression className="w-4 h-4" />,
      text: 'Em andamento',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    archived: {
      icon: <Archive className="w-4 h-4" />,
      text: 'Arquivado',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full border ${statusConfig[status as keyof typeof statusConfig].color}`}
    >
      {statusConfig[status as keyof typeof statusConfig].icon}
      {statusConfig[status as keyof typeof statusConfig].text}
    </motion.div>
  )
}

const SkillBadge = ({ skill }: { skill: string }) => {
  const skillIcons: Record<string, JSX.Element> = {
    'React': <Code className="w-4 h-4" />,
    'Node.js': <Code className="w-4 h-4" />,
    'TypeScript': <Code className="w-4 h-4" />,
    'Next.js': <Layout className="w-4 h-4" />,
    'PostgreSQL': <Layout className="w-4 h-4" />,
    'UI/UX': <Palette className="w-4 h-4" />,
    'Figma': <BsPaletteFill className="w-4 h-4" />,
    'Mobile': <Smartphone className="w-4 h-4" />
  };

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-full">
      {skillIcons[skill] || <Code className="w-4 h-4" />}
      <span className="text-sm font-medium text-gray-700">{skill}</span>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div>
      <aside className="lg:col-span-1 mt-10">
        <div className="space-y-4">
          {/* Project Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="flex flex-col gap-6 md:flex-col md:justify-between md:items-start">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">Freelancer SaaS</h1>
                    <ProjectStatus status={'public'} />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-full">
                      <FiDollarSign className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">$ 800</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{'3 month'}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                      <FiCalendar className="w-4 h-4 text-green-500" />
                      <span>Publicado em {new Date('2023-10-15').toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Client Card */}
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200"
                >
                  <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                    <AvatarImage src={""} />
                    <AvatarFallback className="bg-black font-black text-white">
                      {"Rodigo".charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex flex-col">
                        <h3 className="font-medium text-gray-900">Rodrigo Silva</h3>
                        <p className="text-sm text-gray-600">Cliente</p>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-br from-blue-50 to-purple-50">
                        <Check className="w-3 h-3 text-blue-500" />
                        <span className="text-xs">Verificado</span>
                      </Badge>
                    </div>
                    
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
          {/* Skills Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Habilidades Requeridas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Next.js","React", "Go", "UI/UX", "PostgreSQL"].map(skill => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BsLightningCharge className="w-5 h-5 text-purple-500" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Propostas</span>
                    <span className="font-medium">5</span>
                  </div>
                  <Progress
                    value={(5 / 10) * 100}
                    className="h-2 bg-gray-100 [&>div]:bg-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Visualizações</span>
                    <span className="font-medium">124</span>
                  </div>
                  <Progress value={124 / 2} className="h-2 bg-gray-100 [&>div]:bg-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA for Freelancers */}
          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Proposta
              </Button>
            </motion.div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;