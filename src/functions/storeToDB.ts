import { Chat } from "@storycraft/node-kakao"
import storeChat from '../model/chat/storeChat'
import toProcessableChat from "./toProcessableChat"

export default (chat: Chat) => {
  storeChat(toProcessableChat(chat))
}