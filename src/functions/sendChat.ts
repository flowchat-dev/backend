import { loco } from "../storage";
import { Long } from "bson";
import { ChatType, MediaTemplates } from "@storycraft/node-kakao";
import getImageSize from "buffer-image-size";

interface IArg {
  text: string;
  channelId: string;
  attachment_type: "Photo" | "Reply";
}

export default (
  { text, channelId }: IArg,
  attachment?: {
    file: Express.Multer.File;
  }[]
) => {
  const target = loco.ChannelManager.get(Long.fromString(channelId));
  if (attachment)
    console.log(
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
        .map((e) => e && target?.sendMedia(e))
    );
  return target?.sendText(text);
};
