import { Response, Request } from 'express'
import { getConnection } from 'typeorm'
import { Project } from '../entities/Project'

const projectRepo = () => getConnection().getRepository(Project)

async function all(req: Request, res: Response) {
  try {
    const { id } = req.params
    const results = await projectRepo().find(
      {
        where: { company: { id } },
        relations: ['histories', 'company'],
      },
    )
    res.send({ data: results })
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting projects' })
  }
}

async function one(req: Request, res: Response) {
  try {
    const responseData = await projectRepo().findOne(req.params.id, { relations: ['histories', 'company'] })
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error getting project' })
  }
}

async function create(req: Request, res: Response) {
  try {
    const responseData = await projectRepo().save(req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error creating project' })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const responseData = await projectRepo().delete(req.params.id)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error removing project' })
  }
}

async function update(req: Request, res: Response) {
  try {
    const responseData = await projectRepo().update(req.params.id, req.body)
    res.send(responseData)
  } catch (e) {
    console.log(e.message)
    res.status(500).send({ msg: 'Error updating project' })
  }
}

export default {
  all, one, remove, update, create,
}
