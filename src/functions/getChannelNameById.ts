import { loco } from '../storage'
import { Long } from 'bson'

export default ({
  channelId
}: {
  channelId: string
}) => {
  return loco.ChannelManager.get(Long.fromString(channelId))?.Name
}