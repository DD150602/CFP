import { Router } from 'express'
import UserController from '../controllers/user.controller.js'

const router = Router()

router.get('/', UserController.findAllUsers)
router.get('/:id', UserController.findUserById)
router.post('/', UserController.createUser)
router.patch('/:id', UserController.updateUser)

export default router
