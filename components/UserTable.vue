<template>
  <div>
    <div v-if="isActionable" class="table-actionable">
      <input
        type="text"
        :value="searchTerm"
        @keyup="emit('update:searchTerm', $event)"
        placeholder="Search"
      />
      <Button @click="emit('openModal', 'Add User')" class="button" primary>
        Add User
      </Button>
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
        <Button
          class="icon-button"
          @click="emit('openModal', 'Delete User', slotProps)"
        >
          <img src="../assets/trash.svg" alt="" class="trash-icon" />
        </Button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Button from './base/Button.vue';
import CheckboxInput from './base/CheckboxInput.vue';
import Table from './base/Table.vue';

type RowData = Record<string, string | number>;

const props = defineProps<{
  rowsData: RowData[];
  isActionable?: boolean;
  searchTerm?: string;
}>();
const emit = defineEmits(['openModal', 'update:searchTerm']);

const checkboxList = ref(['date', 'name', 'address']);
const checkedColumns = ref(['date', 'name', 'address']);

const filteredTableData = computed(() => {
  const orderedColumns = checkboxList.value.filter(
    (col) => checkedColumns.value.includes(col) || col === 'actions'
  );

  if (props.isActionable) orderedColumns.push('actions');

  const rows = props.rowsData?.map((row: RowData) => {
    const newRow: RowData = { id: row.id };
    orderedColumns.forEach((col: string) => {
      newRow[col] = row[col];
    });
    return newRow;
  });

  return { columns: orderedColumns, rows };
});
</script>

<style lang="less" scoped>
.user-table-checkbox-list {
  display: flex;
  margin: 20px 0;
}

.icon-button {
  background-color: transparent;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--gray-hover);
    transition: background-color 0.3s;
  }
}

.trash-icon {
  width: 26px;
  display: block;
}

.table-actionable {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
