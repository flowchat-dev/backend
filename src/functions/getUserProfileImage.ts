import { loco } from '../storage'
import { Long } from 'bson'
import { ChatChannel, ChatUser } from '@storycraft/node-kakao'

export default (user: ChatUser, channel: ChatChannel) => {
  const info = channel.getUserInfo(user)
  return [info?.FullProfileImageURL, info?.OriginalProfileImageURL, info?.ProfileImageURL].filter(Boolean)[0] || ''
}