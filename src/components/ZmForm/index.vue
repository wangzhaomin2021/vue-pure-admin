<template>
  <el-container class="container">
    <el-form size="small" class="form" :label-width="labelWidth + 'px'">
      <template v-for="item in config.items" :key="item.prop">
        <FormItem :form="form" :item="item" @update:prop="updateProp" />
      </template>
    </el-form>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FormItem from "./FormItem.vue";
import type { IFormItem } from "./type";
// import "@/renderer/toolkit/api/modules";
// import ApiUpdaterContainer from '@/utils/api';

interface FormConfigProps {
  autoUpdate?: boolean;
  updaterName?: string;
  labelWidth: number;
  form: any;
  config: {
    items: IFormItem[];
  };
}

const props = withDefaults(defineProps<FormConfigProps>(), {
  labelWidth: 80,
  autoUpdate: false,
  updaterName: ""
});

const emits = defineEmits(["updateForm"]);

const updateProp = (key: string, value: any) => {
  emits("updateForm", key, value);
  // if (props.autoUpdate) {
  //     ApiUpdaterContainer.get(props.updaterName)?.update();
  // }
};

interface LocalResources {
  label: string;
  value: string;
  icon?: string;
}

// const form = reactive<{ [key: string]: any }>({
//     id: "",
//     title: "",
//     condition: "gift",
//     chat: "",
//     welcome: '',
//     gift_id: "none",
//     gift_name: "none",
// });

const mark = ref(0);

// watch(() => props.formData, (fd) => {
//     mark.value++;
//     fd && Object.keys(fd).forEach(key => {
//         form[key] = fd[key];
//     })
// }, { immediate: true });

// watch([form, mark], ([fm, mk], [ofm, omk]) => {
//     if (mk === omk) {
//         // console.log('name', gifts.value[fm.gift_id]?.name);
//         emit('edit', Object.assign({}, toRaw(fm), { 'gift_name': gifts.value[fm.gift_id]?.name || 'none' }));
//     } else {
//         chat.value = fm.chat;
//     }
// }, { deep: true })
</script>

<style lang="scss" scoped>
.container {
  .form {
    .input-box {
      width: 180px;
    }

    .label {
      font-size: 14px;
      color: var(--user-text);
    }

    .option-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
