import { Response, Request } from 'express'
import { getConnection } from 'typeorm'
import { History } from '../entities/History'

const historyRepo = () => getConnection().getRepository(History)

async function all(req: Request, res: Response) {
  try {
    const { projectId } = req.params
    const results = await historyRepo().find({ relations: ['tasks', 'tasks.user', 'tasks.comments', 'tasks.comments.user'], where: { project: { id: projectId } } })
    res.send({ data: results })
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting histories' })
  }
}

async function one(req: Request, res: Response) {
  try {
    const responseData = await historyRepo().findOne(req.params.id, { relations: ['tasks', 'tasks.user', 'tasks.comments', 'tasks.comments.user'] })
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting history' })
  }
}

async function create(req: Request, res: Response) {
  try {
    const responseData = await historyRepo().save(req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error creating history' })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const responseData = await historyRepo().delete(req.params.id)
    res.send(responseData)
  } catch (e) {
    res.status(500).send({ msg: 'Error removing hisotry' })
  }
}

async function update(req: Request, res: Response) {
  try {
    const responseData = await historyRepo().update(req.params.id, req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error updating history' })
  }
}

export default {
  all, one, remove, update, create,
}
