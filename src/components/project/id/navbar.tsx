"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Edit, LayoutDashboard, CalendarClock, FileText, FolderOpen, MessageSquare, ChevronLeft, Banknote, Kanban } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

interface LinkType {
  title: string;
  icon: JSX.Element;
  href: string;
}

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const links: LinkType[] = [
    { title: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, href:'/project/1' },
    { title: 'Timeline', icon: <CalendarClock className="w-4 h-4" />, href:'/project/1/timeline' },
    { title: 'Proposal', icon: <FileText className="w-4 h-4" />, href:'/project/1/proposals' },
    { title: 'Messages', icon: <MessageSquare className="w-4 h-4" />, href:'/project/1/messages' },
    { title: 'Panel', icon: <Kanban className="w-4 h-4" />, href:'/project/1/panel' }
  ]
  return (
    <header className="sticky z-30 h-16 top-0 py-3 px-8 bg-white border-b">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2 sm:gap-2">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl sm:text-xl font-bold text-gray-800 hidden md:block">
              Freelancer SaaS
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {links.map((link, i)=> {
               const pathParts = path.split('/').filter(Boolean);
               const currentPage = pathParts[pathParts.length - 1];
             
               const linkParts = link.href.split('/').filter(Boolean);
               const linkPage = linkParts[linkParts.length - 1];
             
               const isActive = currentPage === linkPage;
              return (
                <Link key={i} href={link.href}>
                  <Button variant="ghost" className={`text-sm gap-1 cursor-pointer ${isActive && 'bg-gray-100'} outline-none`} title={link.title}>
                    {link.icon}
                    <span className="hidden sm:inline">{link.title}</span>
                  </Button>
                </Link>
              );
            })}
            <Button
              className="gap-2 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-600 hover:to-blue-900"
              title="Editar"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Editar</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default Navbar;