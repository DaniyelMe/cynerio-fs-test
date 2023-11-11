<template>
  <div>
    <UserTable
      :rowsData="rowsData"
      :isActionable="true"
      :isSearch="true"
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
        <BaseInput v-model="newUserName" label="Name" :error="userNameError" />
        <BaseInput
          v-model="newUserAddress"
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
import BaseInput from '~/components/base/Input.vue';
import Modal from '~/components/base/Modal.vue';

const userStore = useUserStore();
const uiStore = useUIStore();

const rowsData = computed(() => userStore.getUsers);
const modalConfig = computed(() => uiStore.modal);
const isAddUser = computed(() =>
  modalConfig.value.header === 'Add User' ? true : false
);

const userToDelete = ref();
const newUserName = ref();
const userNameError = computed(() => {
  if (!validateAlphaLengthName(newUserName.value))
    return `Name length should be between 3 and 32 and should not contain numbers or special characters`;

  return '';
});
const newUserAddress = ref();
const userAddressError = computed(() => {
  if (!validateAlphaNumericAddress(newUserAddress.value))
    return `Address length should be between 3 and 100 and should not contain special characters`;

  return '';
});

function handelCencel() {
  userToDelete.value = null;
  newUserName.value = null;
  newUserAddress.value = null;
  uiStore.resetModal();
}

function handelConfirm() {
  if (isAddUser) {
    // action to add user
    userStore.addUser({
      name: newUserName.value,
      address: newUserAddress.value,
    });
  } else {
    // action to delete user
    console.log('action to delete user');
  }

  handelCencel();
}

function handelShowModal(
  header: string,
  bodyData: any | { rowData: User } | string
) {
  const body = bodyData?.rowData
    ? 'Are you sure you want to delete the user?'
    : bodyData?.rowData;

  userToDelete.value = bodyData?.rowData;
  console.log('body:', body);

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
  --overlay-color: rgba(0, 0, 0, 0.5);
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
  input {
    margin: 8px 0;
  }
}
</style>
