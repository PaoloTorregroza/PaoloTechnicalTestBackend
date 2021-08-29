import { Response, Request } from 'express'
import { getConnection } from 'typeorm'
import { Task } from '../entities/Task'

const taskRepo = () => getConnection().getRepository(Task)

async function all(req: Request, res: Response) {
  try {
    const results = await taskRepo().find({ relations: ['comments', 'comments.user', 'user'] })
    res.send({ data: results })
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting tasks' })
  }
}

async function one(req: Request, res: Response) {
  try {
    const responseData = await taskRepo().findOne(req.params.id, { relations: ['comments', 'comments.user', 'user'] })
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting task' })
  }
}

async function create(req: Request, res: Response) {
  try {
    const responseData = await taskRepo().save(req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error creating task' })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const responseData = await taskRepo().delete(req.params.id)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error removing task' })
  }
}

async function update(req: Request, res: Response) {
  try {
    const responseData = await taskRepo().update(req.params.id, req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error updating task' })
  }
}

export default {
  all, one, remove, update, create,
}
