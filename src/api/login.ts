import type { StatusCode } from '@/ddd/modules/shared/types/status-code'
import type { DataResponseAuth } from '@/ddd/modules/authentication/types/data-response-auth'
import { AuthAggregator } from '@/ddd/modules/authentication/aggregators/auth-aggregator'
import Settings from '@/config/settings.json'

export type Callback = (data: DataResponseAuth | null, status: StatusCode) => void

export async function login(username: string, password: string, callback: Callback): Promise<void> {
  const URL = Settings.endpoints.login
  try {
    const formData = new FormData()
    formData.set('username', username)
    formData.set('password', password)
    // get data
    const response = await fetch(URL, { 
      body: formData,
      method: 'POST'
    }); 
    const data = await response.json() as DataResponseAuth
    const authAggregator = new AuthAggregator()
    authAggregator.setToken(data.token)
    authAggregator.setUsername(data.username)
    authAggregator.setRole(data.role)
    // send data
    callback(data, response.status)    
  } catch (err) {
      console.error({ err })
      callback(null, 500)    
  }
}
