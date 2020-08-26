import { loco } from "../storage";
import { Long } from "bson";
import { ChatType, MediaTemplates } from "@storycraft/node-kakao";
import getImageSize from "buffer-image-size";
import sendToClient from "./sendToClient";

interface IArg {
  text: string;
  channelId: string;
}

export default async (
  { text, channelId }: IArg,
  attachment?: {
    file: Express.Multer.File;
  }[]
) => {
  const target = loco.ChannelManager.get(Long.fromString(channelId));
  if (attachment) {
    attachment
      .map((e) => {
        if (e.file && e.file.mimetype.includes("image")) {
          const imageSize = getImageSize(e.file.buffer);
          return {
            height: imageSize.height,
            width: imageSize.width,
            data: e.file.buffer,
            name: e.file.originalname,
            type: ChatType.Photo,
            ext: e.file.originalname.substr(
              e.file.originalname.lastIndexOf(".") + 1
            ),
          } as MediaTemplates;
        }
      })
      .filter(Boolean)
      .forEach(async (attach) => {
        if (!attach) return;
        const sent = await target?.sendMedia(attach);
        if (!sent) throw new Error("Cannot send message");
        sendToClient(sent);
      });
  }
  const sent = await target?.sendText(text);
  if (!sent) throw new Error("Cannot send message");
  sendToClient(sent);
  return sent;
};
