<template>
  <div class="example use-array-join">
    <h2>Array Join</h2>
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

    <el-input v-model="seperator" />
    <br />
    every item join ?
    <br />
    result: {{ result }}
    <br />
    my result: {{ myResult.value }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useArrayJoin } from "@vueuse/core";
import myuseArrayJoin from "../array/useArrayJoin";

const list = ref<string[]>([]);
const seperator = ref<string>(",");

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

const result = useArrayJoin(list, seperator);
const myResult = myuseArrayJoin(list, seperator);
</script>
