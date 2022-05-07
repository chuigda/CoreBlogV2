const intString = 'string'.chainWith(num => !Number.isNaN(parseInt(num, 10)))
const boolString = 'string'.chainWith(str => str === 'true' || str === 'false')
const objectId = 'string'.chainWith(str => /^[0-9a-fA-F]{24}$/.test(str))
const nonEmtpyString = 'string'.chainWith(str => str.length > 0)

// length >= 8, must contain digits, uppercase and lowercase letters
const passwordString = 'string'.chainWith(str => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(str))
const emailString = 'string'.chainWith(str => /^[^@]+@[^@]+\.[^@]+$/.test(str))

module.exports = {
  intString,
  boolString,
  objectId,
  nonEmtpyString,
  passwordString,
  emailString
}
