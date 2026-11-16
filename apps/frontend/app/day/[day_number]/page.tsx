import { Suspense } from "react";
import DayContent from "@/components/day_content/day_content";

export default function Page({
  params,
}: {
  params: Promise<{ day_number: string }>;
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading day...</div>}>
        <DayLoader params={params} />
      </Suspense>
    </div>
  );
}

async function DayLoader({
  params,
}: {
  params: Promise<{ day_number: string }>;
}) {
  const { day_number } = await params;
  return <DayContent dayNumber={day_number} />;
}