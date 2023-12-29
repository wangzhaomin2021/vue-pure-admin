<template>
  <div class="container" ref="boxRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

interface ScrollTextProps {
  text: string;
  direction?: "x" | "y";
  speedY?: number;
  speedX?: number;
  runThrough?: boolean;
  mode?: "reverse" | "normal" | "alternate" | "reverse-alternate";
  animationTimingFunction?: string;
}

const props = withDefaults(defineProps<ScrollTextProps>(), {
  direction: "x",
  speedX: 24,
  speedY: 12,
  mode: "alternate",
  runThrough: false,
  animationTimingFunction: "linear"
});

const timeX = ref("0s");
const timeY = ref("0s");
const boxRef = ref<HTMLElement | null>(null);
let ob: ResizeObserver | null = null;
const sy = ref("0px");
const sx = ref("0px");
const sy0 = ref("0px");
const sx0 = ref("0px");

onMounted(() => {
  const contentDom = boxRef.value?.children[0] as HTMLElement;
  if (contentDom) {
    watch(
      () => props.text,
      () => {
        contentDom.classList.remove("fill");
        if (props.direction === "x") {
          contentDom.style.width = "fit-content";
        }
      }
    );
    const containerDom = contentDom.parentElement!;
    contentDom.classList.add("content");
    ob = new ResizeObserver(entries => {
      for (const entry of entries) {
        switch (props.direction) {
          case "x":
            // const width = entry.contentRect.width;
            const width = entry.borderBoxSize[0].inlineSize;
            if (width > containerDom.offsetWidth) {
              // 动画
              const dx = width - containerDom.offsetWidth;
              sx.value = !props.mode.includes("alternate")
                ? `-${width}px`
                : `-${dx}px`;
              sx0.value = !props.mode.includes("alternate")
                ? `${containerDom.offsetWidth}px`
                : `0px`;
              timeX.value = `${dx / props.speedX}s`;
              contentDom.classList.add("animate-x");
            } else {
              contentDom.classList.add("fill");
              contentDom.classList.remove("animate-x");
              contentDom.style.width = "";
              sx.value = "0px";
              timeX.value = "0s";
            }
            break;
          case "y":
            // const height = entry.contentRect.height;
            const height = entry.borderBoxSize[0].blockSize;
            if (height > containerDom.offsetHeight) {
              // 动画
              const dy = height - containerDom.offsetHeight;
              sy.value = !props.mode.includes("alternate")
                ? -height + "px"
                : -dy + "px";
              sy0.value = !props.mode.includes("alternate")
                ? containerDom.offsetHeight + "px"
                : "0px";
              timeY.value = `${dy / props.speedY}s`;
              console.log(
                "gggg",
                sy.value,
                sy0.value,
                timeY.value,
                height,
                containerDom.offsetHeight
              );

              contentDom.classList.add("animate-y");
            } else {
              // 无动画
              contentDom.classList.remove("animate-y");
              contentDom.classList.add("fill");
              sy.value = "0px";
              timeY.value = "0s";
            }
        }
      }
    });
    ob.observe(contentDom);
  }
});

onUnmounted(() => ob && ob.disconnect());
</script>

<style lang="scss" scoped>
@keyframes scrollY {
  from {
    transform: translateY(var(--sy0));
  }

  to {
    transform: translateY(var(--sy));
  }
}

@keyframes scrollX {
  from {
    transform: translateX(var(--sx0));
  }

  to {
    transform: translateX(var(--sx));
  }
}

.container {
  // 需要指定 width height
  // width: 12em;
  // height: 4em;
  overflow: hidden;
  letter-spacing: 0;

  :deep(.animate-y) {
    --sy: v-bind(sy);
    --sy0: v-bind(sy0);
    animation: scrollY v-bind(timeY) v-bind(animationTimingFunction) infinite
      v-bind(mode);
  }

  :deep(.animate-x) {
    --sx: v-bind(sx);
    --sx0: v-bind(sx0);
    animation: scrollX v-bind(timeX) v-bind(animationTimingFunction) infinite
      v-bind(mode);
  }

  :deep(.fill) {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
