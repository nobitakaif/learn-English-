// zustand/stateTypes.ts
export type Level = "BEGINNER" | "MEDIUM" | "ADVANCE" | "TEST"
export type Occupation = "STUDENT" | "WORKING"

export interface UserInfoState {
  name: string
  dob: number | Date
  phoneNumber: string
  occupation: Occupation
  level: Level
  id : string | undefined
}

export interface RoadmapState {
  data : any
}

export interface RoadmapAction{
  setData : (d:any) => void
}
export type RoadmapStore = RoadmapState & RoadmapAction 


export interface UserInfoAction {
  setName: (name: string) => void
  setDob: (dob: number | Date) => void
  setPhoneNumber: (phoneNumber: string) => void
  setOccupation: (occupation: Occupation) => void
  setLevel: (level: Level) => void
  setId : (id : string) => void
}

export type UserInfoStore = UserInfoState & UserInfoAction

export interface UserDataState {
  token : string | null
}
export interface UserDataAction {
  setToken : (t : any) => void
}
export type UserDataStore = UserDataState & UserDataAction