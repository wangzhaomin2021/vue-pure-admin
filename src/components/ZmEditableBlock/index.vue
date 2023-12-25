<template>
  <div
    ref="titleText"
    class="editable-title"
    :class="{ editable: editable }"
    tabindex="-1"
    :contentEditable="editable"
    @keydown.enter="saveText($event)"
  >
    {{ modelValue }}
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, onMounted, computed, watch } from "vue";

interface EditableBlockProps {
  editable: boolean;
  autoFocus?: boolean;
  placeholder: string;
  modelValue: string;
}

const props = withDefaults(defineProps<EditableBlockProps>(), {
  editable: false,
  autoFocus: false,
  placeholder: "请输入..."
});

const editable = computed(() => props.editable);

const titleText = ref<HTMLDivElement | null>(null);

const emits = defineEmits(["update:modelValue"]);

onMounted(() => {
  nextTick(() => {
    if (props.autoFocus && props.editable) {
      titleText.value?.focus();
    }

    show();
  });
});

// 注意这里得加引号 该css格式要求
const placehoderText = computed(() => `"${props.placeholder}"`);

watch(
  () => props.editable,
  () => {
    if (!props.editable) {
      titleText.value?.blur();
    }
  }
);

function show() {
  if (!titleText.value) return;

  // 获取焦点，全选文字
  titleText.value.onfocus = () => {
    if (!titleText.value || !props.editable) return;
    if (titleText.value.innerHTML.length > 0) {
      const selection = window.getSelection();
      const range = document.createRange();
      titleText.value.firstChild &&
        range.selectNodeContents(titleText.value.firstChild);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  // 失去焦点，关闭编辑
  titleText.value.onblur = () => {
    if (!titleText.value) return;
    if (titleText.value.innerHTML.length > 0) {
      let selection = window.getSelection();
      selection?.removeAllRanges();
    }
    emits("update:modelValue", titleText.value.innerText);
  };
}

function saveText(event: KeyboardEvent) {
  event.preventDefault();
  titleText.value?.blur();
}
</script>

<style lang="scss" scoped>
.editable-title {
  --placeholder: v-bind(placehodertext);
  --accent-text: skyblue;
  --time-text: #666;

  padding: 0 8px;
  overflow: hidden;
  color: var(--user-text);
  text-overflow: ellipsis;
  white-space: nowrap;

  //获取焦点后文本框
  &:focus-visible {
    outline: 1px solid var(--accent-text);
  }

  // 默认提示文字
  &:empty::before {
    color: var(--time-text);
    content: var(--placeholder);
  }
}

.editable {
  &:hover {
    outline: 1px solid var(--accent-text);
  }
}
</style>
