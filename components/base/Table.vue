<template>
  <table class="basic-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <template v-for="(value, key) in row" :key="key">
          <td v-if="columns.includes(key)">
            <slot :name="key" :rowData="row">{{ value }}</slot>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  columns: string[];
  rows: Record<string, string | number>[];
}>();
</script>

<style lang="less" scoped>
.basic-table {
  width: 100%;

  th {
    border-bottom: 1px solid var(--secondary-bg-color);
    text-transform: capitalize;
  }

  th,
  td {
    text-align: left;
    padding: 8px;
  }

  tbody tr:nth-child(odd) {
  }

  tbody tr:nth-child(even) {
    background-color: var(--secondary-bg-color);
  }
}
</style>
