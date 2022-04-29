const requestDebug = (req, res, next) => {
  const headers = { ...req.headers }
  delete headers['host']
  delete headers['user-agent']
  delete headers['accept']
  delete headers['accept-language']
  delete headers['accept-encoding']
  delete headers['origin']
  delete headers['connection']
  delete headers['if-none-match']

  console.log(' ---= [ INCOMING REQUEST ] =------------')
  console.log('request url:', req.url)
  console.log('request method:', req.method)
  console.log('request headers:', headers)
  console.log('request query:', req.query)
  console.log('request body:', req.body)
  console.log('')

  next()
}

module.exports = {
  requestDebug
}
