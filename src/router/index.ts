import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/LoginView.vue"
import Manage from "../views/MainView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { needLogin: false },
    },
    {
      path: "/manage",
      component: Manage,
      meta: { needLogin: true },
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
})

router.beforeEach((to, from, next) => {
  // Requires authorization to access
  const logined = localStorage.getItem("tn_jwt");
  // logined
  if (logined) {
    if(!to.meta.needLogin) {
      next({ path: "/manage/account" })
    }else {
      next()
    }
  } else {
    // unlogin
    if(to.meta.needLogin) {
      next({ path: "/login" })
    }else {
      next()
    }
  }
})

export default router
