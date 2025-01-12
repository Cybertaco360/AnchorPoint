<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const contracts = [
  {
    contract: 'INV010',
    CompletionStatus: 'Complete',
    totalAmount: '$250.00',
    Organization: 'Cheesecakes',
  },
  {
    contract: 'INV002',
    CompletionStatus: 'Under Review',
    totalAmount: '$150.00',
    Organization: 'PaidPals',
  },
  {
    contract: 'INV003',
    CompletionStatus: 'In Progress',
    totalAmount: '$350.00',
    Organization: 'SUR',
  },
  {
    contract: 'INV004',
    CompletionStatus: 'Complete',
    totalAmount: '$450.00',
    Organization: 'Cheesecakes',
  },
  {
    contract: 'INV005',
    CompletionStatus: 'Complete',
    totalAmount: '$550.00',
    Organization: 'PaidPals',
  },
  {
    contract: 'INV006',
    CompletionStatus: 'Under Review',
    totalAmount: '$200.00',
    Organization: 'SUR',
  },
  {
    contract: 'INV007',
    CompletionStatus: 'In Progress',
    totalAmount: '$300.00',
    Organization: 'Cheesecakes',
  },
]

const getStatusClass = (status: string) => {
  switch(status) {
    case 'Complete':
      return 'bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-medium'
    case 'Under Review':
      return 'bg-gray-200/10 text-gray-200 px-2 py-1 rounded-full text-xs font-medium'
    case 'In Progress':
      return 'bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full text-xs font-medium'
    default:
      return 'bg-gray-500/10 text-gray-500 px-2 py-1 rounded-full text-xs font-medium'
  }
}
</script>

<template>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contract</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Organization</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="contract in contracts" :key="contract.contract">
          <TableCell>{{ contract.contract }}</TableCell>
          <TableCell>
            <span :class="getStatusClass(contract.CompletionStatus)">
              {{ contract.CompletionStatus }}
            </span>
          </TableCell>
          <TableCell>{{ contract.totalAmount }}</TableCell>
          <TableCell>{{ contract.Organization }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </template>