import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const items = [
    { label: "Beginner", value: "beginner" },
    { label: "Medium", value: "medium" },
    { label: "Advance", value: "advance" },
    { label: "Test", value: "test" },
]

export function UserLevel() {
    return <div>
        <Select items={items}>
            <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="select your level"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((el) =>(
                        <SelectItem key={el.value} value={el.value} className={"text-black"}>{el.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>

        </Select>
    </div>
}