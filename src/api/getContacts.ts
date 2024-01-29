import type { Contact } from '@/ddd/modules/contacts/types/contact'
import type { StatusCode } from '@/ddd/modules/shared/types/status-code'
import { AuthAggregator } from '@/ddd/modules/authentication/aggregators/auth-aggregator'
import Settings from '@/config/settings.json'

export type CallbackGetContacts = (data: Contact[], status: StatusCode) => void

export async function getContacts(callback: CallbackGetContacts) : Promise<void> {
    const authAggregator = new AuthAggregator()
    const URL = Settings.endpoints.getContacts
    const HEADERS = { authorization: `Bearer ${authAggregator.getToken() || '' }`, username: authAggregator.getUsername() || '' }
    try {
        const response = await fetch(URL, { headers: HEADERS }); 
        const contacts: Contact[] = await response.json()
        callback(contacts, response.status)    
    } catch (err) {
        console.error({ err })
        callback([], 500)    
    }
}
