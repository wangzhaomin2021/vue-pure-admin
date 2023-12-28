<template>
  <el-form-item v-show="itemShow">
    <template #label>
      <span class="label">{{ item.label }}</span>
      <el-tooltip v-if="item.tip" effect="light">
        <template #content>
          <div>{{ item.tip }}</div>
        </template>
        <i class="iconfont icon-help" />
      </el-tooltip>
    </template>
    <div v-if="item.type === 'input'" class="input-box">
      <zm-input
        v-model="value"
        :placeholder="item.placeholder ?? ''"
        @blur="setValue"
      />
    </div>
    <!-- <div v-if="item.type === 'hot_key'" class="input-box">
            <ConfigHotkey v-model="value" />
        </div> -->
    <zm-radio
      v-else-if="item.type === 'radio'"
      v-model="value"
      :options="item.options ?? []"
    />
    <zm-slider
      v-else-if="item.type === 'slider'"
      v-model="value"
      :min="item.min ?? 0"
      :max="item.max ?? 100"
      :step="item.step ?? 1"
    />
    <zm-gift-select v-else-if="item.type === 'gift-select'" v-model="value" />
    <zm-video
      v-else-if="item.type === 'video'"
      v-model="value"
      :cb="item.cb ?? emptyFn"
    />
    <zm-audio
      v-else-if="item.type === 'audio'"
      v-model="value"
      :cb="item.cb ?? emptyFn"
    />
    <zm-image
      v-else-if="item.type === 'image'"
      v-model="value"
      :cb="item.cb ?? emptyFn"
    />

    <template v-else-if="item.type === 'slot'">
      <slot :name="item.slotName" />
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import ZmRadio from "./items/zm-radio.vue";
import ZmInput from "./items/zm-input.vue";
import ZmSlider from "./items/zm-slider.vue";
import ZmGiftSelect from "./items/zm-gift-select.vue";
import ZmVideo from "./items/zm-video.vue";
import ZmAudio from "./items/zm-audio.vue";
import ZmImage from "./items/zm-image.vue";
// import ConfigHotkey from "@/renderer/dashboard/components/config/ConfigHotkey.vue";
import { ref, watch, computed } from "vue";
import type { IFormItem } from "./type";

interface FormItemProps {
  form: any;
  item: IFormItem;
}

const emits = defineEmits(["update:prop"]);
const emptyFn = () => {};

const props = defineProps<FormItemProps>();
const itemShow = computed(() =>
  props.item.show ? props.item.show(props.form) : true
);

console.log("===> from", props.form, props.item);

const value = ref(props.form[props.item.prop]);
watch(
  () => props.form[props.item.prop],
  val => {
    value.value = val;
  }
);
const setValue = () => {
  if (props.item.blurUpdate) emits("update:prop", props.item.prop, value.value);
};
watch(value, val => {
  if (!props.item.blurUpdate) emits("update:prop", props.item.prop, val);
});
</script>

<style lang="scss" scoped>
.input-box {
  width: 182px;
}
</style>
