import { loco } from '../../storage'
import {IChannel} from '../../types/interfaces'
import { Request, Response } from "express";
import { Long } from '@storycraft/node-kakao';

export default (req: Request, res: Response): IChannel[] => {
  const channelList = loco.ChannelManager.getChannelIdList().map(e => loco.ChannelManager.get(e)).map(e => ({
    profileImage: e?.RoomImageURL!,
    name: e?.Name || ((e.LastChat?.Sender.Id && e?.getUserInfoId(e.LastChat?.Sender.Id))) || '이름없음',
    lastMessage: {
      channelId: e?.LastChat?.Channel.Id?.toString()!,
      senderId: e?.LastChat?.Sender.Id?.toString()!,
      text: e?.LastChat?.Text!,
      time: e?.LastChat?.SendTime!
    }
  }))
  if (!channelList) {
    res.send({
      status: 400,
      message: 'Cannot get channelList'
    })
    throw `Cannot get channelList`
    // return
  }
  res.send(channelList)
  return channelList
}