const KEY = 'AUTH_PW'

export function getKeyFormStorage() {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch (e) {
    console.error(e)
    return  {}
  }
}

export function authKey(key) {
  return !!key && key.t > Date.now()
}

export function setKeyToStorage(key) {
  if (!key || typeof key !== 'string') {
    throw new Error('key error')
  }
  const res = {
    t: new Date(new Date().toLocaleDateString() + ' 23:59:59').getTime(),
    key
  }
  localStorage.setItem(KEY, JSON.stringify(res))
  return res
}