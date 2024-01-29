<script setup lang="ts">
import { ref } from 'vue'

// types
import type { MessagePackage } from '@/ddd/modules/chat/types/message-package'
import type { Contact } from '@/ddd/modules/contacts/types/contact'

// aggregator
import { MessageAggregator } from '@/ddd/modules/chat/aggregators/message-aggregator'

// use cases
import { useChat } from '@/ddd/modules/shared/use-cases/use-chat'

// components
import Stack from '@/ui/components/stack/stack-component.vue'
import SideBar from '@/ui/views/side-bar/side-bar.vue'
import ContactList from '@/ui/views/contact-list/contact-list.vue'
import ChatForm from '@/ui/views/chat-form/chat-form.vue'

// config
import Settings from '@/config/settings.json'

// socket
import { socket } from '@/ddd/adapters/socket'

// store
import { useMessageStore } from '@/stores/message'

import { AuthAggregator } from '@/ddd/modules/authentication/aggregators/auth-aggregator'

const authAggregator = new AuthAggregator()
const store = useMessageStore()
const contacts = ref<Contact[]>([])
const selected = ref(0)
const onlyRead = ref<boolean>(authAggregator.getRole() === 'observer' )


const updateChat = async () => {
  useChat((dataContacts: Contact[], dataMessages: MessagePackage[]) => {
    contacts.value = dataContacts
    store.setMessages(dataMessages)
  }, selected.value)
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function fakeReply(): MessagePackage {
  const messageAggregator = new MessageAggregator(null)
  messageAggregator.setSide('left')
  messageAggregator.createdNow()
  const answers = ['ohh', 'I understand', 'oh my god!']
  messageAggregator.setTextMessage(answers[getRandomInt(answers.length)])
  messageAggregator.sent()
  return messageAggregator.getMessage()
}

socket.connect(Settings.socket.url)

// receive message from contact
socket.onReceiveMessage((conversationId: string, data: unknown): void => {
  const messagePackage = data as MessagePackage
  const messageAggregator = new MessageAggregator(messagePackage)
  if (messageAggregator.getBaseMessage().type !== 'text') {
    return
  }
  store.addMessage(fakeReply())
})

const addMessage = (data: MessagePackage) => {
  const messageAggregator = new MessageAggregator(data)
  messageAggregator.sent()
  if (messageAggregator.isTextMessage()) {
    const msg = messageAggregator.getTextMessage()
    store.addMessage(data)
    socket.sendMessage(msg.conversationId, data)
  } else
  if (messageAggregator.isAttachmentMessage()) {
    const msg = messageAggregator.getAttachmentMessage()
    store.addMessage(data)
    socket.sendMessage(msg.conversationId, data)
  }
}

const selectContact = (index: number) => {
  selected.value = index
  updateChat()
}

updateChat()
</script>

<template>
  <div class="flex">
    <Stack>
      <SideBar />
      <ContactList :contacts="contacts" :selected="selected" @select-contact="selectContact" />
    </Stack>
    <ChatForm :messages="store.getMessages.value" :usersStatus="contacts" :selected="selected"
      @send-message="addMessage" :onlyRead="onlyRead" />
  </div>
</template>
