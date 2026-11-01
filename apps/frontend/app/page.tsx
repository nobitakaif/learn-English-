"use client"
import { Button } from "@/components/ui/button";
import  { type App } from "@repo/elysia/app"
import { treaty } from "@elysiajs/eden"
import { client } from "@/config/elysia-client";
import { useState } from "react";
import axios from "axios"

 

export default function Page(){

  const [ data, setData] = useState()
  return <div className="flex justify-center items-center h-screen w-full bg- ">

    <Button  className ="p-2 h-8 text-lg w-19 text-highlight" 
        onClick={async () => {
          const res = await axios.get("http://localhost:8000/api/roadmap?occupation=blockchain_engineer")
          setData(res.data)
          console.log(res.data)
        }}
      >onclick</Button>
      {
        data && <div>
          {JSON.stringify(data)}
        </div>  
      }
      
  </div>
}