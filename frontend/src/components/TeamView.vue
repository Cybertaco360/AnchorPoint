<template>
    <div class="space-y-6">
      <!-- Filters -->
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select v-model="filters.status" 
                  class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white">
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
          <select v-model="filters.budget" 
                  class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white">
            <option value="">All</option>
            <option value="0-1000">$0 - $1,000</option>
            <option value="1000-5000">$1,000 - $5,000</option>
            <option value="5000+">$5,000+</option>
          </select>
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Skills</label>
          <select v-model="filters.skill" 
                  class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white">
            <option value="">All</option>
            <option v-for="skill in availableSkills" :key="skill" :value="skill">
              {{ skill }}
            </option>
          </select>
        </div>
      </div>
  
      <!-- Contract Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <div v-for="contract in filteredContracts" :key="contract.id"
             class="bg-zinc-800 rounded-lg p-6 space-y-4 shadow-xl shadow-blue-950">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-white">{{ contract.title }}</h3>
            <span :class="getStatusClass(contract.status)">
              {{ contract.status }}
            </span>
          </div>
          
          <p class="text-gray-400 text-sm">{{ contract.description }}</p>
          
          <div class="flex justify-between items-center">
            <span class="text-indigo-400 font-semibold">${{ contract.budget }}</span>
            <span class="text-sm text-gray-500">{{ formatDate(contract.deadline) }}</span>
          </div>
  
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in contract.skills" :key="skill"
                  class="px-2 py-1 bg-zinc-700 rounded-full text-xs text-white">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  const filters = ref({
    status: '',
    budget: '',
    skill: ''
  })
  
  const contracts = ref([
    {
      id: 1,
      title: 'Web App Development',
      description: 'Looking for a developer to build a modern web application',
      status: 'open',
      budget: 3000,
      deadline: '2024-04-01',
      skills: ['Vue', 'TypeScript', 'Tailwind']
    },
    {
      id: 2,
      title: 'Mobile App Design',
      description: 'Need a designer for iOS app interface',
      status: 'open',
      budget: 2000,
      deadline: '2024-03-15',
      skills: ['Figma', 'UI/UX', 'iOS']
    }
    // Add more contracts as needed
  ])
  
  const availableSkills = computed(() => {
    const skills = new Set<string>()
    contracts.value.forEach(contract => {
      contract.skills.forEach(skill => skills.add(skill))
    })
    return Array.from(skills)
  })
  
  const filteredContracts = computed(() => {
    return contracts.value.filter(contract => {
      const matchesStatus = !filters.value.status || contract.status === filters.value.status
      const matchesSkill = !filters.value.skill || contract.skills.includes(filters.value.skill)
      
      let matchesBudget = true
      if (filters.value.budget) {
        const [min, max] = filters.value.budget.split('-').map(Number)
        if (max) {
          matchesBudget = contract.budget >= min && contract.budget <= max
        } else {
          matchesBudget = contract.budget >= min
        }
      }
  
      return matchesStatus && matchesSkill && matchesBudget
    })
  })
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'open':
        return 'bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-medium'
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full text-xs font-medium'
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full text-xs font-medium'
      default:
        return 'bg-gray-500/10 text-gray-500 px-2 py-1 rounded-full text-xs font-medium'
    }
  }
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }
  </script>