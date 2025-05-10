import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function SkeletonFreelancerCard() {
  return (
    <Card>
      <div className="flex p-4">
        <Skeleton className="h-16 w-16 rounded-full mr-4" />
        <div className="flex-1 space-y-3">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[90%]" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </Card>
  );
}