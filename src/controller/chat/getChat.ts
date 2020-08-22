import { Request, Response } from "express";
import { Long } from "@storycraft/node-kakao";
import { loco } from "../../storage";
import toProcessableChat from "../../functions/toProcessableChat";
const getChat = async (req: Request, res: Response) => {
  const { channelId, logId } = req.params;
  const longgedChannelId = Long.fromString(channelId);
  // const channel = loco.ChannelManager.get(longgedChannelId);

  const chatLog = await loco.ChatManager.getChatListFrom(
    longgedChannelId,
    Number(logId)
  );
  if (chatLog.status !== 0) {
    res.status(500).send({
      status: 500,
      message: "Cannot log message",
    });
    return;
  }
  // console.log(chatLog.result)
  const proceed = chatLog.result?.map(toProcessableChat);
  // console.log(proceed);
  // channel?.markChannelRead(Long.fromString('' + proceed?.slice(-1)[0].chatId))
  if (!proceed) {
    res.status(500).send({
      status: 500,
      message: "Cannot log message",
    });
    return;
  }
  res.send([...proceed].reverse());
};

export default getChat;
