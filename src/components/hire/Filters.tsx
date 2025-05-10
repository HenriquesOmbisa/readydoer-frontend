import { CalendarX, Clock, Globe, X, Zap } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Sheet, SheetContent } from "../ui/sheet"

interface Filter {
  availability: string,
  responseTime: string[]
}

interface FiltersProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
  clearFilters: () => void
  setFilters: (filter: {
    availability: string,
    responseTime: string[]
  })=>  void
  filters: Filter
}

export function Filters ({
  open,
  onOpenChange,
  setFilters,
  filters,
  clearFilters
}: FiltersProps) {

  const filterContent = (
      <>
        <div>
          {/* Filtro de Disponibilidade Aprimorado */}
          <div className="space-y-4 mb-12">
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Disponibilidade
            </h3>
            <div className="space-y-3">
              {[
                { 
                  value: 'all', 
                  label: 'Qualquer disponibilidade', 
                  icon: <Globe className="h-4 w-4 text-gray-500" /> 
                },
                { 
                  value: 'available', 
                  label: 'Disponível agora', 
                  icon: <Zap className="h-4 w-4 text-green-500" /> 
                },
                { 
                  value: 'limited', 
                  label: 'Disponibilidade limitada', 
                  icon: <Clock className="h-4 w-4 text-yellow-500" /> 
                },
                { 
                  value: 'unavailable', 
                  label: 'Atualmente ocupado', 
                  icon: <CalendarX className="h-4 w-4 text-red-500" /> 
                }
              ].map(option => (
                <div 
                  key={`availability-${option.value}`}
                  className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                    filters.availability === option.value
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      availability: filters.availability !== option.value ? option.value : ""
                    });
                    onOpenChange(false);
                  }}
                >
                  <div className={`flex items-center justify-center h-5 w-5 rounded-full mr-3 ${
                    filters.availability === option.value
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {option.icon}
                  </div>
                  <label 
                    htmlFor={`availability-${option.value}`}
                    className={`text-sm cursor-pointer ${
                      filters.availability === option.value
                        ? 'text-blue-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
  
          <div className="space-y-4 mb-12">
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-500" />
              Tempo de Resposta
            </h3>
            <div className="flex-1 flex-col space-y-2">
              {[
                { value: '1h', label: 'Até 1 hora', count: 24 },
                { value: '4h', label: 'Até 4 horas', count: 156 },
                { value: '24h', label: 'Até 24 horas', count: 342 },
              ].map(option => (
                <Button
                  key={option.count}
                  variant={"outline"}
                  className= {`w-full flex justify-between font-normal text-gray-700 cursor-pointer text-sm ${filters.responseTime.includes(option.value) ? "bg-sidebar-accent-foreground hover:bg-sidebar-accent-foreground border-sidebar-accent-foreground text-white hover:text-white": ""}`}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      responseTime: filters.responseTime.includes(option.value)
                      ? filters.responseTime.filter((resp: string) => resp !== option.value) // REMOVE se já tem
                      : [...filters.responseTime, option.value]                    // ADICIONA se não tem
                    })
                    onOpenChange(false)
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full mb-4"
          onClick={()=> clearFilters()} 
        >
          Limpar filtros
        </Button>
      </>
    )

    return (
      <>
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
          <SheetContent side="right" className="w-full max-w-sm p-0 overflow-y-auto [&>button]">
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