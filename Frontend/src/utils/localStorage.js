export const getLocalStorage = name => window.localStorage.getItem(name)

export const setLocalStorage = (name, content) => window.localStorage.setItem(name, content)

export const purgeLocalStorage = name => window.localStorage.removeItem(name)

export const getSessionStorage = name => window.sessionStorage.getItem(name)

export const setSessionStorage = (name, content) => window.sessionStorage.setItem(name, content)

export const purgeSessionStorage = name => window.sessionStorage.removeItem(name)
