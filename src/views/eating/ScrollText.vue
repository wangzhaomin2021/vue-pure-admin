<template>
  <div class="page-box">
    <div class="resizeable" resizable>
      <ZmScrollText :text="text" :direction="direction">
        <div class="ctx">{{ text }}</div>
      </ZmScrollText>
    </div>
    <el-input
      :style="{ marginTop: '100px' }"
      type="textarea"
      v-model="text"
      :rows="5"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ZmScrollText from "@/components/ZmScrollText/index.vue";

const text = ref("锄禾日当午\n汗滴禾下土\n谁知盘中餐\n粒粒皆辛苦");
const direction = ref<"x" | "y">("y");
</script>

<style lang="scss" scoped>
.resizeable {
  width: 300px;
  height: 100px;
  background-color: yellow;

  .ctx {
    white-space: pre-line;
  }
}
</style>
