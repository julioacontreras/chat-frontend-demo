<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// types
import type { MessageChat } from '@/ddd/chat/types/message-chat'
import type { Contact } from '@/ddd/contacts/types/contact'

// components
import CardContact from '@/ui/components/card-contact/card-contact.vue'
import ChaShowMessages from '@/ui/components/chat/chat-show-messages.vue'
import ChaSendMessage from '@/ui/components/chat/chat-send-message.vue'

interface Props {
  messages: MessageChat[],
  usersStatus: Contact[],
  selected: number,
  onlyRead: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'send-message', message: MessageChat): void
}>()

const sendMessage = (message: MessageChat) => {
  emit('send-message', message)
}
</script>

<template>
  <div class="flex w-full">
    <div class="flex flex-col w-full relative">
      <CardContact v-if="usersStatus.length > 0" :contact="usersStatus[selected]" />
      <ChaShowMessages :messages="messages" />
      <ChaSendMessage v-if="!onlyRead" class="absolute bottom-0" @send-message="sendMessage" />
    </div>
  </div>
</template>
