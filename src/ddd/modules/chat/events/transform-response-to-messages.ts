
import { AuthAggregator } from '@/ddd/modules/authentication/aggregators/auth-aggregator'

// types
import type { StatusCode } from '@/ddd/modules/shared/types/status-code'
import type { Contact } from '@/ddd/modules/contacts/types/contact'
import type { MessagePackage } from '@/ddd/modules/chat/types/message-package'
import type { DataResponseMessage } from '@/ddd/modules/chat/types/data-response-authentication'
import type { Message } from '../types/message'
import type { TextMessage } from '../types/text-message'
import type { AttachmentMessage } from '../types/attachment-message'
import type { TypeAttachment } from '../types/type-attachment'

export type Callback = (data: MessagePackage[], status: StatusCode) => void

function arrayToMap(contacts: Contact[]) {
  const contactsMap = new Map<string, Contact>()
  contacts.forEach((contact) => {
    contactsMap.set(contact.username, contact)
  })
  return contactsMap
}

export function transformReponseToMessages(
  responseData: DataResponseMessage[],
  contacts: Contact[]
): MessagePackage[] {
  const contactsMap = arrayToMap(contacts)
  const authAggregator = new AuthAggregator()
  const username = authAggregator.getUsername()
  const messages: MessagePackage[] = []
  responseData.forEach((item: DataResponseMessage) => {
    const contact = contactsMap.get(item.username)
    if (!contact && item.username !== username) {
      return []
    }
    let message: Message | null = null
    if (item.typeMessage === 'text') {
      message = {
        // properties from base data
        conversationId: item.conversationId,
        messageId: item.messageId,
        from: contact ? contact.name : '',
        status: item.status,
        // properties from text message
        type: item.typeMessage,
        message: item.message,
      } as TextMessage
    }
    if (item.typeMessage === 'attachment-image' ||
        item.typeMessage === 'attachment-file'
    ) {
      message = {
        // properties from base data
        conversationId: item.conversationId,
        messageId: item.messageId,
        from: contact ? contact.name : '',
        type: item.typeMessage as unknown as TypeAttachment,
        // properties from attachment data
        name: item.fileName,
        status: item.status,
        url: item.url,
      } as AttachmentMessage
    }
    messages.push({
      image: contact?.image,
      createdAt: item.createdAt,
      side: item.username === username ? 'right' : 'left',
      message: message
    })
  })
  return messages
}
