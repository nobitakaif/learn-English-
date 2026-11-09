import { DemoContent } from "./demoContent";

export function Content(){
    return <div className="h-full w-full flex justify-center items-center">
        {/* Left */}
            <div className="h-full w-full">

            </div>
        {/* Right */}
        <div className=" h-full w-full flex justify-center items-center">
            <DemoContent/>
        </div>
        
    </div>
}