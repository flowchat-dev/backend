import { Request, Response } from "express";
import chatListener from "../../functions/chatListener";
import { loco } from "../../storage";
import { IUser } from "../../types/commonType";

const login = async (req: Request, res: Response) => {
  const { email, pw, uuid } = process.env;
  try {
    if (loco.Logon) {
      res.status(500).send({
        status: 500,
        message: "Already Logon to loco",
      });
      console.log("Already Logon to loco");
      return;
    }
    await loco.login(email!, pw!, uuid, true);
    chatListener();
    console.log("Successfully Logged in!");
    const myFullInfo = loco.ClientUser.MainUserInfo;
    const myInfo: IUser = {
      id: myFullInfo.Id.toString(),
      name: myFullInfo.Nickname,
      profileImage: myFullInfo.OriginalProfileImageURL,
    };
    res.status(200).send({
      status: 200,
      message: myInfo,
    });
  } catch (e) {
    res.status(500).send({
      status: 500,
      message: e.toString(),
    });
    throw e;
  }
};

export default login;
