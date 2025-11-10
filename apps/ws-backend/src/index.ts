import {WebSocketServer,WebSocket} from "ws"
import jwt, { JwtPayload } from "jsonwebtoken"
import {prismaClient} from "@repo/db/client"
import { JWT_SECRET } from "@repo/backend-common/config";
const wss =new WebSocketServer({port :8080});
interface User {
    userId:string,
    rooms:string[],
    ws:WebSocket
}
const users : User[] =[]

function checkUser(token:string):string | null{

    try{
const decoded = jwt.verify(token,JWT_SECRET)

if (typeof decoded =="string"){

    return null;
}

if(!decoded || !(decoded as JwtPayload).userId){
  
    return null;
}

return decoded.userId;
} catch(e){
    console.log(e);
}
return null
}



wss.on("connection",function connection(ws,request){
const url=request.url;
if(!url){
    return 
}
const queryParams =new URLSearchParams(url.split("?")[1]);
const token= queryParams.get("token") || ""
const userId=checkUser(token);
if(!userId){
    ws.close()
    return 
}
users.push({
    userId,
    rooms:[],
    ws
})
    ws.on("message", async function message(data){
      const parsedData=JSON.parse(data as unknown as string)
if (parsedData.type ==="join_room"){
    const user =users.find(x=>x.ws===ws)
    user?.rooms.push(parsedData.roomId)
}
if (parsedData.type ==="leave_room"){
    const user =users.find(x=>x.ws==ws)
    if(!user){return }
    user.rooms = user?.rooms.filter(x=> x !==parsedData.room)
}
if(parsedData.type=="delete_shape"){
    const roomId=parsedData.roomId;
   
    const chats=await prismaClient.chat.findMany({
        where:{
            roomId:Number(roomId),

        }    
    })

    const deleteshape=chats.find((chat)=>{return JSON.parse(chat.message).shape.id==parsedData.shapeId})
    await prismaClient.chat.delete(
    { where: { id: deleteshape?.id ,userId} }
    )
      users.forEach(user=>{
        if(user.rooms.includes(roomId)){
            user.ws.send(JSON.stringify({
                type:"delete_shape",
                shapeId:parsedData.shapeId,
                roomId
            }))
        }
    })


    console.log("deleted")
}
console.log(parsedData)
if (parsedData.type=="chat"){
    const roomId =parsedData.roomId;
    const message=parsedData.message;

await prismaClient.chat.create({
    data:{
        roomId :Number(roomId),
        message,
        userId
    }
})


    users.forEach(user=>{
        if(user.rooms.includes(roomId)){
            user.ws.send(JSON.stringify({
                type:"chat",
                message:message,
                roomId
            }))
        }
    })

}

    })
    
})