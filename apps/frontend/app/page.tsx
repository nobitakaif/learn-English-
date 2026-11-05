"use client"
import { Button } from "@/components/ui/button";
import  { type App } from "@repo/elysia/app"
import { treaty } from "@elysiajs/eden"
import { client } from "@/config/elysia-client";
import { useState } from "react";
import axios from "axios"
import GenerateRoadMap from "@/components/roadmap/generateRoadmap";
 "@/components/roadmap/generateRoadmap";

 

export default function Page(){

  const [ data, setData] = useState()
  return <div className="flex justify-center items-center h-screen w-full bg- ">

    <GenerateRoadMap/>
      
  </div>
}