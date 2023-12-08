import { $t } from "@/plugins/i18n";
import { eating } from "@/router/enums";

export default {
  path: "/eating",
  redirect: "/eating/draggable",
  meta: {
    icon: "eating",
    title: $t("menus.zm-eating"),
    rank: eating
  },
  children: [
    {
      path: "/eating/draggable",
      name: "eating-draggable",
      component: () => import("@/views/eating/Draggable.vue"),
      meta: {
        title: $t("menus.zm-draggable")
      }
    },
    {
      path: "/eating/waiting",
      name: "eating-waiting",
      component: () => import("@/views/eating/Draggable.vue"),
      meta: {
        title: $t("menus.zm-draggable")
      }
    }
  ]
} satisfies RouteConfigsTable;
