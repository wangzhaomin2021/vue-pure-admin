<template>
  <div class="example array-difference">
    <h2>Array Difference</h2>
    <el-select
      v-model="list"
      multiple
      filterable
      allow-create
      default-first-option
      :reserve-keyword="false"
      placeholder="Choose tags for your article"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="value"
      multiple
      filterable
      allow-create
      default-first-option
      :reserve-keyword="false"
      placeholder="Choose tags for your article"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <br />
    diff result: {{ result }}
    <br />
    my diff result: {{ myResult }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useArrayDifference } from "@vueuse/core";
import { useArrayDifference as myUseArrayDifference } from "../array/useArrayDifference";

const list = ref<string[]>([]);
const value = ref<string[]>([]);

const options = [
  {
    value: "HTML",
    label: "HTML"
  },
  {
    value: "CSS",
    label: "CSS"
  },
  {
    value: "JavaScript",
    label: "JavaScript"
  }
];

const result = useArrayDifference(list, value);
const myResult = myUseArrayDifference({ value, list });
</script>
