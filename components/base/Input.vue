<template>
  <label :for="label">{{ label }}</label>
  <input v-model="value" :id="label" :class="{ 'is-error': error }" />

  <span v-if="error" class="error-message">{{ error }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label: string;
  error?: string;
}>();
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<style lang="less" scoped>
input {
  width: 100%;
  padding: 8px;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;

  .is-error {
    border-color: var(--error-color);
  }
}

.error-message {
  color: var(--error-color);
  font-size: 14px;
  margin: 4px 0;
  display: block;
}
</style>
