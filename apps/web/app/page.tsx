"use client"
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
export default function Home() {
  const [roomId ,setRoomId]=useState("");
  const router=useRouter();
  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width:"100vw",
      height:"100vh"

    }} >
      <div>
      <input style={{
        padding:"10px"
      }
      } type="text" value={roomId} placeholder="roomId" onChange={(e)=>{
        setRoomId(e.target.value)
      }} ></input>
      <button   style={{
        padding:"10px"
      }
      } onClick={()=>{
        router.push(`/room/${roomId}`)
      }} >JOIN ROOM</button>
    </div>
    
    </div>
  );
}
