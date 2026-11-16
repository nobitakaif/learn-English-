import { Navbar } from "@/components/navbar/navbar";
import React from "react";

export default function DayLayout({children} : {children : React.ReactNode}){
    return <div className="p-5 h-[90vh]">
        <Navbar/>
    {children}
    </div>
}