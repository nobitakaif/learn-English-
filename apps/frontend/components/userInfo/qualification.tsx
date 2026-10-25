import { Card } from "../ui/card";
import {HugeiconsIcon} from "@hugeicons/react"
import { LaborIcon } from "@hugeicons/core-free-icons"
import { PiStudentLight } from "react-icons/pi";
import { motion } from "motion/react"
export function UserQualification(){
    return <div className="flex justify-center items-center gap-2 ">
        <motion.div className="h-50 w-full bg-ring flex flex-col rounded-lg cursor-pointer justify-center items-center " whileHover={{
                scale : 0.99
            }}
            transition={{
                duration : 0.2
            }}
        >
            <PiStudentLight size={44} className="text-white"/>
            <span className="font-bold text-xl text-white">Student</span>
        </motion.div>
        <motion.div className="h-50 w-full bg-ring flex flex-col rounded-lg cursor-pointer justify-center items-center " whileHover={{
                scale : 0.99
            }}
            transition={{
                duration : 0.2
            }}
        >
            <HugeiconsIcon icon={LaborIcon} size={44} className="text-white"/>
            <span className="font-bold text-xl text-white">Working Professional</span>
        </motion.div>
    </div>
}