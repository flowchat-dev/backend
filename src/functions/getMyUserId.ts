import { loco } from "../storage"

const getMyUserId = (): string => loco.ClientUser.Id.toString()
export default getMyUserId