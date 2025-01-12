<template>
    <div class="min-h-full">
      <Disclosure as="nav" class="bg-zinc-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-12 w-12 brightness-200" src="@/assets/vue.svg" alt="Your Company" />
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a @click="currentView = 'Dashboard'" 
                     :class="[currentView === 'Dashboard' ? 'bg-zinc-900 text-white' : 'text-gray-300 hover:bg-zinc-700 hover:text-white']"
                     class="rounded-md px-3 py-2 text-sm font-medium cursor-pointer">Home</a>
  
                  <a @click="currentView = 'Team'"
                     :class="[currentView === 'Team' ? 'bg-zinc-900 text-white' : 'text-gray-300 hover:bg-zinc-700 hover:text-white']"
                     class="rounded-md px-3 py-2 text-sm font-medium cursor-pointer">Sponsors</a>
  
                  <a @click="currentView = 'Projects'"
                     :class="[currentView === 'Projects' ? 'bg-zinc-900 text-white' : 'text-gray-300 hover:bg-zinc-700 hover:text-white']"
                     class="rounded-md px-3 py-2 text-sm font-medium cursor-pointer">Projects</a>
  
                  <a @click="currentView = 'Calendar'"
                     :class="[currentView === 'Calendar' ? 'bg-zinc-900 text-white' : 'text-gray-300 hover:bg-zinc-700 hover:text-white']"
                     class="rounded-md px-3 py-2 text-sm font-medium cursor-pointer">Chat</a>
  
                  <a @click="currentView = 'Reports'"
                     :class="[currentView === 'Reports' ? 'bg-zinc-900 text-white' : 'text-gray-300 hover:bg-zinc-700 hover:text-white']"
                     class="rounded-md px-3 py-2 text-sm font-medium cursor-pointer">Reports</a>
                  <a @click="currentView = 'Create'"
                     :class="[currentView === 'Create' ? 'bg-zinc-900 text-white' : 'text-gray-300 hover:bg-zinc-700 hover:text-white']"
                     class="rounded-md px-3 py-2 text-sm font-medium cursor-pointer">Create + </a>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="size-6" aria-hidden="true" />
                </button>
  
                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Open user menu</span>
                      <img class="size-8 rounded-full" :src="user.imageUrl" alt="" />
                    </MenuButton>
                  </div>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-zinc-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-zinc-700' : '', 'block px-4 py-2 text-sm text-gray-300']">Your Profile</a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-zinc-700' : '', 'block px-4 py-2 text-sm text-gray-300']">Settings</a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a @click="handleLogout" :class="[active ? 'bg-zinc-700' : '', 'block px-4 py-2 text-sm text-gray-300 cursor-pointer']">Sign out</a>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                <XMarkIcon v-else class="block size-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>
  
        <DisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
          </div>
          <div class="border-t border-gray-700 pb-3 pt-4">
            <div class="flex items-center px-5">
              <div class="shrink-0">
                <img class="size-10 rounded-full" :src="user.imageUrl" alt="" />
              </div>
              <div class="ml-3">
                <div class="text-base/5 font-medium text-white">{{ user.name }}</div>
                <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
              </div>
              <button type="button" class="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="size-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">{{ item.name }}</DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
  
      <header class="bg-zinc-900 shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-white">{{ currentView }}</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <DashboardView v-if="currentView === 'Dashboard'" />
          <TeamView v-if="currentView === 'Team'" />
          <ProjectsView v-if="currentView === 'Projects'" />
          <CalendarView v-if="currentView === 'Calendar'" />
          <ReportsView v-if="currentView === 'Reports'" />
          <CreateView v-if="currentView === 'Create'" />
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { useAuth0 } from '@auth0/auth0-vue'
  import DashboardView from './DashboardView.vue'
  import TeamView from './TeamView.vue'
  import ProjectsView from './ProjectsView.vue'
  import CalendarView from './CalendarView.vue'
  import ReportsView from './ReportsView.vue'
  import CreateView from './CreateView.vue'
  import {doc, setDoc, getDoc} from 'firebase/firestore'
  import { db } from '@/firebase'
  
  const { user: auth0User, logout } = useAuth0()
  const currentView = ref('Dashboard')
  const saveUserToFirestore = async () => {
  console.log("RANSTUFF")
  try {
    if (!user.value?.sub) {
      console.error("No user sub found")
      return
    }
    const attempt = await getDoc(doc(db, "Users", user.value.sub))
    if(attempt.exists()){
      console.log("User already exists")
      return
    }
    await setDoc(
      doc(db, "Users", user.value.sub), 
      {
        email: user.value.email || '',
        username: user.value.name || '',
        lastLogin: new Date().toISOString(),
        Todo: [{}],
        Contracts: [{}],
        Age: 1,
        Realname: "NotAvailableRightNow",
        Skills: [],
        Links: [],
        Desc: ""
      },
      { merge: true }
    )
    console.log("User saved:", user.value.sub)
  } catch (error) {
    console.error("Firestore Error:", error)
  }
}
  const user = computed(() => ({
    name: auth0User.value?.name || 'Unknown User',
    email: auth0User.value?.email || 'no-email@example.com',
    imageUrl: auth0User.value?.picture || 'https://via.placeholder.com/256',
    sub: auth0User.value?.sub,
  }))

  const handleLogout = async () => {
    try {
      await logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  watch(
  () => user.value,
  (newVal) => {
    saveUserToFirestore(newVal)
  },
  { immediate: true }
)

  </script>