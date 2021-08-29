import { Response, Request } from 'express'
import { getConnection } from 'typeorm'
import { Company } from '../entities/Company'

const companyRepo = () => getConnection().getRepository(Company)

async function all(req: Request, res: Response) {
  try {
    const results = await companyRepo().find({ relations: ['users', 'projects'] })
    res.send({ data: results })
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting companies' })
  }
}

async function one(req: Request, res: Response) {
  try {
    const responseData = await companyRepo().findOne(req.params.id, { relations: ['users', 'projects'] })
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting company' })
  }
}

async function create(req: Request, res: Response) {
  try {
    const responseData = await companyRepo().save(req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error creating company' })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const responseData = await companyRepo().delete(req.params.id)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error removing company' })
  }
}

async function update(req: Request, res: Response) {
  try {
    const responseData = await companyRepo().update(req.params.id, req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error updating company' })
  }
}

export default {
  all, one, remove, update, create,
}
