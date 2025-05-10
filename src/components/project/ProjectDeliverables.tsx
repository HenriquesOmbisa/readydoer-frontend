import { Check } from "lucide-react";

export default function ProjectDeliverables ({list}: {list: string[]}) {
  return(
    <ul className="mt-4 flex items-center flex-wrap gap-x-2 gap-y-1 mb-1 ">
      {list.map((task: string, i: number) => (
        <li key={i} className="flex items-start gap-1">
          <Check className="w-4 h-4 mt-0.5 mr-0 text-green-500 flex-shrink-0"  aria-hidden="true" />
          <span className="text-sm text-gray-500">{task}</span>
        </li>
      ))}
    </ul>
  )
}