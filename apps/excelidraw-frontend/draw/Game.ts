// import { Tool } from "@/components/Canvas";
// import {v4 as uuidv4} from "uuid"
// import {getExistingShapes} from "./http"
// type Shape={
//     type:"rect";
//     id:string;
//     x:number;
//     y:number;
//     width:number;
//     height:number;
// }|{
//     type:"circle";
//     id:string;
//     centerX:number;
//     centerY:number;
//     radius:number;

// }|{
//     type:"pencil";
//     id:string;
//     startX: number;
//     startY: number;
//     endX: number;
//     endY: number;
// }

// export class Game{
//     private canvas:HTMLCanvasElement;
//     private ctx:CanvasRenderingContext2D;
//     private existingShapes:Shape[]
//     private roomId: string;
//     private clicked: boolean;
//     private startX = 0;
//     private startY = 0;
//     private selectedTool: Tool = "circle";
//     socket:WebSocket

//     constructor (canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
//         this.canvas=canvas;
//         this.ctx=canvas.getContext("2d")!;
//         this.existingShapes=[];
//         this.roomId=roomId;
//         this.socket=socket;
//         this.clicked=false;
//         this.init();
//         this.initHandlers();
//         this.initMouseHandlers();

//     }
//     destroy(){
//         this.canvas.removeEventListener("mousedown",this.mouseDownhandler)
//         this.canvas.removeEventListener("mousemove",this.mouseMoveHandler)
//         this.canvas.removeEventListener("mouseup",this.mouseUPhandler)

//     }setTool(tool:"circle"| "pencil" |"rect" |"eraser"){
//         this.selectedTool=tool;
//     }

//     async init(){
//         this.existingShapes=await getExistingShapes(this.roomId);
//         console.log(this.existingShapes);
//         this.clearCanvas()

//     }
//    initHandlers(){
//     this.socket.onmessage=(event)=>{
//         const message=JSON.parse(event.data);
//         if(message.type=="chat"){
//             console.log(message.message)
//             const parsedShape=JSON.parse(message.message)
//             this.existingShapes.push(parsedShape.shape)
//             this.clearCanvas();
//         }else if(message.type=="delete_shapes"){
//             const {shapeId}=message
//             this.existingShapes=this.existingShapes.filter(s=>s.id !==shapeId)
//        this.clearCanvas();
//         }
//     }
//    }
//    clearCanvas(){
//     this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
//     this.ctx.fillStyle="rgba(0,0,0)"
//     this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
//     this.existingShapes.map((shape)=>{
//         this.ctx.strokeStyle="rgba(255,255,255)"
//         if(shape.type=="circle"){
//             console.log(shape);
//             this.ctx.beginPath();
//             this.ctx.arc(shape.centerX,shape.centerY,Math.abs(shape.radius),0,Math.PI*2)
//             this.ctx.stroke();
//             this.ctx.closePath();
//         }else if(shape.type=="rect"){
//             console.log(shape);
//             this.ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)

//         }else if (shape.type === "pencil") { // ADDED: Draw pencil segments
//                 this.ctx.beginPath();
//                 this.ctx.moveTo(shape.startX, shape.startY);
//                 this.ctx.lineTo(shape.endX, shape.endY);
//                 this.ctx.stroke();
//                 this.ctx.closePath();
//             }
//     })
//    }
//    mouseDownhandler=(e:any)=>{
//     this.clicked=true
//     this.startX=e.clientX
//     this.startY=e.clientY
//    }
//    mouseUPhandler=(e:any)=>{
//     this.clicked=false
//     // ADDED: Early return for pencil tool since drawing is done on mouse move
//         if (this.selectedTool === "pencil" || this.selectedTool=="eraser" ) {
//             return;
//         }
//     const width=e.clientX -this.startX
//     const height=e.clientY -this.startY
//    const selectedTool=this.selectedTool;
//    let shape:Shape |null =null;
//    if(selectedTool=="rect"){
//     shape={
//         id:uuidv4(),
//         type:"rect",
//         x:this.startX,
//         y:this.startY,
//         height,
//         width
//     }
//    }else if(selectedTool=="circle"){
//     const radius=Math.max(width,height)/2
//     shape={  
//          id:uuidv4(),
//         type:"circle",
//         radius:radius,
//         centerX:this.startX +radius,
//         centerY:this.startY +radius,
//     }
//    }
//    if(!shape){return }
//    this.existingShapes.push(shape);
//    this.socket.send(JSON.stringify({
//     type:"chat",
//     message:JSON.stringify({shape}),
//     roomId:this.roomId
//    }))

//    }
//    mouseMoveHandler=(e:any)=>{
//      if (this.clicked) {
//             const width = e.clientX - this.startX;
//             const height = e.clientY - this.startY;
//             this.clearCanvas();
//             this.ctx.strokeStyle = "rgba(255, 255, 255)"
//             const selectedTool = this.selectedTool;
//             // console.log(selectedTool)
//             if (selectedTool === "rect") {

//                 this.ctx.strokeRect(this.startX, this.startY, width, height);   
//             } else if (selectedTool === "circle") {
//                 const radius = Math.max(width, height) / 2;
//                 const centerX = this.startX + radius;
//                 const centerY = this.startY + radius;
//                 this.ctx.beginPath();
//                 this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
//                 this.ctx.stroke();
//                 this.ctx.closePath();                
//             }else if (selectedTool === "pencil") {
//             // ADDED: For pencil, we draw and send segments continuously
//             const shape: Shape = {
//                 id:uuidv4(),
//                 type: "pencil",
//                 startX: this.startX,
//                 startY: this.startY,
//                 endX: e.clientX,
//                 endY: e.clientY
//             };
//             this.existingShapes.push(shape);
            
//             // Send the new segment to the server
//             this.socket.send(JSON.stringify({
//                 type: "chat",
//                 message: JSON.stringify({ shape }),
//                 roomId: this.roomId
//             }));

//             // Draw the segment on the local canvas immediately
//             this.ctx.strokeStyle = "rgba(255, 255, 255)";
//             this.ctx.beginPath();
//             this.ctx.moveTo(this.startX, this.startY);
//             this.ctx.lineTo(e.clientX, e.clientY);
//             this.ctx.stroke();
//             this.ctx.closePath();

//             // Update start coordinates for the next segment
//             this.startX = e.clientX;
//             this.startY = e.clientY;
//         }else if(selectedTool=="eraser"){
//             this.eraseShapesAt(e.clientX,e.clientY);
//         }
//             eraseShapesAt(x: number, y: number) {
//         let shapeToErase: Shape | null = null;

//         // Find the top-most shape at the cursor's position
//         for (let i = this.existingShapes.length - 1; i >= 0; i--) {
//             const shape = this.existingShapes[i];
//             if (this.isPointInShape(x, y, shape)) {
//                 shapeToErase = shape;
//                 break;
//             }
//         }
        
//         if (shapeToErase) {
//             // Remove from local array
//             this.existingShapes = this.existingShapes.filter(s => s.id !== shapeToErase!.id);
            
//             // Tell server to delete it for other clients
//             this.socket.send(JSON.stringify({
//                 type: "delete_shape",
//                 shapeId: shapeToErase.id,
//                 roomId: this.roomId
//             }));

//             // Redraw canvas immediately
//             this.clearCanvas();
//         }
//     } 
//        isPointInShape(x: number, y: number, shape: Shape): boolean {
//         if (shape.type === 'rect') {
//             // Handle negative width/height
//             const startX = Math.min(shape.x, shape.x + shape.width);
//             const endX = Math.max(shape.x, shape.x + shape.width);
//             const startY = Math.min(shape.y, shape.y + shape.height);
//             const endY = Math.max(shape.y, shape.y + shape.height);
//             return x >= startX && x <= endX && y >= startY && y <= endY;
//         } else if (shape.type === 'circle') {
//             const distance = Math.sqrt(Math.pow(x - shape.centerX, 2) + Math.pow(y - shape.centerY, 2));
//             return distance <= shape.radius;
//         } else if (shape.type === 'pencil') {
//             // Simple bounding box check for pencil strokes
//             const padding = 5; // Make it easier to hit the line
//             const minX = Math.min(shape.startX, shape.endX) - padding;
//             const maxX = Math.max(shape.startX, shape.endX) + padding;
//             const minY = Math.min(shape.startY, shape.endY) - padding;
//             const maxY = Math.max(shape.startY, shape.endY) + padding;
//             return x >= minX && x <= maxX && y >= minY && y <= maxY;
//         }
//         return false;
//     }
//         }
//    }
//    initMouseHandlers(){
//     this.canvas.addEventListener("mousedown",this.mouseDownhandler)
//     this.canvas.addEventListener("mousemove",this.mouseMoveHandler)
//     this.canvas.addEventListener("mouseup",this.mouseUPhandler)
//    }
//     }
import { Tool } from "@/components/Canvas";
import { v4 as uuidv4 } from "uuid";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    id: string;
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    id: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";
    socket: WebSocket;
    private canSend = true; // Added for throttling


 // --- ADDED: Camera and Panning State ---
    private cameraZoom = 1;
    private cameraOffset = { x: 0, y: 0 };
    private isPanning = false;
    private panStart = { x: 0, y: 0 };
    private readonly MAX_ZOOM = 5;
    private readonly MIN_ZOOM = 0.1;
    private readonly SCROLL_SENSITIVITY = 0.001;


    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        
        // ADDED: Center the initial view
        this.cameraOffset = { x: this.canvas.width / 2, y: this.canvas.height / 2 };

        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownhandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUPhandler);
          this.canvas.removeEventListener("wheel", this.zoomHandler); 
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            } else if (message.type === "delete_shape") { // FIX 1: Changed from "delete_shapes" to "delete_shape"
                const { shapeId } = message;
                this.existingShapes = this.existingShapes.filter(s => s.id !== shapeId);
                this.clearCanvas();
            }
        };
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // ADDED: Apply camera transformations before drawing
        this.ctx.save();
        this.ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
        this.ctx.scale(this.cameraZoom, this.cameraZoom);
        
        this.existingShapes.forEach((shape) => { // Use forEach, it's slightly cleaner
            this.ctx.strokeStyle = "rgba(255,255,255)";
            this.ctx.lineWidth = 1 / this.cameraZoom;
            if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
            } else if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "pencil") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();
            }
        });
              this.ctx.restore();
    }
     // ADDED: Helper to convert screen coordinates to world coordinates
    private getMouseWorldPosition(e: MouseEvent): { x: number; y: number } {
        return {
            x: (e.clientX - this.cameraOffset.x) / this.cameraZoom,
            y: (e.clientY - this.cameraOffset.y) / this.cameraZoom,
        };
    }

    mouseDownhandler = (e: any) => {
         if (e.button === 1) {
            this.isPanning = true;
            this.panStart = { x: e.clientX - this.cameraOffset.x, y: e.clientY - this.cameraOffset.y };
            return;
        }
      
        // Left mouse button for drawing
        if (e.button === 0) {
            this.clicked = true;
            const worldPos = this.getMouseWorldPosition(e);
            this.startX = worldPos.x;
            this.startY = worldPos.y;
        }
    }

    mouseUPhandler = (e: any) => {
        if (this.isPanning) {
            this.isPanning = false;
            return;
        }

        if (this.clicked) {
            this.clicked = false;
            const worldPos = this.getMouseWorldPosition(e);
           
      
        if (this.selectedTool === "pencil" || this.selectedTool === "eraser") {
            return;
        }
       const width = worldPos.x - this.startX;
            const height = worldPos.y - this.startY;
        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {
            shape = {
                id: uuidv4(),
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            };
        } else if (selectedTool === "circle") {
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            shape = {
                id: uuidv4(),
                type: "circle",
                radius: radius,
                centerX: this.startX + width / 2, // Corrected center calculation
                centerY: this.startY + height / 2,
            };
        }
        if (!shape) { return; }
        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: this.roomId
        }));
    }}
  mouseMoveHandler = (e: MouseEvent) => {
    // Handle panning
    if (this.isPanning) {
        this.cameraOffset.x = e.clientX - this.panStart.x;
        this.cameraOffset.y = e.clientY - this.panStart.y;
        this.clearCanvas(); // Redraw on pan
        return;
    }

    // Handle drawing
    if (!this.clicked) return;

    const worldPos = this.getMouseWorldPosition(e);
    const selectedTool = this.selectedTool;

    if (selectedTool === "pencil") {
        // --- START: PENCIL FIX ---

        // Re-added throttling to prevent too many messages
        if (!this.canSend) return;
        this.canSend = false;
        setTimeout(() => { this.canSend = true; }, 50);

        const shape: Shape = {
            id: uuidv4(),
            type: "pencil",
            startX: this.startX,
            startY: this.startY,
            endX: worldPos.x, // FIXED: Use world coordinates
            endY: worldPos.y, // FIXED: Use world coordinates
        };
        this.existingShapes.push(shape);

        // Send the new segment to the server
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: this.roomId
        }));

        // Draw the segment on the local canvas immediately.
        // The context is already transformed from the last `clearCanvas` call.
        this.ctx.save();
        this.ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
        this.ctx.scale(this.cameraZoom, this.cameraZoom);

        this.ctx.strokeStyle = "rgba(255, 255, 255)";
        this.ctx.lineWidth = 1 / this.cameraZoom;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(worldPos.x, worldPos.y); // FIXED: Use world coordinates
        this.ctx.stroke();

        this.ctx.restore();


        // Update start coordinates for the next segment
        this.startX = worldPos.x; // FIXED: Use world coordinates
        this.startY = worldPos.y; // FIXED: Use world coordinates

        // --- END: PENCIL FIX ---

    } else if (selectedTool === "eraser") {
        this.eraseShapesAt(worldPos.x, worldPos.y);
        this.clearCanvas()
    } else {
        // Preview logic for rect/circle (This part is correct)
        this.clearCanvas();
        this.ctx.save();
        this.ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
        this.ctx.scale(this.cameraZoom, this.cameraZoom);

        const width = worldPos.x - this.startX;
        const height = worldPos.y - this.startY;
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        this.ctx.lineWidth = 1 / this.cameraZoom;

        if (selectedTool === 'rect') {
            this.ctx.strokeRect(this.startX, this.startY, width, height);
        } else if (selectedTool === 'circle') {
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        this.ctx.restore();
    }
}

    // mouseMoveHandler = (e: any) => {
    //        if (this.isPanning) {
    //         this.cameraOffset.x = e.clientX - this.panStart.x;
    //         this.cameraOffset.y = e.clientY - this.panStart.y;
    //         this.clearCanvas(); // Redraw on pan
    //         return;
    //     }
    //     if (!this.clicked) return;

    //     const selectedTool = this.selectedTool;

    //     if (selectedTool === "rect" || selectedTool === "circle") {
    //         // Preview logic doesn't save or send, only draws
    //         this.clearCanvas(); // Redraw all existing shapes first
    //         this.ctx.strokeStyle = "rgba(255, 255, 255)";
    //         const width = e.clientX - this.startX;
    //         const height = e.clientY - this.startY;

    //         if (selectedTool === "rect") {
    //             this.ctx.strokeRect(this.startX, this.startY, width, height);
    //         } else if (selectedTool === "circle") {
    //             const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
    //             const centerX = this.startX + width / 2;
    //             const centerY = this.startY + height / 2;
    //             this.ctx.beginPath();
    //             this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    //             this.ctx.stroke();
    //         }
    //     } else if (selectedTool === "pencil") {
    //         if (!this.canSend) return;
    //         this.canSend = false;
    //         setTimeout(() => { this.canSend = true; }, 50);

    //         const shape: Shape = {
    //             id: uuidv4(),
    //             type: "pencil",
    //             startX: this.startX,
    //             startY: this.startY,
    //             endX: e.clientX,
    //             endY: e.clientY
    //         };
    //         this.existingShapes.push(shape);
    //         this.socket.send(JSON.stringify({
    //             type: "chat",
    //             message: JSON.stringify({ shape }),
    //             roomId: this.roomId
    //         }));

    //         // Don't clear canvas for pencil, just draw the new line
    //         this.ctx.strokeStyle = "rgba(255, 255, 255)";
    //         this.ctx.beginPath();
    //         this.ctx.moveTo(this.startX, this.startY);
    //         this.ctx.lineTo(e.clientX, e.clientY);
    //         this.ctx.stroke();

    //         this.startX = e.clientX;
    //         this.startY = e.clientY;
    //     } else if (selectedTool === "eraser") {
    //         this.eraseShapesAt(e.clientX, e.clientY);
    //     }
    // }
  zoomHandler = (e: WheelEvent) => {
        e.preventDefault();

        // Get mouse position in screen space
        const mousePos = { x: e.clientX, y: e.clientY };

        // Get mouse position in world space before zoom
        const mouseWorldXBefore = (mousePos.x - this.cameraOffset.x) / this.cameraZoom;
        const mouseWorldYBefore = (mousePos.y - this.cameraOffset.y) / this.cameraZoom;

        // Calculate new zoom level
        const zoomAmount = e.deltaY * this.SCROLL_SENSITIVITY;
        this.cameraZoom = Math.max(this.MIN_ZOOM, Math.min(this.MAX_ZOOM, this.cameraZoom - zoomAmount));

        // Get mouse position in world space after zoom
        const mouseWorldXAfter = (mousePos.x - this.cameraOffset.x) / this.cameraZoom;
        const mouseWorldYAfter = (mousePos.y - this.cameraOffset.y) / this.cameraZoom;

        // Adjust camera offset to keep the world point under the cursor
        this.cameraOffset.x += (mouseWorldXAfter - mouseWorldXBefore) * this.cameraZoom;
        this.cameraOffset.y += (mouseWorldYAfter - mouseWorldYBefore) * this.cameraZoom;

        this.clearCanvas(); // Redraw on zoom
    }

   
    eraseShapesAt(x: number, y: number) {
        let shapeToErase: Shape | null = null;
        for (let i = this.existingShapes.length - 1; i >= 0; i--) {
            const shape = this.existingShapes[i];
            if (this.isPointInShape(x, y, shape)) {
                shapeToErase = shape;
                break;
            }
        }

        if (shapeToErase) {
            this.existingShapes = this.existingShapes.filter(s => s.id !== shapeToErase!.id);
            this.socket.send(JSON.stringify({
                type: "delete_shape", // FIX 3: Ensure this is singular
                shapeId: shapeToErase.id,
                roomId: this.roomId
            }));
            this.clearCanvas();
        }
    }

    isPointInShape(x: number, y: number, shape: Shape): boolean {
        if (shape.type === 'rect') {
            const startX = Math.min(shape.x, shape.x + shape.width);
            const endX = Math.max(shape.x, shape.x + shape.width);
            const startY = Math.min(shape.y, shape.y + shape.height);
            const endY = Math.max(shape.y, shape.y + shape.height);
            return x >= startX && x <= endX && y >= startY && y <= endY;
        } else if (shape.type === 'circle') {
            const distance = Math.sqrt(Math.pow(x - shape.centerX, 2) + Math.pow(y - shape.centerY, 2));
            return distance <= shape.radius;
        } else if (shape.type === 'pencil') {
            const padding = 5;
            const minX = Math.min(shape.startX, shape.endX) - padding;
            const maxX = Math.max(shape.startX, shape.endX) + padding;
            const minY = Math.min(shape.startY, shape.endY) - padding;
            const maxY = Math.max(shape.startY, shape.endY) + padding;
            return x >= minX && x <= maxX && y >= minY && y <= maxY;
        }
        return false;
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownhandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.addEventListener("mouseup", this.mouseUPhandler);
           this.canvas.addEventListener("wheel", this.zoomHandler); // ADDED
    }
}