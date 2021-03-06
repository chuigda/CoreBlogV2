import { typeAssert } from '../utils/typeAssert'
import cfgAttr from '../../../cfgAttr/index.json'

typeAssert(cfgAttr, {
  dev: {
    backendUrl: 'string'
  },
  pro: {
    backendUrl: 'string'
  },
  creds: [
    {
      storageName: 'string',
      key: 'string',
      header: 'string'
    }
  ]
})

export const backendUrl = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return cfgAttr.dev.backendUrl
    default:
      return cfgAttr.pro.backendUrl
  }
})()

export const userCreds = cfgAttr.creds

// TODO: setup custom logged-out actions
// Giving a hint message, redirect the page, force page update or so
export const loggedOutActions = () => {
  window.location.href = '/logged-out'
}
