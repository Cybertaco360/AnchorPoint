<template>
  <PrimaryNavigation class="z-20" v-if="!isAuthenticated" />
  <router-view></router-view>
</template>

<script setup lang="ts">
import PrimaryNavigation from './components/PrimaryNavigation.vue'
import { useAuth0 } from '@auth0/auth0-vue';
const { isAuthenticated } = useAuth0()
</script>