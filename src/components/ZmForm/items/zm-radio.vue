<template>
  <el-radio-group>
    <el-radio
      v-for="option in options"
      :key="option.value"
      :label="option.value"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
interface MboRadioProps {
  options: { label: string; value: any; [prop: string]: any }[];
}
defineProps<MboRadioProps>();
</script>

<style lang="scss" scoped>
// .el-radio {
//     --el-radio-input-bg-color: transparent;
//     --el-radio-text-color: var(--user-text);

//     :deep(.el-radio__input.is-checked .el-radio__inner) {
//         border-color: var(--radio-border);
//         background: var(--radio-border);
//     }
// }
</style>
