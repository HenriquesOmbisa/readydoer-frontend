"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, ShieldCheck, Zap, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { FreelancerCardType } from '@/types/types';
import { Filters } from "@/components/hire/Filters";
import Image from "next/image";
import { FreelancerCard } from "@/components/hire/FreelancerCard";
import { SkeletonFreelancerCard } from "@/components/hire/SkeletonFreelancerCard";

const mockFreelancers: FreelancerCardType[] = [
  {
    id: "use_1",
    picture: "https://i.pravatar.cc/150?img=1",
    name: "Mike Smith",
    title: "Full Stack developper",
    skills: ["C++", "Go", "PHP", "NodeJS", "React", "NextJS", "Postgres", "MySQL"],
    availability: "available",
    rating: 4.7,
    rate: "$45 /hour",
    tasks: ["Bot development", "deploy projects", "build landing page", "build web apps", "Create mobile apps"],
    location: "California, USA"
  },
  {
    id: "use_2",
    picture: "https://i.pravatar.cc/150?img=2",
    name: "John Doe",
    title: "UI/UX Designer",
    skills: ["Figma", "Photoshop", "UI/UX"],
    availability: "unavailable",
    rating: 3.5,
    rate: "$39 /hour",
    tasks: ["Creative UI Design for digital products"],
    location: "Helsinki, Finland"
  },
  {
    id: "use_3",
    picture: "https://i.pravatar.cc/150?img=5",
    name: "Jennifer Olson",
    title: "Digital Marketing & Sales",
    skills: ["International SEO", "Technical SEO", "Blog & Newsletter Management"],
    availability: "unavailable",
    rating: 3.5,
    rate: "$39 /hour",
    tasks: ["Daily SEO tasks", "SEO audits", "Content strategy", "Content creation"],
    location: "Portland, USA"
  },
]

export default function BrowsePage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFilters, setOpenFilters] = useState(false)
  const [filters, setFilters] = useState<{
    availability: string,
    responseTime: string[]
  }>({
    availability: "",
    responseTime: [],
  });

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const clearFilter = ()=>{
    setFilters({
      availability: "",
      responseTime: []
    })
  }

  return (
    <div className="relative bg-gray-50 min-h-screen">
      
      {/* Hero Section Premium */}
      <div className="relative h-[80vh] max-h-[80vh] md:h-[500px] text-white pt-12 md:pt-0 pb-2 overflow-hidden">
        {/* Background com overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-s"></div>
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Profissionais trabalhando"
            width={500}
            height={500}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-3xl mx-auto text-center mb-4 md:mb-4 animate-fade-in">
            {/* Subtítulo com efeito */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-max mx-auto text-base md:text-lg font-semibold tracking-wider text-blue-800 uppercase bg-blue-200/70 px-4 rounded-2xl mb-8 md:mb-2"
            >
              ON-DEMAND SOLUTIONS
            </motion.p>
            
            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-12 md:leading-12"
            >
              Hire the best experts on the market
            </motion.h1>
            
            {/* Descrição */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100/90 mb-0 leading-tight"
            >
              50,000+ verified professionals ready to deliver exceptional results
            </motion.p>
          </div>
          
          {/* Barra de Busca Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className=" max-w-2xl md:w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-1.5 border mt-0 md:mt-0 border-white/20"
          >
            <div className="flex">
              <Input
                className="border-0 shadow-none focus-visible:ring-0 text-gray-800 h-14 text-lg"
                placeholder={"Ex: Designer UX, Dev React, Redator SEO..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="bg-blue-600 hover:bg-blue-700 h-14 px-6 text-lg flex items-center gap-2"
                size="lg"
              >
                <Search className="h-5 w-5" /> 
                <span className="hidden sm:inline">Encontrar</span>
              </Button>
            </div>
            
            {/* Tags rápidas */}
            <div className="hidden flex-wrap gap-2 mt-3 px-3 pb-2">
              <span className="text-xs text-gray-500">Populares:</span>
                <>
                  <button 
                    onClick={() => setSearchQuery("Designer UI/UX")}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition"
                  >
                    Designer UI/UX
                  </button>
                  <button 
                    onClick={() => setSearchQuery("Desenvolvedor Full Stack")}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition"
                  >
                    Full Stack
                  </button>
                  <button 
                    onClick={() => setSearchQuery("Marketing Digital")}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition"
                  >
                    Marketing
                  </button>
                </>
            </div>
          </motion.div>
          
          {/* Destaques */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden lg:flex gap-6 justify-center mt-4"
          >
            <div className="flex items-center gap-2 text-blue-200">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>Freelancers verificados</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              <ShieldCheck className="h-5 w-5 text-blue-300" />
              <span>Pagamentos seguros</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              <Zap className="h-5 w-5 text-yellow-300" />
              <span>Entregas rápidas</span>
            </div>
          </motion.div>
        </div>
        
        {/* Efeito de gradiente na base */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-0"></div>
      </div>
      <Navbar />

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar de Filtros */}
          <Filters 
            setFilters={setFilters}
            filters={filters}
            onOpenChange={setOpenFilters}
            open={openFilters}
            clearFilters={clearFilter}
           />
          {/* Listagem Principal */}
          <main className="flex-1">
            {/* Controles Superiores */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-800 font-bold">Sorted by:</span>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-max shadow-none text-sm text-gray-800">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevância</SelectItem>
                      <SelectItem value="newest">Mais recentes</SelectItem>
                        <SelectItem value="rate">Preço: menor primeiro</SelectItem>
                      <SelectItem value="rating">Melhor avaliados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="block lg:hidden">
                  <Button variant={"ghost"} size={"icon"} onClick={()=> setOpenFilters(true)}>
                  <SlidersHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Listagem de Resultados */}
            {loading ? (
              <div className={"space-y-4"}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonFreelancerCard key={i} />
                ))}
              </div>
            ) : mockFreelancers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">Nenhum resultado encontrado</h3>
                <p className="text-gray-500 mt-1">
                  Tente ajustar seus filtros ou termos de busca
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                >
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                <div className={"space-y-4"}>
                  {mockFreelancers.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FreelancerCard item={item} />
                      
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
