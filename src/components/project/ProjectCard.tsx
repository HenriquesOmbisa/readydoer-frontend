import { ProjectCardType } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Clock3, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import ProjectDeliverables from "./ProjectDeliverables";
import Link from "next/link";

export default function ProjectCard({ project }: {project: ProjectCardType }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <Card className="hover:shadow-md transition-shadow h-full gap-2">
      <CardHeader className="py-1 h-max">
        
        <div className="flex items-start justify-between gap-2">
          <div className="max-w-[75%]">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{project.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>
          <span className="font-bold text-blue-600">{formatCurrency(project.budget)}</span>
        </div>

      </CardHeader>
      <CardContent className="py-1">
        
        <div className="flex flex-wrap gap-2 my-0">
          {project.skills ? project.skills.map((skill: string) => (
            <span 
              key={skill} 
              className="bg-blue-50 text-blue-700 px-3 py-1 text-xs rounded-full"
            >
              {skill}
            </span>
          )): null}
          { }
        </div>
        {project.deliverables && <ProjectDeliverables list={project.deliverables} /> }
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t py-0 h-max">
        <div className="flex gap-4">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Clock3 className="w-4 h-4" /> {project.createdAt}
          </span>
        </div>
        <Link href={"/project/1"}>
          <Button
            size="sm"
            className="inline-flex items-center px-4 py-4 border border-transparent text-sm font-medium rounded-md shadow-sm cursor-pointer bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
