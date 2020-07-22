import { Chat, ChatType } from "@storycraft/node-kakao";
import {io} from '../storage'
import { IChat } from "../types/interfaces";

export default (chat: Chat) => {
  // console.log(chat.Text)
  const brifiedChat: IChat = {
    channelId: chat.Channel.Id.toString(),
    senderId: chat.Sender.Id.toString(),
    text: chat.Text,
    time: chat.SendTime
  }
  // console.log(brifiedChat.channelId)
  io.emit('message', {
    type: 'chat',
    content: brifiedChat
  })
}