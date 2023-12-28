<template>
  <el-select v-bind="$attrs" filterable placeholder="请选择音频">
    <el-option
      v-for="option in opList"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    >
      <span>{{ option.label }}</span>
    </el-option>
  </el-select>

  <el-button class="upload" @click="upload"
    ><i class="iconfont icon-upload" />本地文件</el-button
  >
</template>

<script setup lang="ts">
import { computed } from "vue";
import { mUpload, loadAudios, audioList } from "../help";

interface MboAudioProps {
  cb?: (
    options: typeof audioList,
    extraOptions: typeof audioList | undefined
  ) => void;
  extraOptions?: typeof audioList;
}

const props = withDefaults(defineProps<MboAudioProps>(), {
  extraOptions: undefined,
  cb: () => {}
});

const opList = computed(() =>
  props.extraOptions ? [...props.extraOptions, ...audioList] : audioList
);

loadAudios();

const upload = () =>
  mUpload("audio")
    .then(loadAudios)
    .then(options => {
      props.cb(options as typeof audioList, props.extraOptions);
    });
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

// .upload {
//     margin-left: 10px;
// }
</style>
