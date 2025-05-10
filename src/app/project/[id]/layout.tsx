"use client"; // adiciona isso aqui pra virar Client Component

import type { ReactNode } from 'react';
import Navbar from "@/components/project/id/navbar";
import Sidebar from "@/components/project/id/Sidebar";
import { usePathname } from "next/navigation"; // importa o usePathname

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  
  // Verifica se estamos em "messages" ou "panel"
  const isSpecialPage = pathname.includes("/messages") || pathname.includes("/panel");

  return (
    <section>
      <div className={isSpecialPage ? `h-screen` : `bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}>
        <Navbar />
        <div className={` ${isSpecialPage ? "" : "container mx-auto px-4 sm:px-6 pb-10 grid gap-8 grid-cols-1 lg:grid-cols-4"}`}>
          {/* Só mostra Sidebar se não for messages ou panel */}
          {!isSpecialPage && <Sidebar />}
          {children}
        </div>
      </div>
    </section>
  );
}
