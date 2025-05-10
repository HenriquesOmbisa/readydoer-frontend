import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { X, CalendarClock, Globe, Languages, DollarSign, Clock } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface Filter {
  minBudget: number,
    maxBudget: number,
    paymentModel: string,
    estimatedDuration: string,
    publishedDate: string,
    languages: string[]
}
interface FiltersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clearFilters: () => void
  setFilters: (filter: {minBudget: number,
    maxBudget: number,
    paymentModel: string,
    estimatedDuration: string,
    publishedDate: string,
    languages: string[]})=>  void
  filters: Filter
}

export function Filters({
  open,
  onOpenChange,
  setFilters,
  filters,
  clearFilters,
}: FiltersProps) {
  const filterContent = (
    <>
      {/* Orçamento */}
      <div className="space-y-2 mb-8">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-green-500" />
          Orçamento disponível
        </h3>
        <Slider
          defaultValue={[10, 1000]}
          min={10}
          max={5000}
          step={50}
          onValueChange={([min, max]) => {
            setFilters({
              ...filters,
              minBudget: min,
              maxBudget: max
            })
          }}
        />
        <p className="text-xs text-muted-foreground">${filters.minBudget} - ${filters.maxBudget}</p>
      </div>

      {/* Modelo de Pagamento */}
      <div className="space-y-2 mb-8">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Globe className="h-4 w-4 text-blue-500" />
          Modelo de pagamento
        </h3>
        {["Preço fixo", "Por hora"].map(option => (
          <Button key={option} variant="outline" className={`w-full justify-start ${filters.paymentModel == option ? 'bg-blue-50 hover:bg-blue-50 border-blue-300': ''}`} onClick={() => setFilters({...filters, paymentModel: filters.paymentModel != option ? option : ''})}>
            {option}
          </Button>
        ))}
      </div>

      {/* Duração estimada */}
      <div className="space-y-2 mb-8">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4 text-orange-500" />
          Duração estimada
        </h3>
        {["1 dia", "1 semana", "1 mês", "3+ meses"].map(option => (
          <Button key={option} variant="outline" className={`w-full justify-start ${filters.estimatedDuration == option ? 'bg-orange-50 hover:bg-orange-50 border-orange-300': ''}`} onClick={() => setFilters({...filters, estimatedDuration: filters.estimatedDuration != option ? option : ''})}>
            {option}
          </Button>
        ))}
      </div>

      {/* Data de publicação */}
      <div className="space-y-2 mb-8">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-yellow-500" />
          Publicado
        </h3>
        {["Hoje", "Esta semana", "Este mês"].map(option => (
          <Button key={option} variant="outline" className={`w-full justify-start ${filters.publishedDate == option ? 'bg-yellow-50 hover:bg-yellow-50 border-yellow-300': ''}`} onClick={() => setFilters({...filters, publishedDate: filters.publishedDate != option ? option : ''})}>
            {option}
          </Button>
        ))}
      </div>

      {/* Idioma */}
      <div className="space-y-2 mb-8">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Languages className="h-4 w-4 text-red-500" />
          Idioma
        </h3>
        <div className="flex gap-2 flex-wrap">
          {["PT", "EN", "ES", "FR"].map(lang => (
            <Button key={lang} variant="outline" className={`px-3 py-1 text-xs rounded-full ${filters.languages.includes(lang) ? 'bg-red-50 hover:bg-red-50 border-red-300 text-red-500 hover:text-red-500': ''}`} onClick={() => setFilters({...filters, languages: filters.languages.includes(lang) ? filters.languages.filter(language=> language != lang ): [...filters.languages, lang]})}>
              {lang}
            </Button>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Limpar filtros
      </Button>
    </>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block lg:w-80">
        <Card className="sticky top-4 shadow-sm">
          <CardHeader className="border-b">
            <h3 className="font-semibold">Filtros</h3>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {filterContent}
          </CardContent>
        </Card>
      </div>

      {/* Mobile */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full max-w-sm p-0 overflow-y-auto [&>button]:hidden">
          <Card className="h-full flex flex-col border-0 shadow-none">
            <CardHeader className="border-b px-4 pt-4 flex justify-between items-center">
              <h3 className="font-semibold">Filtros</h3>
              <X className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => onOpenChange(false)} />
            </CardHeader>
            <CardContent className="space-y-4 pt-4 px-4">
              {filterContent}
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
    </>
  )
}
