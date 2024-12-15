// prevents DoS

const validator = require('validator')

const emailChecker = (email) => {
  return validator.isEmail(email)
}
