import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/singleNews",
            name: "singleNews",
            component: () => import("@/views/SingleNews.vue"),
        },
        {
            path: "*",
            redirect: "/", // 導至首頁
        },
    ]
})
