import { type IButtonMenu, t, type IDomEditor } from "@wangeditor/editor";
import markdownit from "markdown-it";
import { MdFileImport_SVG } from "../constants/icon-svg";

export default class MarkdownImportPluginMenu implements IButtonMenu {
  readonly title = t("markdownfile.import");
  readonly tag = "button";
  readonly iconSvg = MdFileImport_SVG;

  getValue(editor: IDomEditor) {
    // 选择文件
    const pickerOpts = {
      types: [
        {
          description: "md文件",
          accept: {
            "text/markdown": [".md"]
          }
        }
      ],
      excludeAcceptAllOption: true,
      multiple: false
    };

    async function getMdFile(pickerOpts) {
      const files = await window.showOpenFilePicker(pickerOpts);
      return files[0].getFile();
    }

    getMdFile(pickerOpts)
      .then(async file => {
        // 添加加载态
        editor.disable(); // 禁用编辑器
        console.log("file", file);
        const mdText = await file.text();
        // 解析md内容
        const md = markdownit();
        const html = md.render(mdText);
        console.log("===> parsed html", html);
        editor.dangerouslyInsertHtml(html); // 插入解析后的md内容
      })
      .catch(err => {
        console.log("err", err);
      })
      .finally(() => {
        editor.enable(); // 取消禁用编辑器
      });

    return "";
  }

  isActive() {
    return false; // or true
  }

  isDisabled() {
    return false; // or true
  }

  exec() {
    // editor.insertText(value) // value 即 this.getValue(editor) 的返回值
  }
}
