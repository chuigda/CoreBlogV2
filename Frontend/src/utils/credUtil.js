import { getLocalStorage, purgeLocalStorage, setLocalStorage } from './localStorage'
import { userCreds } from '../config/config'
import { typeAssert } from './typeAssert'

export const getCreds = () => {
  const ret = {}
  for (const cred of userCreds) {
    ret[cred.key] = getLocalStorage(cred.storageName)
  }
  return ret
}

const credDataAssertion = (() => {
  const ret = {}
  for (const cred of userCreds) {
    ret[cred.key] = 'string'
  }
  return ret
})()

export const saveCreds = (data) => {
  typeAssert(data, credDataAssertion)
  for (const cred of userCreds) {
    setLocalStorage(cred.storageName, data[cred.key])
  }
}

export const credHeaders = () => {
  const ret = {}
  for (const cred of userCreds) {
    const item = getLocalStorage(cred.storageName)
    if (!item) {
      return null
    }
    ret[cred.header] = item
  }
  return ret
}

export const purgeCreds = () => {
  for (const cred of userCreds) {
    purgeLocalStorage(cred.storageName)
  }
}
