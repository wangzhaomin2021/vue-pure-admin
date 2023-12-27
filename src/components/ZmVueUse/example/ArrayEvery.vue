<template>
  <div class="example array-every">
    <h2>Array Every</h2>
    <el-select
      v-model="list"
      multiple
      filterable
      allow-create
      default-first-option
      :reserve-keyword="false"
      placeholder="Choose tags"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <br />
    every item startsWith hello ?
    <br />
    result: {{ result }}
    <br />
    my result: {{ myResult }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useArrayEvery } from "@vueuse/core";
import myuseArrayEvery from "../array/useArrayEvery";

const list = ref<string[]>([]);

const options = [
  {
    value: "hello HTML",
    label: "hello HTML"
  },
  {
    value: "hello CSS",
    label: "hello CSS"
  },
  {
    value: "JavaScript",
    label: "JavaScript"
  }
];

const result = useArrayEvery(list, item => item.startsWith("hello"));
const myResult = myuseArrayEvery(list, item => item.startsWith("hello"));

const result2 = useArrayEvery([ref(1), ref(2), ref(3)], item => item > 0);
const myResult2 = myuseArrayEvery([ref(1), ref(2), ref(3)], item => item > 0);
console.log("===> result2", result2.value, myResult2.value);
</script>
