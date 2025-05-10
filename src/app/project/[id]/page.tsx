"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Zap, Package, AlignLeft, Banknote, BarChart, CheckCircle, Hourglass, CalendarDays, ArrowRightCircle} from "lucide-react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round";
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));
  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;
  return (
    <div className="relative w-max">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />
        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn("stroke-primary", progressClassName)}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

export default function ProjectoPage () {
  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3 mt-10 flex flex-col space-y-0 rounded-md shadow-sm bg-white"
        >
          <Card className="border-0 shadow-none gap-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlignLeft className="w-5 h-5 text-blue-500" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {"Precisamos de um desenvolvedor full-stack para construir uma plataforma freelancer com funcionalidades avançadas de gerenciamento de projetos, chat em tempo real e sistema de pagamentos integrado.\n\nO projeto deve ser desenvolvido usando React para o frontend e Node.js para o backend. Esperamos um design moderno e responsivo que ofereça ótima experiência tanto para freelancers quanto para clientes.".split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-3 text-gray-700">{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none gap-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-yellow-500" />
                Deliverables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col space-y-3 text-gray-500 text-sm">
                {["Redesigned dashboard with key metrics", "Custom project templates", "Knowledge base integration", "Team onboarding documentation"].map((deliverable, index) => (
                  <li key={index} className="flex items-center gap-1 border rounded-full w-max px-3 py-0.5">
                    <Check className="w-4 h-4 text-green-600"/>
                    {deliverable}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none gap-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-green-500" />
                Paymants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Card className="shadow-none">
                  <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <h3 className="text-2xl font-bold mt-1">$800</h3>
                    </div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400`}>
                      <BarChart className="w-5 h-5"/>
                    </div>
                  </div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Payed</p>
                      <h3 className="text-2xl font-bold mt-1">$500</h3>
                    </div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400`}>
                      <CheckCircle className="w-5 h-5"/>
                    </div>
                  </div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pendent</p>
                      <h3 className="text-2xl font-bold mt-1">$200</h3>
                    </div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400`}>
                      <Hourglass className="w-5 h-5"/>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none gap-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-indigo-500" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Start date</p>
                  <p className="text-md font-medium text-gray-800 dark:text-gray-300">Apr 10, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="text-md font-medium text-gray-800 dark:text-gray-300">May 10, 2025</p>
                </div>
                <div className="relative -top-12">
                  <CircularProgress
                    value={40}
                    size={120}
                    strokeWidth={10}
                    showLabel
                    labelClassName="text-xl font-bold"
                    renderLabel={(progress) => `${progress}%`}
                    className="stroke-indigo-500/25"
                    progressClassName="stroke-indigo-600"
                  />
                  <p className="relative -top-4 text-sm mt-1 text-indigo-600 font-medium">15 days remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none gap-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightCircle className="w-5 h-5 text-purple-500" />
                Next Step
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Finalizar o design responsivo da dashboard e começar a implementar os componentes interativos com TailwindCSS + React.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-muted-foreground">
                    Due by: <span className="font-medium text-gray-800 dark:text-gray-200">Apr 28, 2025</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300">
                    <Zap className="w-3 h-3" />
                    In Progress
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
  )
}