import { ChatAttachment } from "@storycraft/node-kakao";

export interface IRequestPasscode {
  status: number;
  server_time: number;
  os_name: 'android' | string;
  message?: string;
}