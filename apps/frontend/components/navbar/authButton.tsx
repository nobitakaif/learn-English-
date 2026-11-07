
import { motion } from "motion/react"
import { redirect } from "next/navigation"
import { useState } from "react"

export function AuthButton(){
    const [isLoading, setIsLoading] = useState(false)
    
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
            {isLoading ? "redirecting..." : "login"}
        </span>
    </motion.button>
}