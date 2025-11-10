"use client"
import { useRouter } from "next/navigation"; 
import AuthPage from "../../components/authPage";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { useRef } from "react";

export default function Signin() {
    const router=useRouter()
    const signIn =async()=>{

    const username=reference.usernameRef.current?.value
    const password=reference.passwordRef.current?.value
   try{ const response = await axios.post(`${HTTP_BACKEND}/signin`,{
        username,password
    })
        console.log(response?.data)
        
         const jwt=response.data.token
 localStorage.setItem("authorization",jwt)  
router.push("/room")
}catch(e){

        console.log(e);
        alert("something went wrong")
    }
    
    }
    const reference={
     
    //@ts-ignore
     usernameRef:useRef<HTMLInputElement>(),
    //@ts-ignore
    passwordRef:useRef<HTMLInputElement>()}
    return <AuthPage reference={reference} authFunc={signIn} isSignIn={true}/> ;
}

