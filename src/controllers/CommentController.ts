import { Response, Request } from 'express'
import { getConnection } from 'typeorm'
import { Comment } from '../entities/Comment'

const commentRepo = () => getConnection().getRepository(Comment)

async function all(req: Request, res: Response) {
  try {
    const results = await commentRepo().find({ relations: ['user'] })
    res.send({ data: results })
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting comments' })
  }
}

async function one(req: Request, res: Response) {
  try {
    const responseData = await commentRepo().findOne(req.params.id, { relations: ['user'] })
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting comment' })
  }
}

async function create(req: Request, res: Response) {
  try {
    const responseData = await commentRepo().save(req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error creating comment' })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const responseData = await commentRepo().delete(req.params.id)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error removing comment' })
  }
}

async function update(req: Request, res: Response) {
  try {
    const responseData = await commentRepo().update(req.params.id, req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error updating message' })
  }
}

export default {
  all, one, remove, update, create,
}
