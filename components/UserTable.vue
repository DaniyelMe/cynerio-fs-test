<template>
  <div>
    <div v-if="isActionable">
      <input type="text" v-model="searchTerm" placeholder="Search" />
      <button @click="emit('openModal', 'Add User')">Add User</button>
    </div>

    <div class="user-table-checkbox-list">
      <CheckboxInput
        v-for="checkbox in checkboxList"
        :label="checkbox"
        v-model="checkedColumns"
      />
    </div>

    <Table :columns="filteredTableData.columns" :rows="filteredTableData.rows">
      <template v-slot:actions="slotProps">
        <button
          class="icon-button"
          @click="emit('openModal', 'Delete User', slotProps)"
        >
          <img src="../assets/trash.svg" alt="" class="trash-icon" />
        </button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import CheckboxInput from './base/CheckboxInput.vue';
import Table from './base/Table.vue';

type RowData = Record<string, string>;

const props = defineProps<{
  rowsData: RowData[];
  isActionable?: boolean;
  isSearch?: boolean;
}>();
const emit = defineEmits(['openModal']);

const searchTerm = ref();
const checkboxList = ref(['date', 'name', 'address']);
const checkedColumns = ref(['date', 'name', 'address']);

const filteredTableData = computed(() => {
  const orderedColumns = checkboxList.value.filter(
    (col) => checkedColumns.value.includes(col) || col === 'actions'
  );

  if (props.isActionable) orderedColumns.push('actions');

  const rows = props.rowsData.map((row: RowData) => {
    const newRow: RowData = {};
    orderedColumns.forEach((col: string) => {
      newRow[col] = row[col];
    });
    return newRow;
  });

  return { columns: orderedColumns, rows };
});
</script>

<style scoped>
.user-table-checkbox-list {
  display: flex;
  margin: 20px 0;
}

.icon-button {
  padding: 0;
  margin: 0;
  cursor: pointer;
  /* padding-block: 0;
  border-width: 1px;
  border-color: transparent;
  padding-inline: 0px;
  border-radius: 5px;
  background-color: transparent; */
}

.trash-icon {
  width: 26px;
  display: block;
}
</style>
