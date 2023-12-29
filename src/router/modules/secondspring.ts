import { $t } from "@/plugins/i18n";
import { secondspring } from "@/router/enums";

export default {
  path: "/secondspring",
  redirect: "/secondspring/todos",
  meta: {
    icon: "secondspring",
    title: $t("menus.zm-secondspring"),
    rank: secondspring
  },
  children: [
    {
      path: "/secondspring/todos",
      name: "secondspring-todos",
      component: () => import("@/views/secondspring/Todos.vue"),
      meta: {
        title: $t("menus.zm-secondspring-todos")
      }
    },

  ]
} satisfies RouteConfigsTable;
