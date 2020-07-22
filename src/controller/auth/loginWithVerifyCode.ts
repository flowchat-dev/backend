import { KakaoAPI } from "@storycraft/node-kakao";
import chatListener from '../../functions/chatListener'
import { loco } from '../../storage'
import { Request, Response } from "express";

const loginWithVerifyCode = async (req: Request, res: Response) => {
  const { email, pw, uuid, deviceName } = process.env
  console.log(req.body)
  const verificationCode = Number(req.body?.verificationCode)
  if (!verificationCode) {
    res.status(500)
    res.send({
      status: 400,
      message: 'verificationCode not provided'
    })
    throw new Error("verificationCode not provided");
  }
  
  console.log(verificationCode)

  try {
    const deviceRequest = await KakaoAPI.registerDevice(
      String(verificationCode),
      email!,
      pw!,
      uuid!,
      deviceName!
    );
    console.log(deviceRequest)
  } catch (e) {
    console.log(e)
    throw e
  }
  try {
    await loco.login(email!, pw!, uuid, true);
    chatListener()
    console.log('Successfully Logged in!')
    res.send({
      status: 200,
      message: 'Loco Loggedin'
    })
  } catch (e) {
    res.send({
      status: 500,
      message: e.toString()
    })
    throw e
  }
}
    
export default loginWithVerifyCode
