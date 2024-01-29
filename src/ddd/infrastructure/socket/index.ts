import type { SocketAdapter, CallbackReceiiveMessage } from '@/ddd/adapters/socket'
import { setSocket } from '@/ddd/adapters/socket'

const TRIGGER_ON_RECEIVED = 'socket-send-message'
const TRIGGER_ON_SENT = 'socket-on-sent'

export type EventSocket = Event & {
  response: {
    conversationId: string
    data: unknown
  }
}

export class Socket implements SocketAdapter {
  connect(urlServer: string): Promise<void> {
    console.info(`Connected socket ${urlServer}`)
    return Promise.resolve()
  }

  sendMessage(conversationId: string, data: unknown): Promise<void> {
    const event = new Event(TRIGGER_ON_RECEIVED) as EventSocket
    event.response = { conversationId, data }
    try {
      dispatchEvent(event)
      const eventSent = new Event(TRIGGER_ON_SENT) as EventSocket
      eventSent.response = { 
        conversationId,
        data: { error: null }
      }
      dispatchEvent(eventSent)
    } catch (error) {
      const eventSent = new Event(TRIGGER_ON_SENT) as EventSocket
      eventSent.response = { 
        conversationId,
        data: { error: true }
      }
      dispatchEvent(eventSent)
    }

    return Promise.resolve()
  }

  onReceiveMessage(callback: CallbackReceiiveMessage): Promise<void> {
    addEventListener(TRIGGER_ON_RECEIVED, (event: Event) => {
      const eventSocket = event as EventSocket
      callback(eventSocket.response.conversationId, eventSocket.response.data)
    })
    return Promise.resolve()
  }
}

const socket = new Socket()
setSocket(socket)
