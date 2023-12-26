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
      path: "/eating/editable-block",
      name: "eating-editable-block",
      component: () => import("@/views/eating/EditableBloack.vue"),
      meta: {
        title: $t("menus.zm-editable-block")
      }
    },
    {
      path: "/eating/download",
      name: "eating-download",
      component: () => import("@/views/eating/Download.vue"),
      meta: {
        title: $t("menus.zm-download")
      }
    },
    {
      path: "/eating/video-assistant",
      name: "eating-video-assistant",
      component: () => import("@/views/eating/VideoAssistant.vue"),
      meta: {
        title: $t("menus.zm-video-assistant")
      }
    },
    {
      path: "/eating/scroll-text",
      name: "eating-scroll-text",
      component: () => import("@/views/eating/ScrollText.vue"),
      meta: {
        title: $t("menus.zm-scroll-text")
      }
    },
    {
      path: "/eating/animation",
      name: "eating-animation",
      component: () => import("@/views/eating/Animation.vue"),
      meta: {
        title: $t("menus.zm-animation")
      }
    },
    {
      path: "/eating/vue-use",
      name: "eating-vue-use",
      component: () => import("@/views/eating/VueUse.vue"),
      meta: {
        title: "vue-use"
      }
    }
  ]
} satisfies RouteConfigsTable;
