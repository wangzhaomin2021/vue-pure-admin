export default function useArrayJoin(array, separator) {
  return {
    // 参数都使用引用
    get value() {
      return array.value.join(separator?.value ?? ',');
    }
  }
}


// function toValue(value) {
//   return value?.value ?? value;
// }

// function join(array, separator) {
//   return toValue(array).join(toValue(separator) ?? ',');
// }
