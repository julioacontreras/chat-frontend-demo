import type { Contact } from '../types/contact'
import { getContacts } from '@/api/getContacts'

export class ContactRepository {
  contacts: Contact[] = []

  async getContacts() {
    await getContacts((contacts: Contact[]) => {
      this.contacts = contacts
    })
    return this.contacts
  }
}
