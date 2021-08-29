import { Response, Request } from 'express'
import { getConnection } from 'typeorm'
import { User } from '../entities/User'

const userRepo = () => getConnection().getRepository(User)

async function all(req: Request, res: Response) {
  try {
    const { id } = req.params
    const results = await userRepo().find({ relations: ['company'], where: { company: { id } } })
    results.forEach((e) => { delete e.password; delete e.mail })
    res.send(results)
  } catch (e) {
    console.log(e)
    res.status(500).send({ msg: 'Error getting users' })
  }
}

async function one(req: Request, res: Response) {
  try {
    const responseData = await userRepo().findOne(req.params.id, { relations: ['company', 'tasks'] })
    delete responseData.password
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting one user' })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const responseData = await userRepo().delete(req.params.id)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error removing user' })
  }
}

async function update(req: Request, res: Response) {
  try {
    const responseData = await userRepo().update(req.params.id, req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error updating user' })
  }
}

export default {
  all, one, remove, update,
}
