// timing attack
import crypto from 'crypto'

export function checkToken (token) {
  return crypto.timingSafeEqual(token, process.env.TOKEN)
}
