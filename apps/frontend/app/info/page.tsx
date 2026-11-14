"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { LineSpinner } from "ldrs/react"
import "ldrs/react/LineSpinner.css"
import { ArrowLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { UserLevel } from "@/components/userInfo/level"
import { UserQualification } from "@/components/userInfo/qualification"
import { UserInfo } from "@/components/userInfo/user_info"
import { RenderRoadmap } from "@/components/roadmap/renderRoadmap"
import { useUserInfoStore } from "@/zustand/userInfo"
import { useRouter } from "next/navigation"
import { useRoadmapStore } from "@/zustand/roadmap"
import { client } from "@/config/elysia-client"
import { toast } from "sonner"
import { userUserDataStore } from "@/zustand/userTokenData"

enum INFO_STATE { name, occupation, level }

export default function Page() {
  const [state, setState] = useState<INFO_STATE>(INFO_STATE.name)
  const [isLoading, setIsLoading] = useState(false)
  const {data, setData } = useRoadmapStore(d => d)
  const id = useUserInfoStore( u =>u.id)

  // select only what you need
  const name = useUserInfoStore((s) => s.name)
  const occupation = useUserInfoStore((s) => s.occupation)
  const level = useUserInfoStore((s) => s.level)
  const phoneNumber = useUserInfoStore((u) =>u.phoneNumber)
  const date = useUserInfoStore((u) => u.dob)
  // needed because of skipHydration: true
  useEffect(() => {
    useUserInfoStore.persist.rehydrate()
  }, [])
  const setToken = userUserDataStore(u => u.setToken)

  const router = useRouter()

  const handleNext = async () => {
    console.log("name -> ", name , "phonenumber -> ", phoneNumber, "occupation -> ", occupation, "level -> ", level, "dob -> ", date)
    if (state < INFO_STATE.level) {
      setState((p) => p + 1)
      return
    }
    try {
      setIsLoading(true)
      // const res = await axios.get("http://localhost:8080/api/roadmap", {
      //   params: { occupation, level, name },
      // })

      if(!id){
        toast.error("id is not present !")
        return 
      }
      const res = await client.api.v1.auth.info.post({
        dob : Date(),
        id : id, 
        level : level,
        occupation : occupation,
        phoneNumber : phoneNumber.toString(),
        username : name
      })
      
      if(res.data){
        
      }
      setData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <LineSpinner size="40" stroke="3" speed="1" color="black" />
      </div>
    )
  }

  if (data) {
    setData(data)
    router.push("/roadmap")
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="lg:h-100 lg:w-150 flex flex-col shadow-2xl bg-card-foreground">
        <CardTitle className="flex justify-start">
          <ArrowLeft
            className={`h-8 w-8 text-chart-2 lg:ml-3 hover:bg-[#2c5375] rounded-sm ${
              state === INFO_STATE.name ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={() => state > INFO_STATE.name && setState((p) => p - 1)}
          />
          <div className="text-secondary font-bold w-full text-2xl mr-12 text-center">
            User Details
          </div>
        </CardTitle>

        <CardContent>
          {state === INFO_STATE.name && <UserInfo />}
          {state === INFO_STATE.occupation && <UserQualification />}
          {state === INFO_STATE.level && <UserLevel />}
        </CardContent>

        <CardFooter className="p-0 bg-transparent m-2 border-none mt-auto lg:mb-4">
          <Button className="text-2xl h-10 w-full cursor-pointer" onClick={handleNext}>
            <span>{state === INFO_STATE.level && "Generate Roadmap"}</span>
            <ChevronsRight className="shrink-0 size-6" size={44} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}