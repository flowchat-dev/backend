import { Request, Response } from "express";
import sendChat from "../../functions/sendChat";
import toProcessableChat from "../../functions/toProcessableChat";

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
  const proceed = toProcessableChat(sent);
  res.send(proceed);
  await sent.Channel.markChannelRead(sent.LogId);
};
export default send;
