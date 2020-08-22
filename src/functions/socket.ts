import { io } from "../storage";
import { Socket } from "socket.io";

console.log("Registering IO");
io.on("connection", (socket: Socket) => {
  console.log("Socket Connected");
});
