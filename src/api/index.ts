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

export async function getAccountList(page: number = 1, pageSize: number = 20): Promise<any> {
  const res = await http.get("/api/account/list", { page, pageSize });
  return await Promise.resolve(res)
}

export async function addAccount(params: { type: string, account: string }): Promise<any> {
  const res = await http.post('/api/account/save', params)
  return await Promise.resolve(res)
}

export async function changeAccount(uniqueId: string): Promise<any> {
  const res = await http.post("/api/account/setStatus", { uniqueId });
  return await Promise.resolve(res);
}

export async function getMessageList(page: number = 1, pageSize: number = 20, status?: string): Promise<any> {
  const res = await http.get("/api/messages/list", { page, pageSize, status });
  return await Promise.resolve(res)
}

export async function getBlockList(params: { queryType: string, page: number, pageSize: number, type?: string, status?: string, dateFrom?: number, dateTo?: number }): Promise<any> {
  const res = await http.get("/api/block/list", params);
  return await Promise.resolve(res);
}

export async function getContract(name: string): Promise<any> {
  const res = await http.get("/api/contracts/abi", { name });
  return await Promise.resolve(res);
}

export async function setMessageStatus(status: string, msgID?: string): Promise<any> {
  const res = await http.post("/api/messages/setStatus", { msgID, status });
  return await Promise.resolve(res);
}
