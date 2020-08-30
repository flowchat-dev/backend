import { loco } from "../storage";
import { Long } from "bson";
import {
  ChatType,
  MediaTemplates,
  AttachmentTemplate,
  MediaTemplate,
} from "@storycraft/node-kakao";
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
        const commonProperty = {
          data: e.file.buffer,
          name: e.file.originalname,
          type: ChatType.File,
          ext: e.file.originalname.substr(
            e.file.originalname.lastIndexOf(".") + 1
          ),
        };
        if (e.file.mimetype.includes("image")) {
          const imageSize = getImageSize(e.file.buffer);
          console.log(e.file.mimetype);
          return {
            ...commonProperty,
            height: imageSize.height,
            width: imageSize.width,
            type: ChatType.Photo,
          } as MediaTemplates;
        } else return commonProperty as MediaTemplate<ChatType.File>;
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
