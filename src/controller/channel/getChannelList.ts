import { loco } from "../../storage";
import { Request, Response } from "express";
import { ChatChannel } from "@storycraft/node-kakao";
import getImageFromChannel from "../../functions/getImageFromChannel";
import toProcessableChat from "../../functions/toProcessableChat";
import chatToTimeStamp from "../../functions/chatToTimeStamp";

export const getChannelName = (channel: ChatChannel) => {
  return channel.Name || channel.DisplayUserInfoList[0].Nickname || "이름 없음";
};

export default (req: Request, res: Response) => {
  const channelList = loco.ChannelManager.getChannelIdList()
    .filter(Boolean)
    .map((channelId) => loco.ChannelManager.get(channelId))
    .map((channelInfo) => ({
      profileImage: (channelInfo && getImageFromChannel(channelInfo)) || "",
      name: (channelInfo && getChannelName(channelInfo)) || "이름없음",
      lastMessage:
        channelInfo?.LastChat &&
        chatToTimeStamp(toProcessableChat(channelInfo?.LastChat)),
      id: channelInfo?.Id.toString()!,
    }));
  if (!channelList) {
    res.send({
      status: 400,
      message: "Cannot get channelList",
    });
    throw "Cannot get channelList";
  }
  res.send(channelList);
};
