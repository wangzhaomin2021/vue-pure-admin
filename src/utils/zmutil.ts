// 判断是否为base64格式字符串
export function isBase64(str) {
  //正则表达式判断
  var reg =
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
  return reg.test(str); //返回 true or false
}

export function isFile(data) {
  return data instanceof File;
}

export function isBlob(data) {
  return data instanceof Blob;
}

export function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);

  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}

export function dataURItoFile(dataURI, filename) {
  const arr = dataURI.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]);

  let n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function blobToFile(blob, filename) {
  return new File([blob], filename, { type: "image/jpeg" });
}
