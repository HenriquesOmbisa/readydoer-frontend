"use client"
import Navbar from "@/components/project/navbar";
import Sidebar from "@/components/project/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Handshake, Search, ChevronDown, ChevronUp, Star, Clock, FileText, Check, X, MessageSquare, Award, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

// Tipos e dados iniciais
type ProposalStatus = "pending" | "accepted" | "rejected" | "shortlisted";
type Proposal = {
  id: string;
  freelancerName: string;
  username: string;
  avatar: string;
  status: ProposalStatus;
  message: string;
  budget: number;
  deliveryTime: number; // em dias
  rating: number;
  skills: string[];
  portfolioItems: number;
  previousProjects: number;
  lastActive: string; // data
  attachments?: string[];
  isFavorite: boolean;
  experience: string; // anos de experiência
};

const initialProposals: Proposal[] = [
  {
    id: "1",
    freelancerName: "John Doe",
    username: "johndoe",
    avatar: "JD",
    status: "pending",
    message: "I'm a full-stack developer with 5 years of experience in React and Node.js. I've completed similar dashboard projects before and can deliver a high-quality product within your timeline.",
    budget: 500,
    deliveryTime: 14,
    rating: 4.8,
    skills: ["React", "Node.js", "TypeScript", "UI/UX"],
    portfolioItems: 12,
    previousProjects: 24,
    lastActive: "2025-04-20",
    attachments: ["proposal.pdf", "portfolio.pdf"],
    isFavorite: false,
    experience: "5 anos"
  },
  {
    id: "2",
    freelancerName: "Jane Smith",
    username: "janesmith",
    avatar: "JS",
    status: "shortlisted",
    message: "As a senior UI/UX designer, I'll create an intuitive and beautiful dashboard interface with a strong focus on user experience. My approach includes user research and iterative design.",
    budget: 750,
    deliveryTime: 21,
    rating: 4.9,
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    portfolioItems: 8,
    previousProjects: 18,
    lastActive: "2025-04-22",
    isFavorite: true,
    experience: "7 anos"
  },
  {
    id: "3",
    freelancerName: "Alex Johnson",
    username: "alexj",
    avatar: "AJ",
    status: "accepted",
    message: "Specialized in data visualization dashboards. I'll implement interactive charts and real-time data updates using D3.js and React. Let's discuss your specific requirements!",
    budget: 600,
    deliveryTime: 10,
    rating: 4.7,
    skills: ["D3.js", "Data Visualization", "React", "API Integration"],
    portfolioItems: 15,
    previousProjects: 32,
    lastActive: "2025-04-18",
    experience: "6 anos"
  }
];

const statusOptions = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "shortlisted", label: "Selecionadas" },
  { value: "accepted", label: "Aceitas" },
  { value: "rejected", label: "Recusadas" }
];

const sortOptions = [
  { value: "newest", label: "Mais recentes" },
  { value: "oldest", label: "Mais antigas" },
  { value: "budget_low", label: "Orçamento (menor)" },
  { value: "budget_high", label: "Orçamento (maior)" },
  { value: "rating", label: "Avaliação" }
];

export default function ProjectProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Filtragem e ordenação
  const filteredProposals = proposals
    .filter(proposal => 
      filterStatus === "all" || proposal.status === filterStatus
    )
    .filter(proposal => 
      searchQuery === "" ||
      proposal.freelancerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.skills.some(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
    ))
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        case "oldest":
          return new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
        case "budget_low":
          return a.budget - b.budget;
        case "budget_high":
          return b.budget - a.budget;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Ações
  const handleStatusChange = (id: string, newStatus: ProposalStatus) => {
    setProposals(proposals.map(proposal => 
      proposal.id === id ? { ...proposal, status: newStatus } : proposal
    ));
  };

  const toggleFavorite = (id: string) => {
    setProposals(proposals.map(proposal => 
      proposal.id === id ? { ...proposal, isFavorite: !proposal.isFavorite } : proposal
    ));
  };

  const toggleExpand = (id: string) => {
    setExpandedProposal(expandedProposal === id ? null : id);
  };

  const statusColor = (status: ProposalStatus) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "shortlisted": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:col-span-3 mt-8 lg:mt-10 flex flex-col space-y-6"
    >
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-3 text-purple-600">
              <Handshake className="w-5 h-5" />
              <span>Propostas de Freelancers</span>
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Filtros e Busca */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar freelancers ou habilidades..."
                className="pl-10 w-full px-3 py-2 border rounded-md text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border rounded-md text-sm"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border rounded-md text-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-sm font-medium">{proposals.length}</span>
              </div>
              <div className="text-2xl font-bold mt-1">{filteredProposals.length}</div>
            </Card>
            
            <Card className="p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Selecionadas</span>
                <span className="text-sm font-medium">
                  {proposals.filter(p => p.status === "shortlisted").length}
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {filteredProposals.filter(p => p.status === "shortlisted").length}
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Orçamento Médio</span>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold mt-1">
                ${(filteredProposals.reduce((sum, p) => sum + p.budget, 0) / (filteredProposals.length || 1)).toFixed(0)}
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Prazo Médio</span>
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold mt-1">
                {(filteredProposals.reduce((sum, p) => sum + p.deliveryTime, 0) / (filteredProposals.length || 1))} dias
              </div>
            </Card>
          </div>
          
          {/* Lista de Propostas */}
          {viewMode === "cards" ? (
            <div className="space-y-4">
              {filteredProposals.length > 0 ? (
                filteredProposals.map(proposal => (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium">
                                {proposal.avatar}
                              </div>
                              {proposal.isFavorite && (
                                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                                  <Star className="h-3 w-3 text-white fill-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-md font-semibold">{proposal.freelancerName}</h4>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  {proposal.rating}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">@{proposal.username}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs text-gray-500">{proposal.experience} experiência</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">{proposal.previousProjects} projetos</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={`${statusColor(proposal.status)}`}>
                              {statusOptions.find(s => s.value === proposal.status)?.label}
                            </Badge>
                            <button 
                              onClick={() => toggleFavorite(proposal.id)}
                              className="text-gray-400 hover:text-yellow-500"
                            >
                              <Star className={`h-4 w-4 ${proposal.isFavorite ? "text-yellow-500 fill-yellow-500" : ""}`} />
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 text-gray-600 text-sm whitespace-pre-wrap">
                          {proposal.message}
                        </div>

                        {expandedProposal === proposal.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                              <div>
                                <h5 className="text-sm font-medium mb-2">Habilidades</h5>
                                <div className="flex flex-wrap gap-2">
                                  {proposal.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Orçamento</h5>
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">${proposal.budget}</span>
                                  </div>
                                </div>
                                
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Prazo de Entrega</h5>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">{proposal.deliveryTime} dias</span>
                                  </div>
                                </div>
                              </div>
                              
                              {proposal.attachments && (
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Anexos</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {proposal.attachments.map((file, index) => (
                                      <a 
                                        key={index} 
                                        href="#" 
                                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                                      >
                                        <FileText className="h-4 w-4" />
                                        {file}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        <div className="mt-4 flex items-center justify-between">
                          <button
                            onClick={() => toggleExpand(proposal.id)}
                            className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                          >
                            {expandedProposal === proposal.id ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                Menos detalhes
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                Mais detalhes
                              </>
                            )}
                          </button>
                          
                          <div className="flex gap-2">
                            {proposal.status !== "rejected" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusChange(proposal.id, "rejected")}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Recusar
                              </Button>
                            )}
                            
                            {proposal.status === "pending" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusChange(proposal.id, "shortlisted")}
                              >
                                <Award className="h-4 w-4 mr-1" />
                                Selecionar
                              </Button>
                            )}
                            
                            {proposal.status === "shortlisted" && (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleStatusChange(proposal.id, "accepted")}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Aceitar
                              </Button>
                            )}
                            
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Mensagem
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma proposta encontrada</h3>
                  <p className="mt-1 text-sm text-gray-500">Tente ajustar seus filtros de busca</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orçamento</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prazo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avaliação</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProposals.map(proposal => (
                    <tr key={proposal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium">
                            {proposal.avatar}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{proposal.freelancerName}</div>
                            <div className="text-sm text-gray-500">@{proposal.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${statusColor(proposal.status)}`}>
                          {statusOptions.find(s => s.value === proposal.status)?.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${proposal.budget}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {proposal.deliveryTime} dias
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm text-gray-900">{proposal.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {proposal.status === "pending" && (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleStatusChange(proposal.id, "shortlisted")}
                            >
                              <Award className="h-4 w-4 mr-1" />
                              Selecionar
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}