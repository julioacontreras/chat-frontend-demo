import type { TypeNotification } from './type-notification'

export type Notification = {
  message: string
  type: TypeNotification
  isVisible: boolean
}