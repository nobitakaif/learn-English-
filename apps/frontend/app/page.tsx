"use client"
import { Button } from "@/components/ui/button";

export default function Page(){
  return <div className="flex justify-center items-center h-screen w-full ">

    <Button  className ="p-2 h-8 text-lg w-19" onClick={() =>
      alert("button clicked")
    }>onclick</Button>
  </div>
}