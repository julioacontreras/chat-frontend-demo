export type CallbackReceiiveMessage = (conversationId: string, data: unknown) => void

export interface SocketAdapter {
    connect: (urlServer: string) => Promise<void>
    sendMessage: (conversationId: string, data: unknown) => Promise<void>
    onReceiveMessage: (callback: CallbackReceiiveMessage) => Promise<void>
}

export let socket: SocketAdapter

export function setSocket (instance: SocketAdapter) {
  socket = instance
}