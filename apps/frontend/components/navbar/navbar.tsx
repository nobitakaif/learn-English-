import { AuthButton } from "./authButton";
import { Logo } from "./logo";

const navItem = [
    {
        name : "Home",
        url : "/",
        id : "home"
    },
    {
        name : "About",
        url : "/about",
        id : "about"
    },
    {
        name : "How it's works",
        url : "/guide",
        id : "how it's works"
    },
    {
        name : "Contact",
        url : "/contact",
        id : "contact"
    }
]

export function Navbar(){
    return <div className="flex gap-2 h-14 w-full ">
        <Logo />
        <div className="bg-background flex justify-between gap-2 shadow-lg h-14 flex-9 rounded-full">
            <div className="flex justify-evenly gap-10 items-center flex-7">
                {navItem.map((el)=>(
                    <div className="">
                        <span className="text-lg font-semibold bg-secondary py-2 rounded-full px-7 cursor-pointer">
                            {el.name}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex-2 justify-end flex items-center pr-4">
                <AuthButton/>
            </div>
        </div>
    </div>
}