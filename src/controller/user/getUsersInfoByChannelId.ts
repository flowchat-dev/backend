import { KakaoAPI, Long } from "@storycraft/node-kakao";
import { loco } from '../../storage'
import { Request, Response } from "express";
import { IUser } from "../../types/interfaces";

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
    res.status(400).json({
      message: `channelId ${channelId} not found.`,
      status: 400
    })
    throw `channelId ${channelId} not found.`
  }
  const users = (await loco.UserManager.requestAllUserInfoList(channel))
  if (!users) {
    res.status(400).json({
      message: `users of "${channel.Name}" not found`,
      status: 400
    })
    throw `users of "${channel.Name}" not found`
  }
  if ((users.status) !== 0) {
    res.status(400).json({
      message: `request failed. message: ${users?.result}`,
      status: 400
    })
    throw `users of "${channel.Name}" not found`
  }
  if (!users.result) {
    res.status(400).json({
      message: `request result not found`,
      status: 400
    })
    throw `users of "${channel.Name}" not found`
  }
  const brifiedUsers: IUser[] = users.result?.map(user => ({
    id: user.Id.toString(),
    name: user.Nickname,
    profileImage: user.OriginalProfileImageURL
  }))
  res.json(brifiedUsers)
}