"use client"
import { client } from "@/config/elysia-client"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import { useState } from "react"


const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
if(!googleClientId){
    alert("no google client id :(")
}


export default function Page(){

    const [user, setUser] = useState<any| null> (null)
    
    return <div>
        <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin onSuccess={async(cre) =>{
                const res = await client.api.v1.auth.google.callback.post({idToken : cre.credential})

                
                if(res.status == 200){
                    console.log("res -> ", res.data?.msg)
                    setUser(res.data?.user)
                }
                
                alert(res.data?.msg ? res.data.msg : "something went wrong")
                
            }}
        
            />
        </GoogleOAuthProvider>
            {
                user ?? <>
                    <div>
                        picture : <img src={user?.avatar} height={100} width={100}/>
                        name : <p>{user?.name}</p>
                    </div>        
                </>
            }
        
        
    </div>
}