// 完整版菜单比较多，将 rank 抽离出来，在此方便维护

// const home = 0 // 平台规定只有 home 路由的 rank 才能为 0 ，所以后端在返回 rank 的时候需要从 1 开始哦
const [
  home,
  secondspring,
  eating,
  doc,
  utils,
  table,
  components,
  able,
  frame,
  nested,
  result,
  error,
  list,
  permission,
  system,
  tabs,
  formdesign,
  flowchart,
  ppt,
  editor,
  guide,
  menuoverflow,
  about
] = Array.from(new Array(100).keys());

export {
  home,
  secondspring,
  eating, // 蚕食
  doc,
  utils,
  table,
  components,
  able,
  frame,
  nested,
  result,
  error,
  list,
  permission,
  system,
  tabs,
  formdesign,
  flowchart,
  ppt,
  editor,
  guide,
  menuoverflow,
  about
};
