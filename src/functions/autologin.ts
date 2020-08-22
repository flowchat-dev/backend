import { loco } from "../storage";
import chatListener from "./chatListener";

const autologin = async () => {
  const { email, pw, uuid } = process.env
  
  console.log(`try logging in with email ${email}`)
  await loco.login(email!, pw!, uuid, true);
  chatListener()
  console.log('Successfully Logged in!')
}

export default autologin