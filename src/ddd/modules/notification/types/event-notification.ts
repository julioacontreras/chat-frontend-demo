import type { Notification } from './notification'

export type EventNotification = Event & {
  data: Notification
}
