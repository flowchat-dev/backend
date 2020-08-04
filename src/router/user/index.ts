import { Router } from 'express'
import getUsersInfoByChannelId from '../../controller/user/getUsersInfoByChannelId'
import getUserInfoByUserId from '../../controller/user/getUserInfoByUserId'

const router = Router()

router.get('/getUsersInfoByChannelId', getUsersInfoByChannelId)
router.get('/:userId', getUserInfoByUserId)

export default router