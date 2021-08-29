import { Router } from 'express'
import controller from '../controllers/HistoryController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/project/:projectId', [checkJwt], controller.all)
router.get('/:id', [checkJwt], controller.one)
router.delete('/:id', [checkJwt], controller.remove)
router.put('/:id', [checkJwt], controller.update)
router.post('/', [checkJwt], controller.create)

export default router
