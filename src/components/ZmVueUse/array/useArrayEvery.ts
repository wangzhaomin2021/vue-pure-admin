import { computed, unref } from "vue";
import type { Ref } from "vue";

type MayBeRef<T> = T | Ref<T>;

export default function useArrayEvery<T>(
  list: MayBeRef<MayBeRef<T>[]>,
  fn: (item: T, index: number, arr: MayBeRef<MayBeRef<T>[]>) => unknown
) {
  return computed(() => {
    const list2 = unref(list);
    return list2.every((item, index) => {
      const item2 = unref(item);
      return fn(item2, index, list2);
    });
  });
}
