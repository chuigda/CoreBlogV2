const intString = 'string'.chainWith(num => !Number.isNaN(parseInt(num, 10)))
const boolString = 'string'.chainWith(str => str === 'true' || str === 'false')
const objectId = 'string'.chainWith(str => /^[0-9a-fA-F]{24}$/.test(str))

module.exports = {
  intString,
  boolString,
  objectId
}
