import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { getConnection } from 'typeorm'
import { hashSync } from 'bcrypt'
import { decodeJwt } from '../utils/decodeJwt'
import { User } from '../entities/User'
import config from '../utils/apiConfig'

const userRepo = () => getConnection().getRepository(User)

async function login(req: Request, res: Response) {
  const { mail, password } = req.body
  const response = {
    data: {},
    status: 400,
  }

  if (!(mail && password)) {
    response.data = { msg: 'Email or password not provided' }
    res.status(response.status).send(response.data)
    return
  }

  let user: User | undefined
  try {
    user = await userRepo().findOneOrFail({ where: { mail }, relations: ['company'] })
  } catch (e) {
    response.status = 401
    response.data = { msg: 'User not found' }
    res.status(response.status).send(response.data)
    return
  }

  // Check if encrypted password match
  if (user && !user.checkUnencryptedPassword(password)) {
    response.status = 401
    response.data = { msg: "Passwords don't match" }
    res.status(response.status).send(response.data)
    return
  }

  // Sing JWT, valid for 6 hours
  if (user) {
    const token = sign(
      { id: user.id, email: user.mail },
      config.jwtSecret,
      { expiresIn: '6h' },
    )

    delete user.password
    response.status = 200
    response.data = {
      token,
      data: user,
    }

    res.status(response.status).send(response.data)
  }
}

async function register(req: Request, res: Response) {
  const response = {
    status: 400,
    data: {},
  }

  const {
    username, password, mail,
  } = req.body
  if (!(username && password && mail)) {
    response.data = { msg: 'Data not provided' }
    res.status(response.status).send(response)
    return
  }

  const userRepository = userRepo()
  const newUser = new User()
  newUser.username = username
  newUser.password = password
  newUser.mail = mail

  let results: User
  try {
    const user = userRepository.create(newUser)
    results = await userRepository.save(user)
  } catch (e) {
    response.data = { msg: 'Error creating user, email or username already exists' }
    res.status(response.status).send(response.data)
    return
  }

  delete results.password

  response.status = 200
  response.data = { data: results }
  res.status(response.status).send(response.data)
}

async function changePassword(req: Request, res: Response) {
  const response = {
    status: 400,
    data: {},
  }
  const token = decodeJwt(<string>req.headers.authorization)
  const { id } = token

  const { oldPassword, newPassword } = req.body
  if (!(oldPassword && newPassword)) {
    response.data = { msg: 'Passwords not provided' }
    res.status(response.status).send(response.data)
    return
  }

  const userRepository = userRepo()
  let user: User | undefined

  try {
    user = await userRepository.findOneOrFail(id)
  } catch (e) {
    response.status = 404
    response.data = { msg: 'User not found' }
    res.status(response.status).send(response.data)
    return
  }

  if (!user.checkUnencryptedPassword(oldPassword)) {
    response.status = 401
    response.data = { msg: 'Password do not match' }
    res.status(response.status).send(response.data)
    return
  }

  user.password = hashSync(newPassword, config.saltRounds)
  await userRepository.save(user)

  response.status = 200
  response.data = { msg: 'Password changed' }
  res.status(response.status).send(response.data)
}

export default {
  login, register, changePassword,
}
