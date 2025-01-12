<template>
    <div class="max-w-2xl mx-auto p-6">
      <h2 class="text-2xl font-semibold text-white mb-6 flex justify-center">Create a new Contract</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Contract Title</label>
          <input v-model="contract.title" type="text" required 
                 class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"/>
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea v-model="contract.description" required rows="4"
                    class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"></textarea>
        </div>
  
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Budget</label>
            <input v-model="contract.budget" type="number" required min="0"
                   class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
            <input v-model="contract.deadline" type="date" required
                   class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"/>
          </div>
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Required Skills</label>
          <input v-model="skillInput" @keyup.enter="addSkill" type="text"
                 placeholder="Press enter to add skill"
                 class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"/>
          <div class="flex flex-wrap gap-2 mt-2">
            <span v-for="skill in contract.skills" :key="skill" 
                  class="px-2 py-1 bg-indigo-600 rounded-full text-sm text-white">
              {{ skill }}
              <button @click="removeSkill(skill)" class="ml-1">&times;</button>
            </span>
          </div>
        </div>
  
        <button type="submit" 
                class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium">
          Create Contract
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { doc, setDoc, getDoc } from 'firebase/firestore'
  import { db } from '@/firebase'
  import { useAuth0 } from '@auth0/auth0-vue'
  
  const { user } = useAuth0()
  const skillInput = ref('')
  
  const contract = ref({
    title: '',
    description: '',
    budget: 0,
    deadline: '',
    skills: [] as string[],
    status: 'open',
    createdAt: '',
    ownerId: ''
  })
  
  const addSkill = () => {
    if (skillInput.value.trim() && !contract.value.skills.includes(skillInput.value)) {
      contract.value.skills.push(skillInput.value.trim())
      skillInput.value = ''
    }
  }
  
  const removeSkill = (skill: string) => {
    contract.value.skills = contract.value.skills.filter(s => s !== skill)
  }
  
  const handleSubmit = async () => {
    try {
      if (!user.value?.sub) throw new Error('Not authenticated')
      
      const contractRef = doc(db, 'contracts', crypto.randomUUID())
      await setDoc(contractRef, {
        ...contract.value,
        createdAt: new Date().toISOString(),
        ownerId: user.value.sub
      })
  
      // Reset form
      contract.value = {
        title: '',
        description: '',
        budget: 0,
        deadline: '',
        skills: [],
        status: 'open',
        createdAt: '',
        ownerId: ''
      }
  
      alert('Contract created successfully!')
    } catch (error) {
      console.error('Error creating contract:', error)
      alert('Failed to create contract')
    }
  }
  </script>