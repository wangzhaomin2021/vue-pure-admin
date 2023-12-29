<template>
  <div>
    <ArrayDifference class="vue-use-example" />
    <ArrayEvery class="vue-use-example" />
    <ArrayJoin class="vue-use-example" />
    <Title class="vue-use-example" />
  </div>
</template>

<script setup lang="ts">
import ArrayDifference from "@/components/ZmVueUse/example/ArrayDifference.vue";
import ArrayEvery from "@/components/ZmVueUse/example/ArrayEvery.vue";
import ArrayJoin from "@/components/ZmVueUse/example/ArrayJoin.vue";
import Title from "@/components/ZmVueUse/example/Title.vue";
</script>

<style scoped lang="scss">
.vue-use-example {
  margin: 10px;
  border: 2px solid #333;
  padding: 6px 10px;
}
</style>
