"use client"
// import * as React from "react"
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { SelectTrigger, SelectValue } from "@base-ui/react";

export function UserQualification() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)


    return <div className="flex flex-col gap-3">
        <Label className="text-secondary">What should we call you?</Label>
        <Input placeholder="enter your name" className="" />
        <div>
            <Label className="text-white">Enter your Date of Birth</Label>
            <div className="flex justify-start gap-1">
                
                <Select
                    defaultValue={String(selectedYear)}
                    onValueChange={(value) => setSelectedYear(Number(value))}
                >
                    <SelectTrigger className="w-[80px] ">
                        <SelectValue placeholder="Year"  />
                    </SelectTrigger>
                    <SelectContent className="h-10px">
                        <SelectGroup>
                            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    defaultValue={String(selectedMonth)}
                    onValueChange={(value) => setSelectedMonth(Number(value))}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent className="h-10px">
                        <SelectGroup>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                <SelectItem key={month} value={String(month)}>
                                    {format(new Date(2000, month - 1, 1), "MMMM")}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select key={`${selectedYear}-${selectedMonth}`}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent className="h-10px">
                        <SelectGroup>
                            {Array.from(
                                { length: new Date(selectedYear, selectedMonth, 0).getDate() },
                                (_, i) => i + 1
                            ).map((day) => (
                                <SelectItem key={day} value={String(day)}>{day}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>
            <div>

            </div>
        </div>

    </div>
}