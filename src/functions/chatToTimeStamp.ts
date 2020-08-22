import { IChat } from "../types/commonType";

const chatToTimeStamp = (chat: IChat) => ({
  ...chat,
  time: +chat.time
})

export default chatToTimeStamp