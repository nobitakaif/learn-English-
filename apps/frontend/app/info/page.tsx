"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { UserQualification } from "@/components/userInfo/qualification";
import { UserInfo } from "@/components/userInfo/user_info";
import { ArrowLeft, ChevronsRight } from "lucide-react";
import { motion } from "motion/react"
import { useState } from "react";

export default function Page() {

    const [state, setState] = useState<"name" | "occupation">("name")
    const [isBackEnable, setIsBackEnable] = useState(false)
    




    return <div className="min-h-screen flex justify-center items-center">
        <Card className="lg:h-100 lg:w-150 flex flex-col shadow-2xl bg-card-foreground">
            <CardTitle className="flex justify-start ">
                <ArrowLeft className={`h-8 w-8 text-chart-2  lg:ml-3 hover:bg-[#2c5375] rounded-sm  ${state == "name" ? "cursor-not-allowed" : "cursor-pointer"}` } onClick={() =>{
                    if(state == "occupation"){
                        setState("name")
                    }
                }}/>

                <div className="text-secondary font-bold w-full text-2xl mr-12 text-center">User Details</div>
            </CardTitle>
            <CardContent>
                {
                    state == "name" ?
                    <UserInfo />
                    : <UserQualification/>
                   
                }
            </CardContent>
            {/* <CardFooter className="bg-none"> */}
            <CardFooter className=" p-0 bg-transparent  m-2 border-none mt-auto lg:mb-4" >

                <Button className={"text-2xl h-10 w-full cursor-pointer "} onClick={()=>{
                    setState(pre => pre == "name" ? "occupation" : "name")
                }}> <span>Next</span> <ChevronsRight className=" shrink-0  size-6" size={44} />  </Button>
            </CardFooter>

        </Card>
    </div>
}