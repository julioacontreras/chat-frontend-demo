<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

// types
import type { MessagePackage } from '@/ddd/modules/chat/types/message-package'
import type { Contact } from '@/ddd/modules/contacts/types/contact'

// components
import CardContact from '@/ui/components/card-contact/card-contact.vue'
import ChaShowMessages from '@/ui/components/chat/chat-show-messages.vue'
import ChaSendMessage from '@/ui/components/chat/chat-send-message.vue'

interface Props {
  usersStatus: Contact[],
  selected: number,
  onlyRead: boolean
}

defineProps<Props>()

const showMessages = ref(null)
const emit = defineEmits<{
  (e: 'send-message', message: MessagePackage): void
}>()


const sendMessage = (message: MessagePackage) => {
  emit('send-message', message)
}
</script>

<template>
  <div class="flex w-full">
    <div class="flex flex-col w-full relative">
      <CardContact v-if="usersStatus.length > 0" :contact="usersStatus[selected]" />
      <ChaShowMessages ref="showMessages" />
      <ChaSendMessage v-if="!onlyRead" class="absolute bottom-0" @send-message="sendMessage" />
    </div>
  </div>
</template>
