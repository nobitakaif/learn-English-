"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import axios from "axios"
import { RenderRoadmap } from "./renderRoadmap"
import { LineSpinner } from 'ldrs/react'
import 'ldrs/react/LineSpinner.css'

// Default values shown


export default function GenerateRoadMap(){

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    
    return <div>
            

            {
                data ? <div className="flex space-y-4 h-screen  items-start mt-10 justify-center ">
                    <RenderRoadmap data={data} />
                </div>
                : 
                <div>
                    {!isLoading ? <Button  className ="p-2 h-8 text-lg cursor-pointer " 
                    onClick={async () => {
                        setIsLoading(true)
                        console.log("reacher here!")
                    const res = await axios.get("http://localhost:8080/api/roadmap?occupation=bio_engineer")
                    setData(res.data)
                    console.log(res.data)
                    setIsLoading(false)
                    }}
                >Generate Roadmap</Button> : 
                    <LineSpinner
                    size="40"
                    stroke="3"
                    speed="1"
                    color="black" 
                    />
                }
                </div>
            }
            
    </div>
}