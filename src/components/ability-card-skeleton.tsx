import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function AbilityCardSkeleton() {
  return (
    <button className="w-full">
      <Card className="flex flex-col gap-4">
        <CardHeader className="gap-4">
          <div className="flex justify-between gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-16" />
          </div>

          <div className="gap-1 flex flex-col w-full items-start">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        </CardHeader>

        <CardContent className="gap-1 flex flex-col w-full items-start">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-4 w-full" />
        </CardContent>

        <CardFooter className="gap-2">
          <Skeleton className="h-8 w-full" />
        </CardFooter>
      </Card>
    </button>
  );
}