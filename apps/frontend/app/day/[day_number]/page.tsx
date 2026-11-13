"use client"
import { useParams } from "next/navigation"


export default function Page(){
    const day = useParams()
    
    return <div>
        {day.day_number}
    </div>
}