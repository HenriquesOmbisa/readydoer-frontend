// app/dashboard/layout.tsx
import { Sidebar } from '@/components/dashboard/Sidebar'
import { ReactNode } from 'react'
import Script from 'next/script'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-auto p-4 bg-muted/30">
          {children}
        </main>
        <Script src="https://www.gstatic.com/charts/loader.js" strategy="afterInteractive" />
      </div>
    </div>
  )
}