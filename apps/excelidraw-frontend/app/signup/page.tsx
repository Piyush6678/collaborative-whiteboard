"use client"
import { useRef } from "react";
import { useRouter } from "next/navigation"; 
import AuthPage from "../../components/authPage";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";


export default function Signup() {
     const router = useRouter(); 
    const signUp =async()=>{
    const name=reference.nameRef.current?.value
    const username=reference.usernameRef.current?.value
    const password=reference.passwordRef.current?.value
   try{ const response = await axios.post(`${HTTP_BACKEND}/signup`,{
        username,password,name
    })
        console.log(response?.data)
        router.push("/signin")
}catch(e){

        console.log(e);
        alert("something went wrong")
    }
    
    }
    const reference={
        //@ts-ignore
     nameRef:useRef<HTMLInputElement>(),
    //@ts-ignore
     usernameRef:useRef<HTMLInputElement>(),
    //@ts-ignore
    passwordRef:useRef<HTMLInputElement>()}
    return <AuthPage isSignIn={false}  reference={reference} authFunc={signUp} /> ;
}