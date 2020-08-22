import { Router } from 'express'
import getChat from '../../controller/chat/getChat'
import send from '../../controller/chat/send'

const router = Router()
router.get('/:channelId/:logId', getChat)
router.post('/send', send)

export default router