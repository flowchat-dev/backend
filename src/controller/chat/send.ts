import { Request, Response } from "express";
import getMyUserId from "../../functions/getMyUserId";
import sendChat from "../../functions/sendChat";
import toProcessableChat from "../../functions/toProcessableChat";
import { io } from "../../storage";
import sendToClient from "../../functions/sendToClient";

const send = async (req: Request, res: Response) => {
  const sent = await sendChat(req.body, [
    {
      file: (req.files as Express.Multer.File[])?.[0],
    },
  ]);
  if (!sent) {
    res.status(500).send({
      status: 500,
      message: "Cannot send chat",
    });
    return;
  }
  await sent.Channel.markChannelRead(sent.LogId);
  const proceed = toProcessableChat(sent);
  res.send(proceed);
  sendToClient(sent);
};
export default send;
