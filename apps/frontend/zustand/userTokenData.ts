import { create } from "zustand"
import { UserDataAction, UserDataState, UserDataStore } from "./stateTypes"
import { createJSONStorage, persist } from "zustand/middleware"


const userDataDefault : UserDataState ={
    token : null
} 

export const userUserDataStore = create<UserDataStore>()(
    persist(
        (set) =>({
            ...userDataDefault,
            setToken : (t : string) => set({token : t})
        }),{
            name : "user-encrypted",
            storage : createJSONStorage(() => localStorage),
            skipHydration : true
        }
    )
)