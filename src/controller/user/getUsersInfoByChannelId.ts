import { KakaoAPI, Long } from "@storycraft/node-kakao";
import { loco } from '../../storage'
import { Request, Response } from "express";

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
  console.log(channelId)
  const channel = loco.ChannelManager.get(Long.fromString(channelId))
  // console.log(channel)
  if (!channel) {
    res.send({
      message: `channelId ${channelId} not found.`,
      status: 400
    })
    throw `channelId ${channelId} not found.`
  }
  (await loco.UserManager.requestAllUserInfoList(channel))o
}