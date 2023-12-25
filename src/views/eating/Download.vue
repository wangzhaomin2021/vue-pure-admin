<template>
  <div class="item">
    <el-button @click="downloadByOnlineUrlOrApi"
      >下载在线或后台接口图片(base64也可以下载)</el-button
    >
    <el-input v-model="onlineUrl" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import mime from "mime";

async function writeFile(fileHandle, contents) {
  // 创建一个 FileSystemWritableFileStream 用来写入。
  const writable = await fileHandle.createWritable();

  // 将文件内容写入到流中。
  await writable.write(contents);

  // 关闭文件并将内容写入磁盘。
  await writable.close();
}

async function saveFile(defaultType = ".png") {
  const opts = {
    types: [
      {
        description: "image file",
        // 保存时文件没有写后缀，会使用第一个提供的接受类型 这里可以使用求出拓展名 传入作为第一个可接受参数
        accept: { "image/*": [defaultType, ".webp", ".png", ".jpeg"] }
      }
    ]
  };
  return await window.showSaveFilePicker(opts).catch(() => {});
}

const onlineUrl = ref(
  "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=263&h=180&c=7&r=0&o=5&pid=1.7"
);
const downloadByOnlineUrlOrApi = () => {
  // request data 1.此处需要的是二进制的数据  2.后台接口请求下载图片也是类似的
  fetch(onlineUrl.value, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }).then(async res => {
    const data = await res.blob();
    console.log(data, mime.getExtension(data.type));
    // 保存文件
    const fileHandle = await saveFile("." + mime.getExtension(data.type));
    writeFile(fileHandle, data)
      .then(() => {
        Notification.requestPermission().then(permission => {
          // 如果用户接受，我们就创建一个通知
          if (permission === "granted") {
            const notification = new Notification("下载成功");
          }
        });
      })
      .catch(() => {});
  });
};
</script>
