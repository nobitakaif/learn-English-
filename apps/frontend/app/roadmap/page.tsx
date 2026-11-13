"use client"
import GenerateRoadMap from "@/components/roadmap/generateRoadmap";
import { RenderRoadmap } from "@/components/roadmap/renderRoadmap";
import { useRoadmapStore } from "@/zustand/roadmap";

export default function Page(){
    const data = useRoadmapStore(d => d.data)
    return <div>
        <RenderRoadmap data={data} />
    </div>
}