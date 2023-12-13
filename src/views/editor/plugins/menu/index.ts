import MarkdownImportPluginMenu from "./markdownImportPlugin";
import "../local"; // 多语言

// 导入markdown 插件
export const MarkdownImportPluginMenuConf = {
  key: "mdFileImport",
  factory() {
    return new MarkdownImportPluginMenu();
  }
};
