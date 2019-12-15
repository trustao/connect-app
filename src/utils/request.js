import axios from 'axios'
import store from '../store'
import router from '../router'
import {authKey} from "./auth";
import {aesDecrypt, aesEncrypt, md5} from "./lock";
import {BASE_URL} from '../../config'

const KEY = 't-k'

const instance = axios.create()

function  request(link, params) {
  const keyInfo = store.state.key
  if (!authKey(keyInfo)) {
    router.push('/login')
    return Promise.reject()
  }
  return instance.get(BASE_URL + link, {
    headers: {
      [KEY]:  md5(keyInfo.key)
    },
    params
  }).then((res) => {
    console.log(res)
    const {data} = res
    if (data.code === 0) {
      return {...data, data: JSON.parse(aesDecrypt(data.data, keyInfo.key))}
    } else if (data.code === 4) {
      router.push('/login')
      return data
    } else {
      return data
    }
  }).catch(err => {
    console.error(err)
    return {}
  })
}

export function fetchData (link, type = 'list') {
  const keyInfo = store.state.key || {}
  return request('/g', {
    l: aesEncrypt(link, keyInfo.key || ''),
    type
  }).then(({data}) => data)
}

export function searchData(str) {
  const keyInfo = store.state.key || {}
  return request('/s', {
    k: aesEncrypt(str, keyInfo.key || ''),
  })
}

export function loginCheck(key) {
  return instance.get(BASE_URL + '/l', {
    headers: {
      [KEY]: md5(key)
    }
  }).catch(() => {
    router.push('/login')
  })
}
