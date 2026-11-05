"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios"

export function GetRoadMap(){

    const [ data, setData] = useState()
    
    return <div>
        <Button onClick={async() =>{
           const res =  await axios.get("http://localhost:8000/api/roadmap?occupation=sciencetist")
        }}> </Button>
    </div>
}