'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PhaseItem } from "./PhaseItem";
import { ProgressBar } from "./ProgressBar";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Phase } from "@/types/types";

interface MainProps {
  phases: Phase[];
  progress: number;
}
const TimelineMain = ({phases, progress}: MainProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="lg:col-span-3 mt-8 lg:mt-10 flex flex-col space-y-6"
    >
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-indigo-500" />
              <span>Project Timeline</span>
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <ProgressBar progress={progress} />
          
          <div className="relative">
            <ol className="space-y-0">
              {phases.map((phase) => (
                <li key={phase.id}>
                  <PhaseItem phase={phase} />
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default TimelineMain;