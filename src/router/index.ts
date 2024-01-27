import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/LoginView.vue"
import Manage from "../views/MainView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/manage",
      component: Manage,
      children: [
        {
          path: "account",
          component: () => import("../views/AccountManagementView.vue"),
        },
        {
          path: "digital-amount",
          component: () => import("../views/DigitalAmountView.vue"),
        },
        {
          path: "tat-details",
          component: () => import("../views/TATDetailView.vue"),
        },
        {
          path: "message",
          component: () => import("../views/MessageView.vue"),
        },
      ],
    },
  ],
});

export default router
