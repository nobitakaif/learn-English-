import { Card } from "../ui/card";
import {HugeiconsIcon} from "@hugeicons/react"
import { LaborIcon } from "@hugeicons/core-free-icons"
import { PiStudentLight } from "react-icons/pi";
import { motion } from "motion/react"
import { useUserInfoStore } from "@/zustand/userInfo";
import { useState } from "react";
export function UserQualification(){

    const occupation = useUserInfoStore(u => u.occupation)
    const setOccupation = useUserInfoStore( u => u.setOccupation)
    
    
    return <div className="flex justify-center items-center gap-2 ">
        <motion.div className={`h-50 w-full bg-ring flex flex-col rounded-lg  cursor-pointer justify-center items-center ${occupation == "STUDENT" && "border-2"}`} whileHover={{
                scale : 0.99
            }}
            whileTap={{
                
            }}
            transition={{
                duration : 0.2
            }}
            onClick={() => {
                setOccupation("STUDENT")
            }}
        >
            <PiStudentLight size={44} className="text-white"/>
            <span className="font-bold text-xl text-white">Student</span>
        </motion.div>
        <motion.div className={`h-50 w-full bg-ring flex flex-col rounded-lg cursor-pointer justify-center items-center ${occupation == "WORKING" ? "border-2" : ""}`} whileHover={{
                scale : 0.99
            }}
            transition={{
                duration : 0.2
            }}

            onClick={() => {
                setOccupation("WORKING")
            }}
        >
            <HugeiconsIcon icon={LaborIcon} size={44} className="text-white"/>
            <span className="font-bold text-xl text-white">Working Professional</span>
        </motion.div>
    </div>
}