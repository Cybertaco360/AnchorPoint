<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area'

const data = [
  { name: '2022', total: 20 },
  { name: '2023', total: 25 },
  { name: '2024', total: 13 }
]
</script>

<template>
  <AreaChart :data="data" index="name" :categories="['total']" :colors="['#818cf8']"/>
</template>