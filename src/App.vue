<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'

  // aggregators
  import { NotificationAggregator } from '@/ddd/modules/notification/aggregators/notification-aggregator'
 
  import Toast from '@/ui/components/toast/toast-component.vue'
 
  const isVisible = ref(false)
  const eventMessage = ref('')
  const typeToastMessage = ref<'success' | 'danger'>('success')

  const hideToast = () => {
    isVisible.value = false
  }

  const notificationAggregator = new NotificationAggregator()
  notificationAggregator.onReceiveNotification((event) => {
    eventMessage.value = event.data.message
    isVisible.value = event.data.isVisible
    typeToastMessage.value = event.data.type
  })

</script>

<template>
  <section class="relative h-screen bg-gray-50">
    <RouterView />
    <Toast
      class="absolute bottom-0 right-4"
      :is-visible="isVisible"
      :message="eventMessage"
      :type="typeToastMessage"
      @hide-toast="hideToast"
    />
  </section>
</template>
