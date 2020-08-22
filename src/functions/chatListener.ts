import { loco } from "../storage";
import { Chat } from "@storycraft/node-kakao";
import sendToClient from "./sendToClient";

export default () => {
  loco.on("message", async (chat: Chat) => {
    sendToClient(chat);
  });
};
