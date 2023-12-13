// wzm
import { $t } from "@/plugins/i18n"; // 国际化
import { editor } from "@/router/enums"; // 编辑器排序权重

export default {
  path: "/editor",
  redirect: "/editor/index",
  meta: {
    icon: "edit",
    title: $t("menus.hseditor"),
    rank: editor
  },
  children: [
    {
      path: "/editor/index",
      name: "Editor",
      component: () => import("@/views/editor/index.vue"),
      meta: {
        title: $t("menus.hseditor"), // 页面标题
        keepAlive: true // 该页面开启缓存
      }
    }
  ]
} satisfies RouteConfigsTable;
