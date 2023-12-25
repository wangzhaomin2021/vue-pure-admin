// 下载的一个例子demo

import mime from "mime";

export async function writeFile(fileHandle, contents) {
  // 创建一个 FileSystemWritableFileStream 用来写入。
  const writable = await fileHandle.createWritable();

  // 将文件内容写入到流中。
  await writable.write(contents);

  // 关闭文件并将内容写入磁盘。
  await writable.close();
}

export async function saveFile(defaultType = ".png", types) {
  const opts = {
    types: [
      {
        description: "image file",
        // 保存时文件没有写后缀，会使用第一个提供的接受类型 这里可以使用求出拓展名 传入作为第一个可接受参数
        accept: { "image/*": [defaultType, ...types] }
      }
    ]
  };
  return await window.showSaveFilePicker(opts).catch(() => {});
}

// url 可以是在线资源 后台api资源请求 base64 ...等
export function downloadByOnlineUrlOrApi(url: string) {
  // request data 1.此处需要的是二进制的数据  2.后台接口请求下载图片也是类似的
  fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }).then(async res => {
    const data = await res.blob();
    console.log(data, mime.getExtension(data.type));
    // 保存文件
    const fileHandle = await saveFile("." + mime.getExtension(data.type), [
      ".webp",
      ".jpeg",
      ".png"
    ]);
    writeFile(fileHandle, data)
      .then(() => {
        Notification.requestPermission().then(permission => {
          // 如果用户接受，我们就创建一个通知
          if (permission === "granted") {
            new Notification("下载成功");
          }
        });
      })
      .catch(() => {});
  });
}
