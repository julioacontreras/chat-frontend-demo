import type { TypeStatus } from './type-status'

export type BaseMessage = {
  messageId: string
  from: string
  type: string
  status: TypeStatus
  time: string
  conversationId: string
}
