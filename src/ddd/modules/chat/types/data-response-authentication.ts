import type { TypeStatus } from './type-status'

export type DataResponseMessage = {
  conversationId: string
  messageId: string
  username: string
  status: TypeStatus
  createdAt: number // control UTF
  typeMessage: string

  // attachment
  fileName? : string
  url? : string

  // text
  message?: string
}
