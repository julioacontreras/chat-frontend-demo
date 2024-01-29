// types
import type { MessagePackage } from '@/ddd/modules/chat/types/message-package'
import type { Contact } from '@/ddd/modules/contacts/types/contact'

// events
import { transformReponseToMessages } from '@/ddd/modules/chat/events/transform-response-to-messages'

// repositories
import { ContactRepository } from '@/ddd/modules/contacts/repositories/contact-repostory'
import { MessageRepository } from '@/ddd/modules/chat/repositories/message-repostory'

export type SetValues = (dataContacts: Contact[], dataMessages: MessagePackage[]) => void

export async function useChat(callback: SetValues, indexContactSelected: number) {
  // get contacts
  const contactRepository = new ContactRepository()
  const contacts = await contactRepository.getContacts()

  // get messages
  const messageRepository = new MessageRepository()
  const dataMessages = await messageRepository.getMessages(contacts[indexContactSelected].username)

  // parse messages
  const messages = transformReponseToMessages(dataMessages, contacts)

  callback(contacts, messages)
}
