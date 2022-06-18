import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectView from "../views/ProjectView.vue";

const routes = [
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
        resolve({ top: 0, behavior: "smooth" });
      }, 400);
    });
  },
});

export default router;
