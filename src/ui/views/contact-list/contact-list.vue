<script setup lang="ts">
    import { defineProps } from 'vue'
    import type { Contact } from '@/ddd/modules/contacts/types/contact'

    // props
    interface Props {
      contacts: Contact[]
      selected: Number
    }
    defineProps<Props>()

    // emits
    const emit = defineEmits<{
        (e: 'select-contact', index: number): void
    }>()    

    // methods
    const selectContact = (index: number) => {
      emit('select-contact', index)
    }
</script>

<template>
  <section 
    class="border-r border-gray-100 w-60 h-screen flex flex-col"
  >
    <h1 class="text-xl font-semibold py-2" >Messages</h1>
    <div
      v-for="(contact, index) in contacts"
      :key="index"
      class="flex flex-row gap-2 p-2 "
      :class="{
        'bg-gray-50': selected === index
      }"
      @click="selectContact(index)"
    >
        <div class="relative h-12 w-12">
          <img :src="contact.image" :alt="`User ${contact.name}`" class="h-12 w-12 rounded-full">
          <div v-if="contact.isOnline" class="absolute w-2 h-2 border border-white bg-green-400 rounded-full right-1 bottom-1 z-10"></div>
          <div v-else class="absolute w-2 h-2 border border-white bg-gray-400 rounded-full right-1 bottom-1 z-10"></div>
        </div>
        <div class="flex flex-col text-xs h-12 items-start">
              <p>{{ contact.name }}</p>
              <p 
                class="text-gray-500"
              > {{ contact.lastMessage }}</p>
              <p v-if="contact.isPending"
                class="text-gray-500"
              > Pending </p>
        </div>   
    </div>
  </section>
</template>
