import { Router } from 'express'
import getChannelList from '../../controller/channel/getChannelList'

const router = Router()
router.get('/getChannelList', getChannelList)

export default router