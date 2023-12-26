export function arrayDifference<T>(
  list: T[],
  value: T[],
  compareFn?: (a: T, b: T) => boolean
) {
  let cursor = 0; // 记录缓存时缓存到的位置
  let cache: Map<T, boolean> | null = null;

  if (value.length === 0) return list.slice();

  // compareFn 比较时不缓存[暂无约定的缓存依据]
  if (compareFn)
    return list.filter(item => !value.some(v => compareFn(item, v)));

  if (!compareFn) {
    cache = new Map();
    cache.set(value[0], true);
    const length = value.length;
    return list.filter(item => {
      if (cursor === length - 1) return !cache.has(item); // value 已经全部缓存了

      if (cache.has(item)) {
        // 已经被缓存了 直接返回
        return false;
      }

      // 未缓存 [继续往下缓存]
      for (let j = cursor + 1; j < length; j++) {
        const v = value[j];
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
}
