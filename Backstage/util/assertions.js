const intString = 'string'.chainWith(num => !Number.isNaN(parseInt(num, 10)))
const boolString = 'string'.chainWith(str => str === 'true' || str === 'false')

module.exports = {
  intString,
  boolString
}
