import { Chat, ChatType, PhotoAttachment, KakaoAPI } from "@storycraft/node-kakao";
import { IChat, PhotoAttach, ReplyAttach, EmoticonAttach, InfoAttach } from "../types/commonType";
// import { IChat } from "../types/interfaces";

const toProcessableChat = (chat: Chat): IChat => {
  return {
    channelId: chat.Channel.Id.toString(),
    senderId: chat.Sender.Id.toString(),
    text: chat.Text,
    time: new Date(chat.SendTime * 1000),
    chatId: chat.LogId.toString(),
    attachment: chat.AttachmentList.map((e) => {
      const attachment = e.toJsonAttachment();
      const type = e.RequiredMessageType;
      if (type === ChatType.Photo) {
        return ({
          url: attachment.url,
          type
        } as PhotoAttach);
      }
      if (type === ChatType.Reply) {
        return ({
          originChat: attachment.src_logId.toString(),
          originMessage: attachment.src_message,
          type
          // origin
        } as ReplyAttach);
      }
      if (type === ChatType.Sticker) {
        const emoticonUrl = KakaoAPI.getEmoticonImageURL(attachment.path)
        if (!emoticonUrl) return ({
          text: '이모티콘을 불러오는데 문제가 발생했습니다..'
        } as InfoAttach)
        return ({
          url: emoticonUrl,
          type
        } as EmoticonAttach)
      }
    })
  }
}

export default toProcessableChat