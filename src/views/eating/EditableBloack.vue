<template>
  <div class="box">
    <EditableBlock
      v-model="value"
      :editable="editable"
      :auto-focus="autoFocus"
      :placeholder="placeholder"
    />
  </div>
  <div class="opt">
    <el-radio-group v-model="editable">
      <el-radio :label="true">可编辑</el-radio>
      <el-radio :label="false">不可编辑</el-radio>
    </el-radio-group>
    <el-radio-group v-model="autoFocus">
      <el-radio :label="true">页面加载后自动获取焦点</el-radio>
      <el-radio :label="false">不自动获取焦点</el-radio>
    </el-radio-group>
    <div class="message">{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import EditableBlock from "@/components/ZmEditableBlock/index.vue";
import { ref } from "vue";

const editable = ref(true);
const autoFocus = ref(true);
const placeholder = ref("我是一个holder呀");
const value = ref("");
</script>

<style lang="scss" scoped>
.box {
  margin-top: 100px;
}
</style>
