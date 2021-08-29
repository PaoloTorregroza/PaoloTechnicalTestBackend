import { Router } from 'express'
import { checkJwt } from '../middlewares/checkJwt'
import controller from '../controllers/UserController'

const router = Router()

router.get('/company/:id', controller.all)
router.get('/:id', [checkJwt], controller.one)
router.delete('/:id', [checkJwt], controller.remove)
router.put('/:id', [checkJwt], controller.update)

export default router
