import { createJSONStorage, persist } from "zustand/middleware"
import { RoadmapState, RoadmapStore } from "./stateTypes"
import { create } from "zustand"

export { create } from "zustand"

const roadmapDefault : RoadmapState = {
    data : ""
}

export const useRoadmapStore = create<RoadmapStore>()(
    persist(
        (set)=>({
            ...roadmapDefault, 
            setData : (d : any) => set({data : d})
        }),{
            name : "user-roadmap",
            storage : createJSONStorage(() => localStorage),
            skipHydration : true,

        }
    )
)