import { TalkClient } from "@storycraft/node-kakao";
import socket from "socket.io";
import multer from "multer";
import { Server } from "http";

export let io: socket.Server;
export const initSocket = (server: Server) => (io = socket(server));
export const loco = new TalkClient("FlowChat");
export const multerConfig = multer({
  storage: multer.memoryStorage(),
});
