<template>
  <div>
    <header class="zm-header">draggable</header>

    <main>
      <div class="wrapper">
        <div ref="reciver" class="draggable reciver" :class="{ dragover }" />
        <div ref="container" class="container" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const reciver = ref<HTMLElement>();
const container = ref<HTMLElement>();
const dragover = ref(false);

onMounted(() => {
  reciver.value.addEventListener("dragover", e => {
    // console.log("===> drag over", e);
    e.preventDefault();
    dragover.value = true;
  });

  reciver.value.addEventListener("dragleave", e => {
    dragover.value = false;
  });

  reciver.value.addEventListener("drop", e => {
    console.log("===> drop", e);
    console.log("===> drop text", e.dataTransfer.getData("text/plain"));
    if (e.dataTransfer.files.length) {
      console.log("===> drop file", e.dataTransfer.files);
      for (const file of e.dataTransfer.files) {
        if (file.type.startsWith("image/")) {
          const img = new Image();
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            img.src = fileReader.result as string;
            container.value.appendChild(img);
          };
        }
      }
    }
    dragover.value = false;
  });
});
</script>

<style lang="scss" scoped>
.wrapper {
  .reciver {
    width: 100px;
    height: 100px;
    margin: 100px auto;
    background: #666;

    &.dragover {
      background-color: yellow;
    }
  }
}
</style>
