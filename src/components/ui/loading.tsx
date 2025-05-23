// components/ui/loading.tsx
import { Loader2 } from 'lucide-react'

export function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin h-8 w-8 text-primary" />
    </div>
  )
}