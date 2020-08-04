import { KakaoAPI, Long } from "@storycraft/node-kakao";
import { loco } from '../../storage'
import { Request, Response } from "express";
import { IUser } from "../../types/interfaces";

// Channel Id와 User Id로 UserInfo를 반환한다
export default async (req: Request, res: Response) => {
  const { channelId, userId } = (req.query as {
    channelId: string, userId: string
  })
  // console.log(req.query)
  if (!channelId) {
    res.status(400)
    res.json({
      status: 400,
      message: 'channelId not provided'
    })
    throw 'channelId not provided'
  }
  if (!userId) {
    res.status(400)
    res.json({
      status: 400,
      message: 'userId not provided'
    })
    throw 'userId not provided'
  }
  const userInfo = loco.ChannelManager.get(Long.fromString(channelId))?.getUserInfoId(Long.fromString(userId))
  if (!userInfo) {
    res.status(400)
    res.json({
      status: 400,
      message: 'user not found on that channel'
    })
    throw 'user not found on that channel'
  }
  res.send({
    id: userInfo.Id.toString(),
    name: userInfo.Nickname,
    profileImage: userInfo.ProfileImageURL
  } as IUser)
}