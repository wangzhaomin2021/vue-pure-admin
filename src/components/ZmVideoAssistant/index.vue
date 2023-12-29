<template>
  <div class="root-container">
    <div class="container">
      <video
        v-show="!hide"
        ref="videoRef"
        :controls="false"
        crossorigin="anonymous"
        class="video-assistant"
        :style="originalStyle"
      ></video>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVideoAssistant } from "./useVideoAssistant";

interface VideoAssistantProps {
  scaleSize?: number;
}

const props = withDefaults(defineProps<VideoAssistantProps>(), {
  scaleSize: 1
});

const { originalStyle, hide, cxStyle, cyStyle } = useVideoAssistant(props);
</script>

<style lang="scss" scoped>
.root-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    transform: v-bind(cxStyle) v-bind(cyStyle);
    display: flex;
    justify-content: center;
    align-items: center;

    .video-assistant {
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      background-color: transparent; // 视频背景色
    }
  }
}
</style>
