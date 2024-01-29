import type { StatusCode } from '@/ddd/modules/shared/types/status-code'
import type { DataResponseMessage } from '@/ddd/modules/chat/types/data-response-authentication'
import { AuthAggregator } from '@/ddd/modules/authentication/aggregators/auth-aggregator'
import Settings from '@/config/settings.json'

export type Callback = (data: DataResponseMessage[], status: StatusCode) => void

export async function getChat(contactUsername: string, callback: Callback): Promise<void> {
  const authAggregator = new AuthAggregator()
  const username =  authAggregator.getUsername() || ''
  const URL = Settings.endpoints.getChat.replace(':contact-username', contactUsername)
  const HEADERS = { authorization: `Bearer ${authAggregator.getToken()}`, username }
  try {
    // get data
    const response = await fetch(URL, { headers: HEADERS }); 
    const data: DataResponseMessage[] = await response.json()
    // send data
    callback(data || [], response.status)    
  } catch (err) {
      console.error({ err })
      callback([], 500)    
  }
}
