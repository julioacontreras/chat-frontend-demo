<script setup lang="ts">
import { defineProps } from 'vue'

// types
import type { MessagePackage } from '@/ddd/modules/chat/types/message-package'
import type { TextMessage } from '@/ddd/modules/chat/types/text-message';

// aggregators
import { MessageAggregator } from '@/ddd/modules/chat/aggregators/message-aggregator'
import type { AttachmentMessage } from '@/ddd/chat/domains/types/attachment-message';

interface Props {
  data: MessagePackage
}

const props = defineProps<Props>()
const messageAggregator = new MessageAggregator(props.data)

</script>

<template>
  <section class="flex flex-row w-full" :class="{
    'justify-start': messageAggregator.getSide() === 'left',
    'justify-end': messageAggregator.getSide() === 'right',
  }">
    <div class="flex flex-row gap-2 w-60  p-2" :class="{
      'justify-start ': messageAggregator.getSide() === 'left',
      'justify-end bg-gray-100 rounded-s-xl rounded-t-xl': messageAggregator.getSide() === 'right',
    }">
      <div v-if="data.image">
        <img :src="data.image" class="h-6 w-6 rounded-full" />
      </div>
      <div :class="{
        'bg-gray-200 rounded-b-xl rounded-e-xl p-2 w-60': messageAggregator.getSide() === 'left',
        'text-right': messageAggregator.getSide() === 'right'
      }">
        <p v-if="data.message.type === 'text'"> {{ (data.message as TextMessage).message }} </p>
        <a class="hover:underline text-primary" target="_blank" v-if="data.message.type === 'attachment-image' ||
          data.message.type === 'attachment-file'" :href="data.message.url">
          {{ (data.message as AttachmentMessage).name }}
        </a>
        <div class="flex flex-row justify-end">
          <p class="text-sm text-gray-400"> {{ messageAggregator.getTime() }} </p>
          <div v-if="data.message.status === 'pending'" class="flex justify-center items-center w-4 h-4">

            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.99999 7.586L9.59599 2.9895L10.3035 3.6965L4.99999 9L1.81799 5.818L2.52499 5.111L4.99999 7.586Z"
                fill="#666" />
            </svg>
          </div>
          <div v-if="data.message.status === 'sent'" class="flex justify-center items-center w-4 h-4">

            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.801 6.88L6.507 7.586L10.74 3.353L11.447 4.06L6.507 9L3.325 5.818L4.032 5.111L5.0945 6.1735L5.801 6.8795V6.88ZM5.802 5.466L8.278 2.9895L8.983 3.6945L6.507 6.171L5.802 5.466ZM4.3885 8.2935L3.682 9L0.5 5.818L1.207 5.111L1.9135 5.8175L1.913 5.818L4.3885 8.2935Z"
                fill="#27AE60" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
