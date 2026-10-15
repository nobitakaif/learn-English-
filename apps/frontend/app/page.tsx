"use client"
import { Button } from "@/components/ui/button";
import  { type App } from "@repo/elysia/app"
import { treaty } from "@elysiajs/eden"
import { client } from "@/config/elysia-client";

 

export default function Page(){
  return <div className="flex justify-center items-center h-screen w-full ">

    <Button  className ="p-2 h-8 text-lg w-19" 
        onClick={() => {
          window.location.href =
            "http://localhost:8000/api/v1/user/google";
        }}
      >onclick</Button>
  </div>
}