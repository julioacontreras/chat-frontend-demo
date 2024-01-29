<script setup lang="ts">
import { defineProps } from 'vue'
import type { Contact } from '@/ddd/modules/contacts/types/contact'

interface Props {
  contact: Contact
}

defineProps<Props>()
</script>

<template>
  <section class="flex flex-row w-full pt-4 pl-2">
    <img :src="contact.image" class="w-20 h-20 rounded-full " />
    <div class="pl-2 pt-1">
      <p> {{ contact.name }} </p>
      <p v-if="contact.isOnline" class="text-green-500 text-sm"> Online </p>
      <p v-else class="text-gray-500 text-sm"> Offline </p>
    </div>
  </section>
</template>
