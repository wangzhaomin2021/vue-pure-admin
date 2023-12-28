<template>
  <el-select v-bind="$attrs" filterable placeholder="请选择视频">
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
import { mUpload, loadVideos, videoList } from "../help";

interface MboVideoProps {
  cb?: (
    options: typeof videoList,
    extraOptions: typeof videoList | undefined
  ) => void;
  extraOptions?: typeof videoList;
}

const props = withDefaults(defineProps<MboVideoProps>(), {
  cb: () => {},
  extraOptions: undefined
});

const opList = computed(() =>
  props.extraOptions ? [...props.extraOptions, ...videoList] : videoList
);

loadVideos();

const upload = () =>
  mUpload("video")
    .then(loadVideos)
    .then(options => {
      props.cb(options as typeof videoList, props.extraOptions);
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
