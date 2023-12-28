import type { LocalResources } from "./help";

export interface IFormItem {
  prop: string;
  show?: (form: any) => boolean;
  tip?: string;
  type:
    | "input"
    | "gift-select"
    | "radio"
    | "checkbox"
    | "slider"
    | "video"
    | "audio"
    | "image"
    | "slot"
    | "hot_key";
  label: string;
  placeholder?: string;
  blurUpdate?: boolean; // input输入框 失去焦点才更新
  options?: { label: string; value: any; [prop: string]: any }[]; // 单选 复选 等
  min?: number;
  max?: number;
  step?: number;
  slotName?: string;
  cb?: (
    options: LocalResources[],
    extraOptions: LocalResources[] | undefined
  ) => void;
}
