import type { Side } from './side'
import type { Message } from './message'

export type MessagePackage = {
  // message
  message: Message | null

  // ui
  image?: string
  side: Side

  // to control UTF
  createdAt: number
}
