import {
  Chat,
  ChatType,
  KakaoAPI,
  AttachmentTemplate,
} from "@storycraft/node-kakao";
import { io, loco } from "../storage";
// import { IChat } from "../types/interfaces";
import toProcessableChat from "./toProcessableChat";
import { IChat } from "../types/commonType";

export default (chat: Chat) => {
  const brifiedChat: IChat = toProcessableChat(chat);
  io.emit("message", {
    type: "chat",
    content: brifiedChat,
  });
};
