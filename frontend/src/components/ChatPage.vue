<template>
    <div class="flex h-screen">
      <!-- Chat Section -->
      <div class="flex-1 flex flex-col">
        <h1 class="text-center text-2xl font-bold my-4">Chat Room</h1>
        <div class="flex-1 overflow-y-auto p-4">
          <ul>
            <li v-for="message in messages" :key="message.timestamp">
              <strong>{{ message.sender }}:</strong> {{ message.text }}
            </li>
          </ul>
        </div>
        <div class="p-4">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." class="w-full p-2 border rounded"/>
          <button @click="sendMessage" class="mt-2 bg-blue-500 text-white p-2 rounded">Send</button>
        </div>
      </div>
  
      <!-- Sidebar To-Do List -->
      <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
          <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </TransitionChild>
  
          <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
              <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                  <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                    <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div class="px-4 sm:px-6">
                        <DialogTitle class="text-base font-semibold text-gray-900">To-Do List</DialogTitle>
                      </div>
                      <div class="relative mt-6 flex-1 px-4 sm:px-6">
                        <input type="text" v-model="task" placeholder="Enter task" class="w-full p-2 border rounded"/>
                        <button class="mt-2 bg-green-500 text-white p-2 rounded" @click="submitTask">Submit Task</button>
  
                        <table class="table-auto w-full mt-5">
                          <thead>
                            <tr>
                              <th>Task</th>
                              <th>Status</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(task, index) in tasks" :key="index">
                              <td :class="{ 'line-through': task.status === 'finished' }">{{ task.name }}</td>
                              <td @click="changeStatus(index)" class="cursor-pointer">{{ capitalizeFirstChar(task.status) }}</td>
                              <td @click="editTask(index)" class="cursor-pointer">✏️</td>
                              <td @click="deleteTask(index)" class="cursor-pointer">🗑️</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <button @click="open = true" class="fixed bottom-5 right-5 bg-purple-600 text-white p-2 rounded">Open To-Do List</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
  import { db } from '@/firebase';
  import { useUserStore } from '@/stores/userStores'
  
  const route = useRoute();
  const chatId = route.params.chatId as string;
  const messages = ref<{ text: string; sender: string; timestamp: any }[]>([]);
  const newMessage = ref('');
  const open = ref(false);

  userStore.fetchUserID()
    console.log("User ID from Pinia:", userStore.userID)
  
  const task = ref('');
  const tasks = ref<{ name: string; status: string }[]>([]);
  
  const fetchMessages = () => {
    const q = query(collection(db, `chats/${chatId}/messages`), orderBy('timestamp'));
    onSnapshot(q, (snapshot) => {
      messages.value = snapshot.docs.map(doc => doc.data() as any);
    });
  };
  
  const sendMessage = async () => {
    if (!newMessage.value.trim()) return;
    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text: newMessage.value,
      sender: userStore.userID,
      timestamp: serverTimestamp()
    });
    newMessage.value = '';
  };
  
  const submitTask = () => {
    tasks.value.push({ name: task.value, status: 'to-do' });
    task.value = '';
  };
  
  const changeStatus = (index: number) => {
    tasks.value[index].status = tasks.value[index].status === 'finished' ? 'to-do' : 'finished';
  };
  
  const editTask = (index: number) => {
    task.value = tasks.value[index].name;
  };
  
  const deleteTask = (index: number) => {
    tasks.value.splice(index, 1);
  };
  
  const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  
  onMounted(fetchMessages);
  </script>
  
  <style>
  .line-through {
    text-decoration: line-through;
  }
  </style>
  