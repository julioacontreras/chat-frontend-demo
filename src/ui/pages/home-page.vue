<script setup lang="ts">

// use cases
import { checkLogin } from '@/ddd/modules/shared/use-cases/check-login'

// compones
import LoginForm from '@/ui/views/login-form/login-form.vue'
import router from '@/router'

const login = async (username: string, password: string) => {
  const isValid = await checkLogin(username, password)
  if (isValid) {
    router.push({ path: '/chat' })
  }
}
</script>

<template>
  <main>
    <LoginForm :submit="login" />
  </main>
</template>
