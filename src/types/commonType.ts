import { ChatAttachment } from "@storycraft/node-kakao";
export interface PhotoAttach {
  url: string;
}
export interface ReplyAttach {
  originMessage: string;
  originChat: string;
}
export interface EmoticonAttach extends PhotoAttach {
  alt?: string;
  name?: string;
  sound?: unknown;
}
export interface InfoAttach {
  text: string;
}
export type TAttach = PhotoAttach | ReplyAttach | InfoAttach | EmoticonAttach;
export interface IChat {
  text: string;
  attachment?: (TAttach | undefined)[];
  channelId: string;
  senderId: string;
  chatId: string;
  time: Date;
}
export interface IUser {
  name: string;
  profileImage: string;
  id: string;
}
export interface IChannel {
  profileImage: string | string[];
  name: string;
  lastMessage?: IChat | null;
  id: string;
}
