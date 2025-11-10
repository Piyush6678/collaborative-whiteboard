import { ReactNode } from "react";


export function IconButton(
{icon,activated,onClick}:{
    icon:ReactNode,
    activated:boolean
    onClick:()=>void
}
){
    return <div  className={`rounded-full pointer border p-2 ${activated ? "text-red-600":"text-white"}  bg-black hover:bg-gray-300 `} onClick={onClick} >
{icon}

    </div>

}