"use client"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { UserQualification } from "@/components/userInfo/user_qualification";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react"
import { useState } from "react";

export default function Page(){

    const [state, setState] = useState<"name" | "qualification" | "occupation">()

    
    
    
    return <div className="min-h-screen flex justify-center items-center">
        <Card className="lg:h-100 lg:w-150 shadow-2xl bg-card-foreground">
            <CardTitle>
                <ArrowLeft className="h-8 w-8 text-chart-2 lg:ml-3 hover:bg-[#2c5375] rounded-sm cursor-pointer " />
            </CardTitle>
            <CardContent>
                <UserQualification/>
            </CardContent>
        </Card>
    </div>
}