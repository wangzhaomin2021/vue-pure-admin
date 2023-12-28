<template>
  <el-select v-bind="$attrs" filterable placeholder="请选择图片">
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
import { mUpload, loadImages, imageList } from "../help";

interface MboImageProps {
  cb?: (
    options: typeof imageList,
    extraOptions: typeof imageList | undefined
  ) => void;
  extraOptions?: typeof imageList;
}

const props = withDefaults(defineProps<MboImageProps>(), {
  extraOptions: undefined,
  cb: () => {}
});

const opList = computed(() =>
  props.extraOptions ? [...props.extraOptions, ...imageList] : imageList
);

loadImages();

const upload = () =>
  mUpload("image")
    .then(loadImages)
    .then(options => {
      props.cb(options as typeof imageList, props.extraOptions);
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
