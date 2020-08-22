import { KakaoAPI, Long } from "@storycraft/node-kakao";
import { loco } from '../../storage'
import { Request, Response } from "express";
import { IUser } from "../../types/commonType";

export default async (req: Request, res: Response) => {
  const { channelId }: {
    channelId: string
  } = req.body
  if (!channelId) {
    res.send({
      message: "channelId not provided",
      status: 400
    })
    throw 'channelId not provided'
  }
  const channel = loco.ChannelManager.get(Long.fromString(channelId))
  
  if (!channel) {
    res.status(400).json({
      message: `channelId ${channelId} not found.`,
      status: 400
    })
    throw `channelId ${channelId} not found.`
  }
  const users = channel?.getUserInfoList()
  
  if (!users) {
    res.status(400).json({
      message: `users of "${channel.Name}" not found`,
      status: 400
    })
    throw `users of "${channel.Name}" not found`
  }
  const brifiedUsers = users.map(e => ({
    id: e.Id.toString(),
    name: e.Nickname,
    profileImage: e.FullProfileImageURL
  }) as IUser)
  res.json(brifiedUsers)
}