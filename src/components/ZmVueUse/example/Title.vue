<template>
  <div class="example use-title">
    <h2>use title</h2>
    <el-input v-model="title" />
    <!-- <br />
    result: {{ result }}
    <br />
    my result: {{ myResult }} -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTitle } from "@vueuse/core";
// import myuseArrayEvery from "../array/useArrayEvery";

const title = useTitle();
</script>
