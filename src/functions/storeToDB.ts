import { Chat } from "@storycraft/node-kakao"
import storeChat from '../model/storeChat'
import mongoose from './chatListener'

export default (chat: Chat) => {
  storeChat({
    text: chat.Text,
    image: chat.AttachmentList[0],
    channelId: chat.Channel.Id.toString(),
    senderId: chat.Sender.Id.toString(),
    time: chat.SendTime
  })
}