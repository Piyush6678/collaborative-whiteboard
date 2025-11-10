"use client"
import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useRef } from "react"
// import { useNavigate } from "react-router-dom";

export default function CreateRoom(){
    //@ts-ignore
    const roomnameref=useRef<HTMLInputElement>();
    const router=useRouter() 
    const createroom=async()=>{
        const name=roomnameref.current?.value.trim();
        try{
            const response = await axios.post(`${HTTP_BACKEND}/room`,{
                name },{
                    headers:{
                        "authorization":localStorage.getItem("authorization")
                    }
                })
                joinroom(name)
                
            }catch(e){
                console.log(e) ; alert("something went wrong")
            }
            
        }
        
        const joinroom=async(roomName?:string)=>{
            const name= roomName || roomnameref.current?.value.trim();
            
        const response = await axios.get(`${HTTP_BACKEND}/room/${name}`,{
            headers:{
                    "authorization":localStorage.getItem("authorization")
                }
        }) 
        const roomId=response.data.room.id;
        router.push(`/canvas/${roomId}`)
        }
    return (<div>
        <div  className="bg-black h-screen w-full flex justify-center items-center" >
            <div className="bg-white h-[30%] w-[30%] flex flex-col justify-center items-center " >
        <input   className="border border-black" ref={roomnameref} type="text" /> 
        <div className="flex justify-around items-center " > <button className=" border border-black p-2 m-1"  onClick={createroom}  >Create</button>
        <button className="p-2 m-1 border border-black " onClick={()=>joinroom()} >join</button> </div>
            </div>



        </div>


    </div>)
}