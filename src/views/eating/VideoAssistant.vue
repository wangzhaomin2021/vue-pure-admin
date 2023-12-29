<template>
  <div>
    <div class="page-container">
      <ZmVideoAssistant />
      <ZmForm
        :style="{ marginTop: '100px' }"
        :config="config"
        :form="videoInfo[0]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ZmVideoAssistant from "@/components/ZmVideoAssistant/index.vue";
import ZmForm from "@/components/ZmForm/index.vue";
import type { IFormItem } from "@/components/ZmForm/type";
import { videoInfo } from "@/components/ZmVideoAssistant/useVideoAssistant";
import { ref } from "vue";

const config = ref<{ items: IFormItem[] }>({
  items: [
    {
      prop: "video",
      type: "input",
      label: "视频地址",
      placeholder: "请输入视频地址",
      blurUpdate: true
    },
    { prop: "volumn", type: "slider", label: "音量" }
  ]
});
</script>

<style lang="scss" scoped>
.page-container {
  box-sizing: border-box;
  width: 600px;
  height: 337.5px;
  margin: 100px auto;
  border: 2px solid green;
}
</style>
