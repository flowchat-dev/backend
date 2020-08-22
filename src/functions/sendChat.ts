import { loco } from "../storage";
import { Long } from "bson";
import {
  AttachmentTemplate,
  MediaTemplate,
  ChatType,
} from "@storycraft/node-kakao";

export default ({ text, channelId }: { text: string; channelId: string }) => {
  const target = loco.ChannelManager.get(Long.fromString(channelId));
  const photo: MediaTemplate<ChatType.Photo> = {};
  // target?.sendMedia(
  //   MediaTemplate
  // )
  return target?.sendText(text);
};
