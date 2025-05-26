import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function ExampleSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-[40%]" />
        <Skeleton className="h-4 w-[20%]" />
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-[40%]" />
          <Skeleton className="h-6 w-[60%]" />
        </div>

        <Separator orientation="horizontal" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-[30%]" />
          <Skeleton className="h-4 w-[40%]" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-[40%]" />
          <Skeleton className="h-4 w-[20%]" />
        </div>
      </CardContent>
    </Card>
  )
}