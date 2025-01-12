<template>
    <div class="flex h-screen bg-zinc-900">
      <!-- Chat Section -->
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div v-for="message in messages" 
               :key="message.timestamp" 
               :class="['flex', message.sender === userStore.userID ? 'justify-end' : 'justify-start']">
            <div :class="['max-w-[70%] rounded-lg p-3', 
                         message.sender === userStore.userID ? 
                         'bg-indigo-600 text-white' : 
                         'bg-zinc-800 text-gray-200']">
              <p class="text-sm">{{ message.text }}</p>
              <span class="text-xs opacity-50">
                {{ new Date(message.timestamp?.toDate()).toLocaleTimeString() }}
              </span>
            </div>
          </div>
        </div>
    
        <!-- Input Area -->
        <div class="border-t border-zinc-800 p-4">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input v-model="newMessage" 
                   placeholder="Type a message..." 
                   class="flex-1 bg-zinc-800 text-white rounded-lg p-2 border border-zinc-700"/>
            <button type="submit" 
                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Send
            </button>
          </form>
        </div>
      </div>
    
      <!-- Todo List Panel -->
      <div class="w-80 border-l border-zinc-800 p-4">
        <h2 class="text-xl font-bold text-white mb-4">Todo List</h2>
        <div class="space-y-4">
          <div class="flex gap-2">
            <input v-model="task" 
                   placeholder="New task..." 
                   class="flex-1 bg-zinc-800 text-white rounded p-2 border border-zinc-700"/>
            <button @click="addTask" 
                    class="bg-green-600 text-white px-3 rounded hover:bg-green-700 transition-colors">
              Add
            </button>
          </div>
          
          <ul class="space-y-2">
            <li v-for="(task, index) in tasks" 
                :key="index" 
                class="flex items-center justify-between bg-zinc-800 p-2 rounded">
              <span :class="{'line-through': task.completed}" class="text-white">
                {{ task.text }}
              </span>
              <div class="flex gap-2">
                <button @click="toggleTask(index)" 
                        class="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700 transition-colors">
                  {{ task.completed ? 'Undo' : 'Done' }}
                </button>
                <button @click="deleteTask(index)" 
                        class="text-xs bg-red-600 px-2 py-1 rounded hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </template>
    
    <script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
    import { db } from '@/firebase'
    import { useUserStore } from '@/stores/userStores'
    
    const route = useRoute()
    const chatId = route.params.chatId as string
    const userStore = useUserStore()
    const messages = ref<any[]>([])
    const newMessage = ref('')
    const tasks = ref<{text: string, completed: boolean}[]>([])
    const task = ref('')
    
    const fetchMessages = () => {
      const q = query(
        collection(db, `chats/${chatId}/messages`), 
        orderBy('timestamp', 'asc')
      )
      
      onSnapshot(q, (snapshot) => {
        messages.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    }
    
    const sendMessage = async () => {
      if (!newMessage.value.trim()) return
      
      try {
        await addDoc(collection(db, `chats/${chatId}/messages`), {
          text: newMessage.value,
          sender: userStore.userID,
          timestamp: serverTimestamp()
        })
        newMessage.value = ''
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
    
    const addTask = () => {
      if (!task.value.trim()) return
      tasks.value.push({ text: task.value, completed: false })
      task.value = ''
    }
    
    const toggleTask = (index: number) => {
      tasks.value[index].completed = !tasks.value[index].completed
    }
    
    const deleteTask = (index: number) => {
      tasks.value.splice(index, 1)
    }
    
    onMounted(() => {
      fetchMessages()
      userStore.fetchUserID()
    })
    </script>