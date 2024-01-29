import type { BaseMessage } from './base-message'
import type { TypeAttachment } from './type-attachment'

export type AttachmentMessage = BaseMessage & {
  url: string
  type: TypeAttachment
  name: string
}
