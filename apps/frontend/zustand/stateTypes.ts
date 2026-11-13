// zustand/stateTypes.ts
export type Level = "BEGINNER" | "MEDIUM" | "ADVANCE" | "TEST"
export type Occupation = "STUDENT" | "WORKING"

export interface UserInfoState {
  name: string
  dob: number | Date
  phoneNumber: number
  occupation: Occupation
  level: Level
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
  setPhoneNumber: (phoneNumber: number) => void
  setOccupation: (occupation: Occupation) => void
  setLevel: (level: Level) => void
}

export type UserInfoStore = UserInfoState & UserInfoAction