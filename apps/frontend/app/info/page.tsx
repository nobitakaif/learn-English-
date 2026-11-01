"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { UserLevel } from "@/components/userInfo/level";
import { UserQualification } from "@/components/userInfo/qualification";
import { UserInfo } from "@/components/userInfo/user_info";
import { ArrowLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

enum INFO_STATE {
    name,
    occupation,
    level
}

export default function Page() {
    const [state, setState] = useState<INFO_STATE>(INFO_STATE.name)

    return <div className="min-h-screen flex justify-center items-center">
        <Card className="lg:h-100 lg:w-150 flex flex-col shadow-2xl bg-card-foreground">
            <CardTitle className="flex justify-start ">
                <ArrowLeft
                    className={`h-8 w-8 text-chart-2 lg:ml-3 hover:bg-[#2c5375] rounded-sm ${state === INFO_STATE.name ? "cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => {
                        if (state > INFO_STATE.name) {
                            setState(previous => previous - 1)
                        }
                    }}
                />

                <div className="text-secondary font-bold w-full text-2xl mr-12 text-center">User Details</div>
            </CardTitle>
            <CardContent>
                {state === INFO_STATE.name && <UserInfo />}
                {state === INFO_STATE.occupation && <UserQualification />}
                {state === INFO_STATE.level && <UserLevel/>}
            </CardContent>
            <CardFooter className="p-0 bg-transparent m-2 border-none mt-auto lg:mb-4">
                <Button
                    className="text-2xl h-10 w-full cursor-pointer"
                    disabled={state === INFO_STATE.level}
                    onClick={() => {
                        if (state < INFO_STATE.level) {
                            setState(previous => previous + 1)
                        }
                    }}
                >
                    <span>Next</span>
                    <ChevronsRight className="shrink-0 size-6" size={44} />
                </Button>
            </CardFooter>
        </Card>
    </div>
}