<template>
  <div>
    <UserTable
      :rowsData="filteredRowsData"
      :searchTerm="searchTerm"
      @update:searchTerm="updateSearchTerm"
      :isActionable="true"
      @openModal="handelShowModal"
    />

    <UserTable :rowsData="rowsData" />

    <Modal
      :isShowModal="modalConfig.isShowModal"
      :header="modalConfig.header"
      :body="modalConfig.body"
      @cancel="handelCencel"
      @confirm="handelConfirm"
    >
      <div v-if="isAddUser" class="add-user-inputs">
        <Input v-model.trim="newUserName" label="Name" :error="userNameError" />
        <Input
          v-model.trim="newUserAddress"
          label="Address"
          :error="userAddressError"
        />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/ui';
import { useUserStore } from '@/stores/users';
import {
  validateAlphaLengthName,
  validateAlphaNumericAddress,
} from '~/composables/regexValidations';

import UserTable from '~/components/UserTable.vue';
import Input from '~/components/base/Input.vue';
import Modal from '~/components/base/Modal.vue';

const userStore = useUserStore();
const uiStore = useUIStore();

const rowsData = computed(() => userStore.getUsers);

const searchTerm = ref('');

const filteredRowsData = computed(() => {
  return searchTerm.value.length > 0
    ? userStore.currentSearched
    : rowsData.value;
});
const modalConfig = computed(() => uiStore.modal);
const isAddUser = computed(() =>
  modalConfig.value.header === 'Add User' ? true : false
);

const userToDelete = ref();
const newUserName = ref('');
const newUserAddress = ref('');

const userNameError = ref();
const userAddressError = ref();

function handelCencel() {
  userToDelete.value = null;
  newUserName.value = '';
  newUserAddress.value = '';
  uiStore.resetModal();
}

function handelConfirm() {
  if (isAddUser.value) {
    if (!validateAlphaLengthName(newUserName.value)) {
      userNameError.value = `Name length should be between 3 and 32 and should not contain numbers or special characters`;
    } else {
      userNameError.value = null;
    }
    if (!validateAlphaNumericAddress(newUserAddress.value)) {
      userAddressError.value = `Address length should be between 3 and 100 and should not contain special characters`;
    } else {
      userAddressError.value = null;
    }

    if (userNameError.value || userAddressError.value) return;

    userStore.addUser({
      name: newUserName.value,
      address: newUserAddress.value,
    });

    handelCencel();
  } else {
    if (userToDelete.value) userStore.deleteUser(userToDelete.value.id);
    handelCencel();
  }
}

async function updateSearchTerm($event: any) {
  searchTerm.value = $event?.target?.value;
  if (searchTerm.value.length > 0) userStore.searchTerm(searchTerm.value);
}

function handelShowModal(
  header: string,
  bodyData: any | { rowData: User } | string
) {
  const body = bodyData?.rowData
    ? 'Are you sure you want to delete the user?'
    : bodyData?.rowData;

  userToDelete.value = bodyData?.rowData;

  uiStore.setModal({ isShowModal: true, header, body });
}

onMounted(async () => {
  await userStore.fetchUsers();
});
</script>

<style lang="less">
:root {
  --secondary-bg-color: #ededed;
  --error-color: #e3342f;
  --primary-color: #007bff;
  --primary-color-hover: #0056b3;
  --overlay-color: rgba(0, 0, 0, 0.5);
  --gray-hover: #e1e1e1;
}

/* Reset */
* {
  box-sizing: border-box;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* app.vue style */
.add-user-inputs {
  display: flex;
  flex-direction: column;

  input {
    margin: 8px 0;
  }
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
</style>
