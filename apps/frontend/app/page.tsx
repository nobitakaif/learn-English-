"use client"
import { Button } from "@/components/ui/button";
import  { type App } from "@repo/elysia/app"
import { treaty } from "@elysiajs/eden"
import { client } from "@/config/elysia-client";
import { useState } from "react";
import axios from "axios"
import GenerateRoadMap from "@/components/roadmap/generateRoadmap";
import { RoadmapData, UserView } from "@/components/landing Page/authorizedUser";
import { Navbar } from "@/components/navbar/navbar";
 "@/components/roadmap/generateRoadmap";

 
type UserViewProps = {
   view: RoadmapData;
 };

export default function Page(){

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<RoadmapData | undefined>()

  return <div className="p-5">

      <Navbar/>

      {/* <Button  className ="p-2 h-8 text-lg  " 
        onClick={async () => {
          setIsLoading(true)
          console.log("reacher here!")
          const res = await axios.get("http://localhost:8000/api/roadmap?occupation=bio_engineer")
          setData(res.data)
          console.log(res.data)
          setIsLoading(false)
          }}
      > Generate Roadmap</Button>

    <UserView view={data}/> */}
      
  </div>
}