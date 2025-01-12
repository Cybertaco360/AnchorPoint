<template>
  <div class="fixed top-0 w-full justify-center flex">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <router-link to="/" class="text-zinc-400 hover:text-white mx-10 text-xl">Information</router-link>
        </NavigationMenuItem>
        <NavigationMenuItem v-if="!isAuthenticated">
          <a @click="login" class="text-zinc-400 hover:text-white cursor-pointer mx-10 text-xl">Login</a>
        </NavigationMenuItem>
        <NavigationMenuItem v-if="isAuthenticated">
          <a @click="logout" class="text-zinc-400 hover:text-white cursor-pointer mx-10 text-xl">Logout</a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { doc, setDoc } from 'firebase/firestore'
import { computed, ref, watch } from 'vue'
import { db } from '@/firebase'
import { useUserStore } from '@/stores/userStores'

const { user: auth0User, loginWithRedirect, logout } = useAuth0()
const userStore = useUserStore()
const isLoading = ref(false)
const isAuthenticated = ref(false)

// Login and Logout
const login = async () => {
  try {
    await loginWithRedirect()
    userStore.fetchUserID()
  } catch (error) {
    console.error("Login error:", error)
  }
}

const handleLogout = async () => {
  try {
    await logout({ returnTo: window.location.origin })
    userStore.userID = null
    isAuthenticated.value = false
  } catch (error) {
    console.error("Logout error:", error)
  }
}
</script>