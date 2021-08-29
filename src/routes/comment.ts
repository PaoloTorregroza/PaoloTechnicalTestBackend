import { Router } from 'express'
import { checkJwt } from '../middlewares/checkJwt'
import controller from '../controllers/CommentController'

const router = Router()

router.get('/', checkJwt, controller.all)
router.get('/:id', checkJwt, controller.one)
router.delete('/:id', checkJwt, controller.remove)
router.put('/:id', checkJwt, controller.update)
router.post('/', checkJwt, controller.create)

export default router
