const debug = require('debug')('botmatic:integration:setproperties')
const _setToken = (client, key, token) => {
  return _set(client, `${key}:token`, token)
}

const _delToken = (client, key) => {
  return _del(client, `${key}:token`)
}

const _set = (client, key, value) => new Promise(resolve => {
  client.set(key, value, err => {
    debug(key, value, err)
    if (!err)
      resolve({success: true})
    else
      resolve({success: false, error: err})
  })
})

const _get = (client, key) => new Promise(resolve => {
  client.get(key, (err, value) => {
    if (!err)
      resolve({success: true, value})
    else
      resolve({success: false, error: err})
  })
})

const _del = (client, key) => new Promise(resolve => {
  client.del(key, err => {
    if (!err)
      resolve({success: true})
    else
      resolve({success: false, error: err})
  })
})

const init = () => {
  const client = require('redis').createClient(process.env.BOTMATIC_REDIS_URL)

  return {
    setToken: (key, token) => _setToken(client, key, token),
    delToken: (key, token) => _delToken(client, key, token),
    getToken: (key) => _get(client, `${key}:token`),
    set: (key, value) => _set(client, key, value),
    get: (key) => _get(client, key),
    del: (key) => _del(client, key)
  }
}

module.exports = init()
