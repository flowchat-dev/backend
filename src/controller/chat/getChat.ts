import { Request, Response } from "express";
import { Long, Chat } from "@storycraft/node-kakao";
import { loco } from "../../storage";
import toProcessableChat from "../../functions/toProcessableChat";

const recursivelyGetChats = async (channelId: Long) => {
  let fullChats: Chat[] = [];
  let fullChatIds: string[] = [];
  let lastChatId = 0;
  while (true) {
    console.log(lastChatId);
    const { result, status } = await loco.ChatManager.getChatListFrom(
      channelId,
      lastChatId
    );
    if (!result) return fullChats;
    if (!result.length) return fullChats;
    const ids: string[] = result.map((e) => e.LogId.toString());
    fullChatIds = [...fullChatIds, ...ids.slice(1)];
    fullChats = [...fullChats, ...result.slice(1)];
    if (result.length !== 90) return fullChats;
    lastChatId = +result.slice(-1)[0].LogId.toString();
  }
};

const getChat = async (req: Request, res: Response) => {
  const { channelId } = req.params;
  const longgedChannelId = Long.fromString(channelId);

  const chatLog = await recursivelyGetChats(longgedChannelId);
  if (!chatLog.length) {
    res.status(500).send({
      status: 500,
      message: "Cannot log message",
    });
    return;
  }
  const proceed = chatLog?.map(toProcessableChat);
  loco.ChannelManager.get(longgedChannelId)?.markChannelRead(
    Long.fromString("" + proceed?.slice(-1)[0].chatId)
  );
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
