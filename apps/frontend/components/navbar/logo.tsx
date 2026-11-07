import { motion } from "motion/react"

export function Logo(){
    return <motion.div className="flex flex-col w-20  justify-center items-center">
        <span className="text-center text-primary  font-bold text-2xl ">Fluent</span>
        <span className="text-center font-bold text-foreground text-xl">Path</span>
    </motion.div>
}