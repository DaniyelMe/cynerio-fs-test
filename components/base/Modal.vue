<template>
  <div :class="{ 'modal-overlay': isShowModal }">
    <dialog class="dialog" :open="isShowModal">
      <header>
        <div>{{ header }}</div>

        <button @click="$emit('cancel')">X</button>
      </header>

      <div class="modal-body">
        <slot>{{ body }}</slot>
      </div>

      <footer>
        <button @click="$emit('cancel')">Cancel</button>
        <button @click="$emit('confirm')">Confirm</button>
      </footer>
    </dialog>
  </div>
</template>

<script setup lang="ts">
type Modal = {
  isShowModal: boolean;
  header: string;
  body?: string;
};

defineProps<Modal>();
</script>

<style lang="less" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--overlay-color);
}

.dialog {
  width: 450px;

  header {
    display: flex;
    justify-content: space-between;
    padding: 8px 8px;
    border-bottom: 1px solid var(--secondary-bg-color);
  }

  .modal-body {
    padding: 16px;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    button {
      margin: 4px;
    }
  }
}
</style>
