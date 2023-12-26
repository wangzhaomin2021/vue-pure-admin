import { computed, type Ref } from "vue";
interface UseArrayDifferenceOption<T> {
  list: Ref<T[]>;
  value: Ref<T[]>;
  compareFn?: (a: T, b: T) => boolean;
}

export function useArrayDifference<T>(opt: UseArrayDifferenceOption<T>) {
  return computed(() => {
    const { list, value, compareFn } = opt;
    let cursor = 0; // 记录缓存时缓存到的位置
    let cache: Map<T, boolean> | null = null;

    if (value.value.length === 0) return list.value;

    // compareFn 比较时不缓存
    if (compareFn)
      return list.value.filter(
        item => !value.value.some(v => compareFn(item, v))
      );

    if (!compareFn) {
      cache = new Map();
      cache.set(value.value[0], true);
      const length = value.value.length;
      return list.value.filter(item => {
        if (cursor === length - 1) return !cache.has(item); // value 已经全部缓存了

        if (cache.has(item)) {
          // 已经被缓存了 直接返回
          return false;
        }

        // 未缓存 [继续往下缓存]
        for (let j = cursor + 1; j < length; j++) {
          const v = value.value[j];
          cache.set(v, true);
          if (item === v) {
            cursor = j; // 更新 cursor
            return false;
          }
        }

        // 全部缓存了都没有重复的
        return true;
      });
    }
  });
}
