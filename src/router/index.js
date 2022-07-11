import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectView from "../views/ProjectView.vue";
import NotFound from "../views/NotFound.vue";
import LinksView from "../views/LinksView.vue";

const routes = [
  {
    path: "/404",
    name: "not found",
    component: NotFound,
    meta: {
      title: "Théo Dupont - 404",
      transitionName: "slide-back",
    },
  },
  {
    path: "/links",
    name: "links",
    component: LinksView,
    meta: {
      title: "Théo Dupont - Links",
      transitionName: "slide-back",
    },
  },
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