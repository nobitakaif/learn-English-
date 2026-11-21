import { create, createStore } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { Occupation, UserInfoState, UserInfoStore } from "./stateTypes"


const userInfoDefault : UserInfoState = {
    dob : Date.now(),
    level : "BEGINNER",
    name : "",
    id : "",
    occupation : "STUDENT",
    phoneNumber : 0
}  

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      ...userInfoDefault,
      setName: (name : string) => set({ name }),
      setDob: (dob : any) => set({ dob }),
      setLevel: (level : any) => set({ level }),
      setPhoneNumber: (phoneNumber : number) => set({ phoneNumber }),
      setOccupation: (occupation : Occupation) => set({ occupation }),
      setId : (id : string) => set({id})
    }),
    {
      name: "user-info",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // we rehydrate manually on the client (see page)
    }
  )
)