import { loco } from '../storage'
import { Long } from 'bson'

export default ({
  text,
  channel
 }:{
  text: string,
  channel: string
  }) => {
  const target = loco.ChannelManager.get(Long.fromString(channel))
  target?.sendText(text)
}