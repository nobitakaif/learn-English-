
"use client"
import { client } from "@/config/elysia-client"
import { userUserDataStore } from "@/zustand/userTokenData"
import { motion } from "framer-motion"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"


export function AuthButton(){
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState(false)

    useEffect(() =>{
        
        (async() =>{
            const res = await client.api.v1.auth.me.get()
            console.log("userinfo here ->>>>",JSON.stringify(res.data))
            if(res.status == 200){
                setUserData(res.data?.name)
            }
        })()
    }, [])
    
    return <motion.button className="bg-foreground rounded-full cursor-pointer w-50 h-10"
        whileHover={{
            scale : 1.1
        }}
        onClick={() =>{
            setIsLoading(true)
            redirect("/auth")
            
        }}
    >
        <span className="text-secondary text-lg">
            {userData ? userData : isLoading ? "redirecting..." : "login"}
        </span>
    </motion.button>
}