import { getChat } from '@/api/getChat'
import type { DataResponseMessage } from '../types/data-response-authentication'

export class MessageRepository {
  messages: DataResponseMessage[] = []
  async getMessages(contactUsername: string) {
    await getChat(contactUsername, (messages: DataResponseMessage[]) => {
      this.messages = messages
    })
    return this.messages
  }
}
