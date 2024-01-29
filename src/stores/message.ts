import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { MessagePackage } from '@/ddd/modules/chat/types/message-package'

export const useMessageStore = defineStore('message', () => {
  const messages = ref<MessagePackage[]>([])

  function setMessages(data: MessagePackage[]) {
    messages.value = data
  }

  function addMessage(message: MessagePackage) {
    messages.value.push(message)
  }

  const getMessages = computed(() => messages)

  return { setMessages, getMessages, addMessage }
})
