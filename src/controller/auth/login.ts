import { Request, Response } from "express";
import chatListener from '../../functions/chatListener'
import { loco } from '../../storage'

const login = async (req: Request, res: Response) => {
  const { email, pw, uuid } = process.env
  try {
    if (loco.Logon) {
      res.send({
        status: 500,
        message: 'Already Logon to loco'
      })
      console.log('Already Logon to loco')
      return
    }
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
    
export default login
