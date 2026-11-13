import { useUserInfoStore } from "@/zustand/userInfo";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const items = [
    { label: "Beginner", value: "beginner" },
    { label: "Medium", value: "medium" },
    { label: "Advance", value: "advance" },
    { label: "Test", value: "test" },
]

const levelMap: Record<string, "BEGINNER" | "MEDIUM" | "ADVANCE" | "TEST"> = {
    beginner: "BEGINNER",
    medium: "MEDIUM",
    advance: "ADVANCE",
    test: "TEST",
};

export function UserLevel() {
    const setLevel = useUserInfoStore(u => u.setLevel)

    return (
        <div>
            <Select items={items} onValueChange={(value) => {
                const level = typeof value === "string" ? levelMap[value] : undefined;
                if (level) setLevel(level);
            }}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="select your level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {items.map((el) => (
                            <SelectItem key={el.value} value={el.value} className="text-black">
                                {el.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}