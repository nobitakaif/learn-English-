import { LoginPage }  from "@/components/auth/login_page";
import { cookies } from "next/headers"

export default async function Page() {
    const cookiesStore = await cookies()
    const auth = cookiesStore.get("auth")
    console.log("auth token -> ",auth)
    return <LoginPage />
    
}