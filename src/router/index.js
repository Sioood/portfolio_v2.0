import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectView from "../views/ProjectView.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  { path: "/404", component: NotFound },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    // redirect: "/404"
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Théo Dupont - Portfolio",
      transitionName: "slide-back",
      enterClass: "slide slide-right",
      leaveClass: "slide slide-left",
    },
    // children: [
    //   {
    //     path: "project/:id",
    //     name: "project",
    //     component: ProjectView,
    //     meta: {
    //       title: "Théo Dupont - Project",
    //       // transitionName: "slide",
    //       enterClass: "slide slide-left",
    //       leaveClass: "slide slide-right",
    //     },
    //   },
    // ],
  },
  {
    path: "/project/:id",
    name: "project",
    component: ProjectView,
    meta: {
      title: "Théo Dupont - Project",
      transitionName: "slide",
      enterClass: "slide slide-left",
      leaveClass: "slide slide-right",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      to, from, savedPosition, reject;
      setTimeout(() => {
        resolve({ top: 0 });
      }, 550);
    });
  },
});

export default router;
