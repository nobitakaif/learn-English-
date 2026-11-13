import { create, createStore } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { UserInfoState, UserInfoStore } from "./stateTypes"
import { set } from "date-fns"

const userInfoDefault : UserInfoState = {
    dob : Date.now(),
    level : "BEGINNER",
    name : "",
    id : "",
    occupation : "STUDENT",
    phoneNumber : 10000000000
}  

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      ...userInfoDefault,
      setName: (name : string) => set({ name }),
      setDob: (dob : any) => set({ dob }),
      setLevel: (level : any) => set({ level }),
      setPhoneNumber: (phoneNumber : number) => set({ phoneNumber }),
      setOccupation: (occupation : any) => set({ occupation }),
      setId : (id : string) => set({id})
    }),
    {
      name: "user-info",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // we rehydrate manually on the client (see page)
    }
  )
)