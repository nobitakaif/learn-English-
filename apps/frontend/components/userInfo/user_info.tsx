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
import { motion }  from "motion/react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useUserInfoStore } from "@/zustand/userInfo";
// import { SelectTrigger, SelectValue } from "@base-ui/react";

export function UserInfo() {
    const today = new Date()
    const [selectedYear, setSelectedYear] = useState(today.getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1)
    const [selectedDay, setSelectedDay] = useState(today.getDate())
    const [date, setDate] = useState<Date | undefined>(today)
    const name = useUserInfoStore(s => s.name)
    const setName = useUserInfoStore(u => u.setName)
    const setPhoneNumber = useUserInfoStore(u => u.setPhoneNumber) 
    const setDob = useUserInfoStore(u => u.setDob) 
    const dob = useUserInfoStore(u =>u.dob)

    const updateDate = (year: number, month: number, day: number) => {
        const daysInMonth = new Date(year, month, 0).getDate()
        const validDay = Math.min(day, daysInMonth)
        console.log("date is ",dob)
        setSelectedYear(year)
        setSelectedMonth(month)
        setSelectedDay(validDay)
        setDob(new Date(year, month - 1, validDay))
        setDate(new Date(year, month - 1, validDay))
        
    }



    const [isInvalid, setIsInvalid] = useState(false);
    const [shake, setShake] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow shortcuts like Ctrl+A, Ctrl+C, Ctrl+V
        if (
        e.ctrlKey ||
        e.metaKey ||
        [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
            "Home",
            "End",
        ].includes(e.key)
        ) {
        return;
    }

    
    
    // Reject anything except digits
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      setIsInvalid(true);
      setShake(false);

      requestAnimationFrame(() => setShake(true));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    
    const digitsOnly = value.replace(/\D/g, "");

    if(Number(digitsOnly.length) >10){ // i am assuming that user will give correct number eventually i will build edge case 
        setIsInvalid(true);
        setShake(true);
        return;
    }
    setPhoneNumber(Number(digitsOnly))

    setIsInvalid(false);
    setShake(false);
  };

  const number = useUserInfoStore(u =>u.phoneNumber)
  console.log("phone number -. ", number)

    return <motion.div className="flex flex-col gap-3"
        initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
        <Label className="text-secondary text-xl">What should we call you?</Label>
        <Input placeholder="enter your name" className="text-secondary" value={name} onChange={(e) => setName(e.target.value)} />
        
        <Label className="text-secondary text-xl">Phone number</Label>
        <Input
            type="tel"
            inputMode="numeric"
            placeholder="Enter your phone number"
            value={number}

            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`text-secondary ${
                isInvalid
                ? "border-red-500 ring-1 ring-red-500"
                : ""
            } ${shake ? "animate-shake" : ""}`}
            onAnimationEnd={() => setShake(false)}
            />
        <div>
            <Label className="text-secondary text-xl mb-1 ">Enter your Date of Birth</Label>
            <div className="flex justify-evenly gap-1 ">
                <Select
                    value={String(selectedYear)}
                    onValueChange={(value) => updateDate(Number(value), selectedMonth, selectedDay)}
                    
                >
                    <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Year" className={"text-secondary "} />
                    </SelectTrigger>
                    <SelectContent className="h-10px w-">
                        <SelectGroup>
                            {Array.from({ length: 30 }, (_, i) => today.getFullYear() - i).map((year) => (
                                <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    value={String(selectedMonth)}
                    onValueChange={(value) => updateDate(selectedYear, Number(value), selectedDay)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Month" className={"text-secondary"} />
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

                <Select
                    key={`${selectedYear}-${selectedMonth}`}
                    value={String(selectedDay)}
                    onValueChange={(value) => updateDate(selectedYear, selectedMonth, Number(value))}
                >
                    <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Day" className={"text-secondary text-center"} />
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
            
        </div>
    </motion.div>
}