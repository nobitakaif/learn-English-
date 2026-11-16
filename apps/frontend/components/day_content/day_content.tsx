"use client"
import { client } from "@/config/elysia-client"
import { Params } from "next/dist/server/request/params"
import { useState } from "react"
import { Button } from "../ui/button"
import WordRender from "./word_render"

export default function DayContent(){
    
    const [data, setData] = useState<[]|any>([])
    
    const getWord = async () =>{
        const res = await client.api.v1.word.get({query : {
            day_number : 5,
            firstChar : ['a', 'b'],
            length : 4
        }})

        if(res.data){
            setData(res.data)
        }
    }
    
    return <div className="h-full w-full ">
        <div className="flex h-[80vh] w-full justify-center items-center p-2 gap-3">
            {/* for meanings */}
            <div className="h-full w-full bg-[#8FD3C9] rounded-2xl p-4">
                <WordRender word={data.word}/>

            </div>

            {/* for the summary of words */}
            <div className="h-full w-full bg-chart-1 rounded-2xl p-4">

            </div>
        </div>
        <Button onClick={getWord} className={"w-full h-12 text-lg text-chart-2"}>Get data</Button>
    </div>
}