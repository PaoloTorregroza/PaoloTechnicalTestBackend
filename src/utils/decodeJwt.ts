import { decode } from 'base-64'

export function decodeJwt(token: string) {
  const clean = token.replace('Bearer ', '')
  const base64Url = clean.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    decode(base64)
      .split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join(''),
  )
  return JSON.parse(jsonPayload)
}
