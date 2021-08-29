import Router from 'express'
import userRoutes from './user'
import companyRoutes from './company'
import historyRoutes from './history'
import taskRoutes from './task'
import projectRoutes from './project'
import commentRoutes from './comment'
import authRoutes from './auth'

const router = Router()

router.use('/user', userRoutes)
router.use('/company', companyRoutes)
router.use('/history', historyRoutes)
router.use('/task', taskRoutes)
router.use('/project', projectRoutes)
router.use('/comment', commentRoutes)
router.use('/auth', authRoutes)

export default router
