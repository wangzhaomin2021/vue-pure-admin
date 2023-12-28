import { reactive } from "vue";
// import { file, data } from "@/renderer/helper";
const file = {
  upload: async (type: string): Promise<any> => {
    console.log(type);
  } // 此处为文件上传本地功能实现
};

const data = {
  query: async (url: string, type: string): Promise<any> => {
    console.log(url, type);
  } // 此处为文件查询本地功能实现
};

export interface LocalResources {
  label: string;
  value: string;
  icon?: string;
}

const giftList = reactive<LocalResources[]>([]);
const videoList = reactive<LocalResources[]>([]);
const audioList = reactive<LocalResources[]>([]);
const imageList = reactive<LocalResources[]>([]);

function mUpload(type: string) {
  return file.upload(type);
}

function requestSources(request: string, type: any, list: LocalResources[]) {
  return new Promise((reslove, reject) => {
    data
      .query(request, type)
      .then(data => {
        const opts: any[] = [];
        const orlist = data.list || data;
        for (let key in orlist) {
          const label = orlist[key].name;
          const value = orlist[key].id;
          const row: LocalResources = { label, value };
          if (orlist[key].icon) {
            row.icon = orlist[key].icon;
          }
          opts.push(row);
        }
        list.splice(0, list.length);
        list.push(...opts);
        reslove(list);
      })
      .catch(err => {
        reject(err);
      });
  });
}

const loadGifts = () => {
  return requestSources("room-gift", {}, giftList);
};

const loadVideos = () => {
  return requestSources("local-files", { type: "video" }, videoList);
};

const loadAudios = () => {
  return requestSources("local-files", { type: "audio" }, audioList);
};

const loadImages = () => {
  return requestSources("local-files", { type: "image" }, imageList);
};

export {
  giftList,
  videoList,
  audioList,
  imageList,
  loadAudios,
  loadGifts,
  loadVideos,
  loadImages,
  mUpload
};
