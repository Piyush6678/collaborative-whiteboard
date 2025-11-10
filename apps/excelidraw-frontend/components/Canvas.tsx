import { useEffect, useRef, useState } from "react";
import initDraw from "../draw";
import { IconButton } from "./icons";
import {Circle, Eraser, Pencil, RectangleHorizontalIcon} from "lucide-react"
import { Game } from "@/draw/Game";
// import { Game } from "@/draw/Game";
export type Tool= "circle"| "rect"|"pencil"|"eraser"

 export default function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
      const canvasRef =useRef<HTMLCanvasElement>(null)
const [game,setGame]=useState<Game>()



    const [selectedTool,setSelectedTool]=useState <Tool>  ("circle")
    useEffect(()=>{
        game?.setTool(selectedTool)
    },[selectedTool,game])
// @ts-ignore
    // window.selectedTool=selectedTool

     useEffect(()=>{
        if (canvasRef.current){
                const g=new Game(canvasRef.current,roomId,socket);
          setGame(g);
            return ()=>{
                g.destroy()
            }
        }
       
    },[canvasRef])
   return ( <div  className="overflow-hidden h-screen" > 
    <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} ></canvas> 
<TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    
    </div>)
 }


 function TopBar({selectedTool,setSelectedTool }:{
    selectedTool:Tool;
    setSelectedTool:(s:Tool)=>void
 }
){
    return <div  className="fixed flex gap-1 top-10 left-10" >
    <IconButton activated={selectedTool=="pencil"?true:false} icon={<Pencil/>} onClick={()=>{
        setSelectedTool("pencil")
    }} />
    <IconButton activated={selectedTool=="rect"?true:false}  icon={<RectangleHorizontalIcon/>} onClick={()=>{
        setSelectedTool("rect")
    }} />
    <IconButton activated={selectedTool=="circle"?true:false} icon={<Circle/>} onClick={()=>{
        setSelectedTool("circle")
    }} />
    <IconButton activated={selectedTool=="eraser"?true:false} icon={<Eraser/>} onClick={()=>{
        setSelectedTool("eraser")
    }} />
    
     </div>
 } 