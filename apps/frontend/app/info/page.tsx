"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { UserQualification } from "@/components/userInfo/user_info";
import { ArrowLeft, ChevronsRight } from "lucide-react";
import { motion } from "motion/react"
import { useState } from "react";

export default function Page(){

    const [state, setState] = useState<"name" | "qualification" | "occupation">()

    
    
    
    return <div className="min-h-screen flex justify-center items-center">
        <Card className="lg:h-100 lg:w-150 shadow-2xl bg-card-foreground">
            <CardTitle className="flex justify-start ">
                <ArrowLeft className="h-8 w-8 text-chart-2  lg:ml-3 hover:bg-[#2c5375] rounded-sm cursor-pointer " />
                
                <div className="text-secondary font-bold w-full text-2xl mr-12 text-center">User Details</div>
            </CardTitle>
            <CardContent>
                <UserQualification/>
            </CardContent>
            {/* <CardFooter className="bg-none"> */}
                <Button className={"text-2xl h-10 "}>Next  <ChevronsRight className="w-25 h-25" /></Button>
            
        </Card>
    </div>
}