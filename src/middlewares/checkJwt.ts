import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../utils/apiConfig'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  let token = <string>req.headers.authorization
  // Try to calidate the token and get data
  try {
    token = token.replace('Bearer ', '')
    jwt.verify(token, config.jwtSecret)
  } catch (e) {
    // If token is not valid respond whit 401 (unauthorized)
    res.status(401).send({ error: 'Invalid token' })
    return
  }
  next()
}
