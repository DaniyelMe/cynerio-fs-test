<template>
  <div :class="{ 'dialog-overlay': isShowModal }">
    <dialog class="dialog" :open="isShowModal">
      <header>
        <div>{{ header }}</div>

        <button @click="$emit('cancel')" class="icon-button">X</button>
      </header>

      <div class="dialog-body">
        <slot>{{ body }}</slot>
      </div>

      <footer>
        <Button @click="$emit('cancel')" primary>Cancel</Button>
        <Button @click="$emit('confirm')" primary>Confirm</Button>
      </footer>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

type Modal = {
  isShowModal: boolean;
  header: string;
  body?: string;
};

defineProps<Modal>();
</script>

<style lang="less" scoped>
.dialog-overlay {
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

    .icon-button {
      padding: 4px 8px;
    }
  }

  .dialog-body {
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
