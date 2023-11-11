<template>
  <div class="base-checkbox-input">
    <input type="checkbox" :id="label" :value="label" v-model="isChecked" />
    <label :for="label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ label: string; modelValue: string | string[] }>()
const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<style lang="less" scoped>
.base-checkbox-input {
  display: flex;
}
</style>
