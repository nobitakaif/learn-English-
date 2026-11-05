"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import axios from "axios"
import { RenderRoadmap } from "./renderRoadmap"

export default function GenerateRoadMap(){

    const [data, setData] = useState()
    
    return <div>
            <Button  className ="p-2 h-8 text-lg  " 
                    onClick={async () => {
                        console.log("reacher here!")
                    const res = await axios.get("http://localhost:8000/api/roadmap?occupation=bio_engineer")
                    setData(res.data)
                    console.log(res.data)
                    }}
                >Generate Roadmap</Button>

            {
                data && <div className="flex h-screen items-start justify-center overflow-y-auto">
                    <RenderRoadmap data={data} />
                </div>
            }
            
    </div>
}