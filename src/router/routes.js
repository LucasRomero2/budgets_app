const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "ingresar",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "",
        name: "loginDefault",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/crear-cuenta",
        name: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/inicio",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;