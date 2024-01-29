import type { BaseMessage } from './base-message'

export type TextMessage = BaseMessage & {
  type: 'text'
  message: string
}
