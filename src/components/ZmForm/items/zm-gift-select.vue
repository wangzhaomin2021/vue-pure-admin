<template>
  <el-select filterable placeholder="请选择礼物">
    <el-option label="未选中" value="none" />
    <el-option
      v-for="option in giftList"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    >
      <div
        class="option-item"
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <span>{{ option.label }}</span>
        <span v-if="option.icon">
          <img
            style="width: 24px; height: 24px; vertical-align: middle"
            :src="option.icon"
            fit="scale-down"
          />
        </span>
      </div>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { giftList, loadGifts } from "../help";
loadGifts();
</script>

<style lang="scss" scoped>
// .el-input {
//     --el-input-border-color: var(--input-border);
//     --el-input-placeholder-color: var(--time-text);
//     --el-input-text-color: var(--user-text);
// }

// :deep(.el-input__wrapper) {
//     --el-input-bg-color: transparent;
// }
</style>
