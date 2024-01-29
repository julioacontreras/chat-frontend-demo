<script setup lang="ts">
import { defineProps, ref } from 'vue'
const username = ref('')
const password = ref('')
interface Props {
  submit: (username: string, password: string) => void
}
const props = defineProps<Props>()
const doSubmit = () => {
  props.submit(username.value, password.value)
}
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <p class="flex items-center my-12 text-2xl font-semibold text-gray-900 ">
        Chat APP
      </p>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="doSubmit">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
              <input v-model="username" type="text" name="username" autocomplete="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="john" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
              <input v-model="password" type="password" name="password" autocomplete="current-password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required>
            </div>
            <button type="submit"
              class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
              in</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
