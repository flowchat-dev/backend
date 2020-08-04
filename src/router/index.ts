import { Router } from 'express'
import auth from './auth'
import users from './user'
import channel from './channel'

const router = Router()
router.use('/auth', auth)
router.use('/users', users)
router.use('/channel', channel)

export default router