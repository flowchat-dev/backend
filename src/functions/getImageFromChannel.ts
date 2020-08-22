import { ChatChannel, ChatUser, ChatUserInfo } from "@storycraft/node-kakao";
import getUserProfileImage from "./getUserProfileImage";

export default (channel: ChatChannel<ChatUserInfo>) => {
  const roomImage = channel.ClientRoomImageURL || channel.RoomImageURL;
  if (!roomImage)
    return channel.DisplayUserInfoList.slice(0, 4)
      .map((e) => getUserProfileImage(e.User, channel))
      .filter(Boolean);
  return roomImage || "";
};
