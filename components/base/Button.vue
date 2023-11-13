<template>
  <button v-bind="$attrs" class="button"><slot /></button>
</template>

<style lang="less" scoped>
.button {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

[primary] {
  background-color: var(--primary-color);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
  }
}
</style>
