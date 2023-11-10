<template>
  <div>
    <Table :rows="rows" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import Table from './components/Table.vue';

const rows = [
  {
    date: new Date().toLocaleString(),
    name: 'Alice',
    address: '123 Maple Street',
  },
  {
    date: new Date().toLocaleString(),
    name: 'Bob',
    address: '456 Oak Avenue',
  },
  {
    date: new Date().toLocaleString(),
    name: 'Charlie',
    address: '789 Pine Lane',
  },
];
const columns = ['date', 'name', 'address'];
</script>
