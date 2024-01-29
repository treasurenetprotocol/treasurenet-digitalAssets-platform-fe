import http from './http'

export async function getHexMsg(address: string): Promise<any> {
  const res = await http.get('/api/getHexMsg', { address })
  return await Promise.resolve(res)
}

export async function login(params: { address: string; signature: string }): Promise<any> {
  const res = await http.post('/api/login', params)
  return await Promise.resolve(res)
}

export async function getUserInfo(): Promise<any> {
  const res = await http.get('/api/getUserInfo')
  return await Promise.resolve(res)
}
