<script setup lang="ts">
    import { defineProps, watch, ref } from 'vue' // nextTick
    
    import type { MessagePackage } from '@/ddd/modules/chat/types/message-package'
    import ItemMessage from './item-message.vue'

    interface Props {
      messages: MessagePackage[]
    }
    
    const anchor = ref('anchor')
    const props = defineProps<Props>()
    watch(props.messages, () => {
      setTimeout(() => {
        anchor.value.scrollIntoView({ block: 'end', behavior: 'smooth' });        
      }, 100)
    })      
</script>

<template>
  <section class="flex flex-col gap-2 w-full p-2 overflow-auto h-chat">
    <ItemMessage 
      v-for="(message, index) in messages" 
      :key="`item-message-${index}`" 
      :data="message"
    />
    <div id="anchor" ref="anchor" class="h-1 w-full" />
  </section>
</template>

<style>
.h-chat {
  height: 80vh;
}
</style>
