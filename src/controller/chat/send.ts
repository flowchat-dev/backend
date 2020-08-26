import { Request, Response } from "express";
import getMyUserId from "../../functions/getMyUserId";
import sendChat from "../../functions/sendChat";
import toProcessableChat from "../../functions/toProcessableChat";
import { io } from "../../storage";
import sendToClient from "../../functions/sendToClient";

const send = async (req: Request, res: Response) => {
  const attaches = (req.files as Express.Multer.File[]).map((e) => ({
    file: e,
  }));
  const sent = await sendChat(req.body, attaches);
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
