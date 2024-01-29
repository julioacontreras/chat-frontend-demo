<script setup lang="ts">
    import { watch, ref } from 'vue' 

    // store
    import { useMessageStore } from '@/stores/message'

    // components
    import ItemMessage from './item-message.vue'

    type FollowScroll = { scrollIntoView: ( options: Record<string, string>) => void }
    
    const store = useMessageStore()
    const anchor = ref(null)

    watch(store.getMessages, () => {
      setTimeout(() => {
        const scroll = (anchor.value as unknown as FollowScroll)
        scroll.scrollIntoView({ block: 'end', behavior: 'smooth', inline: 'nearest' });        
      }, 200)
    })      
</script>

<template>
  <section class="flex flex-col gap-2 w-full p-2 overflow-auto h-chat smoth-scroll">
    <ItemMessage 
      v-for="(message, index) in store.getMessages.value" 
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

.smoth-scroll {
  scroll-behavior: smooth;
}
</style>
