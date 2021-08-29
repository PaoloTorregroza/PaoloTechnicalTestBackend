import { Router } from 'express'
import controller from '../controllers/CompanyController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', controller.all)
router.get('/:id', controller.one)
router.delete('/:id', checkJwt, controller.remove)
router.put('/:id', checkJwt, controller.update)
router.post('/', checkJwt, controller.create)

export default router
