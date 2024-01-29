import type { AttachmentMessage } from '../types/attachment-message'
import type { BaseMessage } from '../types/base-message'
import type { MessagePackage } from '../types/message-package'
import type { Side } from '../types/side'
import type { TextMessage } from '../types/text-message'
import type { TypeAttachment } from '../types/type-attachment'

export class MessageAggregator {
    data: MessagePackage = {
      createdAt: 0,
      side: 'right',
      message: null
    }

    constructor(message: MessagePackage | null) {
      if (message) {
        this.data = message
      }
    }

    setSide(side: Side): void {
      this.data.side = side
    }

    isTextMessage(): boolean {
      return (this.data.message as BaseMessage).type === 'text'
    }

    isAttachmentMessage(): boolean {
      return (this.data.message as BaseMessage).type.includes('attachment')
    }

    sent() {
      (this.data.message as BaseMessage).status = 'sent'
    }

    setTextMessage(message: string) {
      this.data.message = {
        status: 'pending',
        type: 'text',
        message
      } as TextMessage
    }

    setAttachmentMessage(url: string, type: TypeAttachment, name: string) {
      this.data.message = {
        status: 'pending',
        url,
        type,
        name
      } as AttachmentMessage  
    }

    getMessage (): MessagePackage {
      return this.data
    }

    getType(): string {
      return (this.data.message as BaseMessage).type
    }

    getTextMessage(): TextMessage {
      const textMessage = this.data.message as TextMessage
      return {
        ...textMessage,
        time: this.getTime()
      }
    }

    getAttachmentMessage(): AttachmentMessage {
      const attachedMessage = this.data.message as AttachmentMessage
      return {
        ...attachedMessage,
        time: this.getTime()
      }
    }

    createdNow(): void {
      this.data.createdAt = new Date().getTime()
    }

    getSide(): Side {
      return this.data.side
    }

    getImage(): string | undefined {
      return this.data.image
    }

    getTime(): string {
      return new Date(this.data.createdAt).toLocaleTimeString('es-ES', {  timeStyle: 'short' })
    }

}
