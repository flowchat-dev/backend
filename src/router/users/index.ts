import { Router } from 'express'
import getUserInfoByChannelId from '../../controller/user/getUsersInfoByChannelId'

const router = Router()

router.get('/getUserInfoByChannelId', getUserInfoByChannelId)

export default router