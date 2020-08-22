import { loco } from "../../storage";
import { Request, Response } from "express";
import { IUser } from "../../types/commonType";

export default async (req: Request, res: Response) => {
  // console.log("D");
  const myInfo = loco.UserManager.Client.ClientUser.MainUserInfo;
  if (!loco.Logon) return;
  res.send({
    id: myInfo.Id.toString(),
    name: myInfo.Nickname,
    profileImage: myInfo.ProfileImageURL,
  } as IUser);
};
