import { CardContent, Card, CardTitle, CardHeader } from "@/components/ui/card";
import { ProgressGraph } from "./ProgressGraph";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div className="p-4 h-[90%] grid grid-cols-2 gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ProgressGraph />
      </Suspense>
      <Card>
        <CardHeader>
          <CardTitle>Pick up where you left off</CardTitle>
        </CardHeader>
        <CardContent>
            Progress
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Explore something new</CardTitle>
        </CardHeader>
        <CardContent>
            Progress
        </CardContent>
      </Card>
    </div>
  );
}
