import type { EventNotification } from '@/ddd/modules/notification/types/event-notification'
import type { Notification } from '@/ddd/modules/notification/types/notification'

export type CallbackNotification = (event: EventNotification) => void

export class NotificationAggregator {
  onReceiveNotification(callback: CallbackNotification) {
    addEventListener('show-toast', (event: Event) => {
      const eventMessage = event as EventNotification
      callback(eventMessage)
    })
  }
  sendNotification(notification: Notification) {
    const event = new Event('show-toast') as EventNotification
    event.data = notification
    dispatchEvent(event)
  }
}
