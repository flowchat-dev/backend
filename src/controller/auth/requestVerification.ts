import {KakaoAPI,} from "@storycraft/node-kakao";
import { IRequestPasscode } from "../../types/interfaces";
import { Request, Response } from "express";

const requestVerification = async (req: Request, res: Response) => {
  const { email, pw, uuid, deviceName } = process.env
  const passcodeRequest: IRequestPasscode = JSON.parse(await KakaoAPI.requestPasscode(
    email!,
    pw!,
    uuid!,
    deviceName!
  ))
  
  const { message } = passcodeRequest
  const status = ( (statusCode) => {
    switch (statusCode) {
      case 12:
      case 30: return 401;

      case 0: return 200;
    }
    return 400;
  })(passcodeRequest.status)
  res.status(status)
  // res.sta
  const response = {
    status,
    message: message || '정상적으로 인증번호가 부여되었습니다'
  }
  console.log(response)
  res.send(response)
}

export default requestVerification
