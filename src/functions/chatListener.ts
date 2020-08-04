import {loco} from '../storage'
import { Chat, Long } from '@storycraft/node-kakao'
import storeToDB from './storeToDB'
import sendToClient from './sendToClient'
import sendChat from './sendChat'
import { ManagedChatUser } from '@storycraft/node-kakao/dist/talk/managed/managed-chat-user'

export default () => {
  loco.on('message', async (chat: Chat) => {
    sendToClient(chat)
    storeToDB(chat)
    console.log(chat.Channel.Id.toString())
  })
}
